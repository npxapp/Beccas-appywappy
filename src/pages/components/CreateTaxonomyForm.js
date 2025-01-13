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
  MenuItem
} from '@mui/material';
import { useTermsAndTaxonomyUtils } from './Utils/termsAndTaxonomyUtils';

const CreateTaxonomyForm = () => {
  const [formData, setFormData] = useState({
    term_id: '',
    taxonomy: '',
    description: '',
    parent: 0
  });
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const {
    fetchTerms,
    createTaxonomy
  } = useTermsAndTaxonomyUtils();

  useEffect(() => {
    const loadTerms = async () => {
      try {
        const fetchedTerms = await fetchTerms();
        setTerms(fetchedTerms);
      } catch (err) {
        setError('Failed to load terms');
      }
    };
    loadTerms();
  }, [fetchTerms]);

  const taxonomyTypes = [
    'category',
    'post_tag',
    'nav_menu',
    'link_category',
    'post_format'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createTaxonomy(formData);
      setSuccess(true);
      setFormData({
        term_id: '',
        taxonomy: '',
        description: '',
        parent: 0
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper className="p-6">
      <Typography variant="h6" className="mb-4">Create New Taxonomy</Typography>
      
      {success && (
        <Alert severity="success" className="mb-4">Taxonomy created successfully!</Alert>
      )}
      
      {error && (
        <Alert severity="error" className="mb-4">{error}</Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box className="space-y-4">
          <FormControl fullWidth size="small">
            <InputLabel>Select Term</InputLabel>
            <Select
              value={formData.term_id}
              name="term_id"
              onChange={handleInputChange}
              required
            >
              {terms.map(term => (
                <MenuItem key={term.term_id} value={term.term_id}>
                  {term.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Taxonomy Type</InputLabel>
            <Select
              value={formData.taxonomy}
              name="taxonomy"
              onChange={handleInputChange}
              required
            >
              {taxonomyTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type.replace('_', ' ').split(' ').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            size="small"
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            className="mt-4"
          >
            {loading ? <CircularProgress size={24} /> : 'Create Taxonomy'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CreateTaxonomyForm;

