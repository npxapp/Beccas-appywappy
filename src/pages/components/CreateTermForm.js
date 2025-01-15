import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  CircularProgress
} from '@mui/material';
import { useTermsAndTaxonomyUtils } from './Utils/termsAndTaxonomyUtils';

const CreateTermForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    term_group: 0
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { createTerm } = useTermsAndTaxonomyUtils();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateSlug = (name) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createTerm(formData);
      setSuccess(true);
      setFormData({ name: '', slug: '', term_group: 0 });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper className="p-6">
      <Typography variant="h6" className="mb-4">Create New Term</Typography>
      
      {success && (
        <Alert severity="success" className="mb-4">Term created successfully!</Alert>
      )}
      
      {error && (
        <Alert severity="error" className="mb-4">{error}</Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box className="space-y-4">
          <TextField
            fullWidth
            label="Term Name"
            name="name"
            value={formData.name}
            onChange={handleNameChange}
            required
            size="small"
          />
          
          <TextField
            fullWidth
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            required
            size="small"
            helperText="URL-friendly version of the name"
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            className="mt-4"
          >
            {loading ? <CircularProgress size={24} /> : 'Create Term'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CreateTermForm;

