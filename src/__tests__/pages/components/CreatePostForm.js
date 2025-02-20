// ./src/pages/components/CreatePostForm
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
  Autocomplete,
  Chip,
  OutlinedInput,
} from '@mui/material';
import { useTermsAndTaxonomyUtils } from './Utils/termsAndTaxonomyUtils';

const CreatePostForm = () => {
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
    createPost,
    createTermRelationship,
    getTermsByTaxonomy,
    createTerm,
    createTaxonomy
  } = useTermsAndTaxonomyUtils();

  useEffect(() => {
    const loadTerms = async () => {
      try {
        const [categories, tags] = await Promise.all([
          getTermsByTaxonomy('category'),
          getTermsByTaxonomy('post_tag')
        ]);
        setAvailableTerms({
          categories,
          tags
        });
      } catch (err) {
        setError('Failed to load terms');
      }
    };
    loadTerms();
  }, [getTermsByTaxonomy]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagAdd = async (newTagName) => {
    // Check if tag already exists
    const existingTag = availableTerms.tags.find(
      tag => tag.name.toLowerCase() === newTagName.toLowerCase()
    );

    try {
      let tagToAdd;

      if (existingTag) {
        // Use existing tag
        tagToAdd = existingTag;
      } else {
        // Create new tag
        const newTermData = {
          name: newTagName,
          slug: newTagName.toLowerCase().replace(/\s+/g, '-')
        };

        // Create term
        const newTerm = await createTerm(newTermData);

        // Create taxonomy for the term
        await createTaxonomy({
          term_id: newTerm.term_id,
          taxonomy: 'post_tag',
          description: '',
          parent: 0,
          count: 0
        });

        // Refresh available tags
        const updatedTags = await getTermsByTaxonomy('post_tag');
        setAvailableTerms(prev => ({
          ...prev,
          tags: updatedTags
        }));

        // Find the newly created tag
        tagToAdd = updatedTags.find(tag => tag.name === newTagName);
      }

      // Add tag to selected terms
      if (tagToAdd && !formData.selectedTerms.includes(tagToAdd.term_id)) {
        const updatedTerms = [...formData.selectedTerms, tagToAdd.term_id];
        setFormData(prev => ({
          ...prev,
          selectedTerms: updatedTerms
        }));
      }

      // Clear input
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
    setLoading(true);
    setError(null);
    try {
      // Create the post first
      const postResult = await createPost({
        post_title: formData.post_title,
        post_content: formData.post_content,
        post_excerpt: formData.post_excerpt,
        post_status: formData.post_status,
        post_type: formData.post_type,
        post_author: formData.post_author,
        comment_status: formData.comment_status,
        ping_status: formData.ping_status,
      });

      // Create term relationships
      await Promise.all(formData.selectedTerms.map(termId =>
        createTermRelationship({
          object_id: postResult.id,
          term_taxonomy_id: termId,
          term_order: 0
        })
      ));

      setSuccess(true);
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
      <Typography variant="h6" className="mb-4">Create New Post</Typography>
      
      {success && (
        <Alert severity="success" className="mb-4">Post created successfully!</Alert>
      )}
      
      {error && (
        <Alert severity="error" className="mb-4">{error}</Alert>
      )}

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
              // Check for space to create chip
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
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            className="mt-4"
          >
            {loading ? <CircularProgress size={24} /> : 'Create Post'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CreatePostForm;