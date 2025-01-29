// ./src/pages/components/EditPostForm
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
  OutlinedInput,
  Autocomplete
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
  const [tagInput, setTagInput] = useState('');

  const {
    editPost,
    getAllPosts,
    getTermsByTaxonomy,
    getPostTerms,
    createTerm,
    createTaxonomy
  } = useTermsAndTaxonomyUtils();

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

  const handlePostSelect = async (postId) => {
    setSelectedPostId(postId);
    const selectedPost = posts.find(post => post.id === postId);
    if (selectedPost) {
      try {
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

  const handleTagAdd = async (newTagName) => {
    const existingTag = availableTerms.tags.find(
      tag => tag.name.toLowerCase() === newTagName.toLowerCase()
    );

    try {
      let tagToAdd;

      if (existingTag) {
        tagToAdd = existingTag;
      } else {
        const newTermData = {
          name: newTagName,
          slug: newTagName.toLowerCase().replace(/\s+/g, '-')
        };

        const newTerm = await createTerm(newTermData);

        await createTaxonomy({
          term_id: newTerm.term_id,
          taxonomy: 'post_tag',
          description: '',
          parent: 0,
          count: 0
        });

        const updatedTags = await getTermsByTaxonomy('post_tag');
        setAvailableTerms(prev => ({
          ...prev,
          tags: updatedTags
        }));

        tagToAdd = updatedTags.find(tag => tag.name === newTagName);
      }

      if (tagToAdd && !formData.selectedTerms.includes(tagToAdd.term_id)) {
        const updatedTerms = [...formData.selectedTerms, tagToAdd.term_id];
        setFormData(prev => ({
          ...prev,
          selectedTerms: updatedTerms
        }));
      }

      setTagInput('');
    } catch (err) {
      console.error('Error adding tag:', err);
      setError('Failed to add tag');
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setFormData(prev => ({
      ...prev,
      selectedTerms: prev.selectedTerms.filter(termId => termId !== tagToDelete)
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
              <MenuItem value="card">Card</MenuItem>
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

          <Autocomplete
            multiple
            freeSolo
            options={availableTerms.tags.map((tag) => tag.name)}
            value={formData.selectedTerms.map(
              termId => availableTerms.tags.find(tag => tag.term_id === termId)?.name || ''
            )}
            inputValue={tagInput}
            onInputChange={(event, newInputValue) => {
              if (event && event.type === 'change' && newInputValue.endsWith(' ')) {
                const trimmedValue = newInputValue.trim();
                if (trimmedValue) {
                  handleTagAdd(trimmedValue);
                }
              }
              setTagInput(newInputValue);
            }}
            renderTags={(value, getTagProps) =>
              formData.selectedTerms.map((termId, index) => {
                const tag = availableTerms.tags.find(t => t.term_id === termId);
                return tag ? (
                  <Chip
                    key={termId}
                    label={tag.name}
                    onDelete={() => handleTagDelete(termId)}
                    {...getTagProps({ index })}
                  />
                ) : null;
              })
            }
            renderInput={(params) => (
              <TextField 
                {...params} 
                variant="outlined" 
                label="Tags" 
                placeholder="Add tags" 
                size="small"
              />
            )}
          />

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