import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput
} from '@mui/material';
import { useTermsAndTaxonomyUtils } from './Utils/termsAndTaxonomyUtils';

const EditPostForm = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState('');
  const [formData, setFormData] = useState({
    post_title: '',
    post_content: '',
    post_excerpt: '',
    post_status: 'draft',
    post_type: 'post',
    post_author: '0',
    comment_status: 'open',
    ping_status: 'open',
    selectedTerms: []
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [availableTerms, setAvailableTerms] = useState({
    categories: [],
    tags: []
  });

  const {
    editPost,
    getAllPosts,
    getTermsByTaxonomy,
    getPostTerms
  } = useTermsAndTaxonomyUtils();

  // Load posts and terms on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [allPosts, categories, tags] = await Promise.all([
          getAllPosts(),
          getTermsByTaxonomy('category'),
          getTermsByTaxonomy('post_tag')
        ]);
        setPosts(allPosts);
        setAvailableTerms({
          categories,
          tags
        });
      } catch (err) {
        setError('Failed to load data');
      }
    };
    loadData();
  }, [getAllPosts, getTermsByTaxonomy]);

  // Update form when a post is selected
const handlePostSelect = async (postId) => {
  setSelectedPostId(postId);
  const selectedPost = posts.find(post => post.id === postId);
  //alert(postId);
  if (selectedPost) {
    try {
      // Get the terms associated with this post through relationships
      const postTerms = await getPostTerms(postId);
      setFormData({
        post_title: selectedPost.post_title || '',
        post_content: selectedPost.post_content || '',
        post_excerpt: selectedPost.post_excerpt || '',
        post_status: selectedPost.post_status || 'draft',
        post_type: selectedPost.post_type || 'post',
        post_author: selectedPost.post_author?.toString() || '0',
        comment_status: selectedPost.comment_status || 'open',
        ping_status: selectedPost.ping_status || 'open',
        // Set selectedTerms to the term_ids from the relationships
        selectedTerms: postTerms.map(term => term.term_id)
      });
    } catch (error) {
      console.error('Failed to load post terms:', error);
      setError('Failed to load post terms');
    }
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPostId) {
      setError('Please select a post to edit');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await editPost(selectedPostId, formData);
      setSuccess(true);
      // Reset form after successful edit
      setSelectedPostId('');
      setFormData({
        post_title: '',
        post_content: '',
        post_excerpt: '',
        post_status: 'draft',
        post_type: 'post',
        post_author: '0',
        comment_status: 'open',
        ping_status: 'open',
        selectedTerms: []
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper className="p-6">
      <Typography variant="h6" className="mb-4">Edit Post</Typography>
      
      {success && (
        <Alert severity="success" className="mb-4">Post updated successfully!</Alert>
      )}
      
      {error && (
        <Alert severity="error" className="mb-4">{error}</Alert>
      )}

      <FormControl fullWidth size="small" className="mb-4">
        <InputLabel>Select Post to Edit</InputLabel>
        <Select
          value={selectedPostId}
          onChange={(e) => handlePostSelect(e.target.value)}
          label="Select Post to Edit"
        >
          {posts.map((post) => (
            <MenuItem key={post.id} value={post.id}>
              {post.post_title || 'Untitled Post'}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <form onSubmit={handleSubmit}>
        <Box className="space-y-4">
          <TextField
            fullWidth
            label="Title"
            name="post_title"
            value={formData.post_title}
            onChange={handleInputChange}
            required
            size="small"
          />

          <TextField
            fullWidth
            multiline
            rows={8}
            label="Content"
            name="post_content"
            value={formData.post_content}
            onChange={handleInputChange}
            required
            size="small"
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Excerpt"
            name="post_excerpt"
            value={formData.post_excerpt}
            onChange={handleInputChange}
            size="small"
          />

          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.post_status}
              name="post_status"
              onChange={handleInputChange}
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="publish">Publish</MenuItem>
              <MenuItem value="private">Private</MenuItem>
              <MenuItem value="pending">Pending Review</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Post Type</InputLabel>
            <Select
              value={formData.post_type}
              name="post_type"
              onChange={handleInputChange}
            >
              <MenuItem value="post">Post</MenuItem>
              <MenuItem value="page">Page</MenuItem>
            </Select>
          </FormControl>
  
          <FormControl fullWidth size="small">
            <InputLabel>Author</InputLabel>
            <Select
              value={formData.post_author}
              name="post_author"
              onChange={handleInputChange}
            >
              <MenuItem value="0">Admin User</MenuItem>
              <MenuItem value="1">Regular User</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={formData.selectedTerms.filter(termId => 
                availableTerms.categories.some(cat => cat.term_id === termId)
              )}
              onChange={(e) => {
                const newTerms = formData.selectedTerms.filter(termId => 
                  availableTerms.tags.some(tag => tag.term_id === termId)
                );
                setFormData(prev => ({
                  ...prev,
                  selectedTerms: [...newTerms, ...e.target.value]
                }));
              }}
              input={<OutlinedInput label="Categories" />}
              renderValue={(selected) => (
                <Box className="flex flex-wrap gap-1">
                  {selected.map((termId) => {
                    const term = availableTerms.categories.find(cat => cat.term_id === termId);
                    return term ? (
                      <Chip 
                        key={term.term_id} 
                        label={term.name} 
                        size="small"
                      />
                    ) : null;
                  })}
                </Box>
              )}
            >
              {availableTerms.categories.map((category) => (
                <MenuItem key={category.term_id} value={category.term_id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Tags</InputLabel>
            <Select
              multiple
              value={formData.selectedTerms.filter(termId => 
                availableTerms.tags.some(tag => tag.term_id === termId)
              )}
              onChange={(e) => {
                const newTerms = formData.selectedTerms.filter(termId => 
                  availableTerms.categories.some(cat => cat.term_id === termId)
                );
                setFormData(prev => ({
                  ...prev,
                  selectedTerms: [...newTerms, ...e.target.value]
                }));
              }}
              input={<OutlinedInput label="Tags" />}
              renderValue={(selected) => (
                <Box className="flex flex-wrap gap-1">
                  {selected.map((termId) => {
                    const term = availableTerms.tags.find(tag => tag.term_id === termId);
                    return term ? (
                      <Chip 
                        key={term.term_id} 
                        label={term.name} 
                        size="small"
                      />
                    ) : null;
                  })}
                </Box>
              )}
            >
              {availableTerms.tags.map((tag) => (
                <MenuItem key={tag.term_id} value={tag.term_id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Comments</InputLabel>
            <Select
              value={formData.comment_status}
              name="comment_status"
              onChange={handleInputChange}
            >
              <MenuItem value="open">Allow</MenuItem>
              <MenuItem value="closed">Disallow</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            disabled={loading || !selectedPostId}
            className="mt-4"
          >
            {loading ? <CircularProgress size={24} /> : 'Update Post'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default EditPostForm;

