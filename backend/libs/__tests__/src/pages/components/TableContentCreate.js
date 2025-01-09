// ./src/pages/components/TableContentCreate.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel
} from '@mui/material';
import useTableApi from './sources/tableApi';

const getStatusFieldComponent = (column, formData, handleInputChange) => {
  const getStatusOptions = (fieldName) => {
    if (fieldName === 'post_status') {
      return ['publish', 'draft', 'private', 'pending', 'trash'];
    }
    if (fieldName === 'comment_status' || fieldName === 'ping_status') {
      return ['open', 'closed'];
    }
    return ['open', 'closed'];
  };

  return (
    <FormControl fullWidth margin="normal" size="small">
      <InputLabel>{column.name}</InputLabel>
      <Select
        value={formData[column.name] || ''}
        onChange={(e) => handleInputChange(column.name, e.target.value)}
        label={column.name}
      >
        {getStatusOptions(column.name).map(status => (
          <MenuItem key={status} value={status}>{status}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const getTypeFieldComponent = (column, formData, handleInputChange) => {
  const getTypeOptions = (fieldName) => {
    if (fieldName === 'post_type') {
      return ['post', 'page', 'attachment', 'revision', 'nav_menu_item'];
    }
    return ['post', 'page', 'attachment', 'revision'];
  };

  return (
    <FormControl fullWidth margin="normal" size="small">
      <InputLabel>{column.name}</InputLabel>
      <Select
        value={formData[column.name] || ''}
        onChange={(e) => handleInputChange(column.name, e.target.value)}
        label={column.name}
      >
        {getTypeOptions(column.name).map(type => (
          <MenuItem key={type} value={type}>{type}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const TableContentCreate = ({ tableName, onError }) => {
  const [structure, setStructure] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const api = useTableApi();

  const getDefaultValue = useCallback((column) => {
    const name = column.name.toLowerCase();
    const currentDate = new Date().toISOString();
        
    if (name === 'post_status') return 'draft';
    if (name === 'comment_status' || name === 'ping_status') return 'closed';
    if (name === 'post_type') return 'post';
    if (name === 'post_author') return '1';
    if (name === 'menu_order' || name === 'comment_count' || name === 'post_parent') return '0';
    if (name.includes('date') || name.includes('modified')) return currentDate;
          
    return column.default || '';
  }, []);

  const loadTableStructure = useCallback(async () => {
    try {
      setLoading(true);
      const structureData = await api.getTableStructure(tableName);
      setStructure(structureData);
      const initialData = {};
      structureData.columns
        .filter(column => !column.name.toLowerCase().endsWith('id'))
        .forEach(column => {
          initialData[column.name] = getDefaultValue(column);
        });
      setFormData(initialData);
    } catch (err) {
      onError?.('Failed to load table structure');
    } finally {
      setLoading(false);
    }
  }, [api, tableName, getDefaultValue, onError]);

  useEffect(() => {
    if (tableName) {
      loadTableStructure();
    }
  }, [loadTableStructure, tableName]);

  const handleInputChange = (columnName, value) => {
    setFormData(prev => ({
      ...prev,
      [columnName]: value
    }));
  };

  const getInputComponent = (column) => {
    const columnNameLower = column.name.toLowerCase();
    
    if (columnNameLower.includes('status')) {
      return getStatusFieldComponent(column, formData, handleInputChange);
    }
    
    if (columnNameLower.includes('type')) {
      return getTypeFieldComponent(column, formData, handleInputChange);
    }

    const commonProps = {
      fullWidth: true,
      size: "small",
      margin: "normal",
      value: formData[column.name] || '',
      onChange: (e) => handleInputChange(column.name, e.target.value),
      required: !column.nullable,
      error: !column.nullable && !formData[column.name],
      helperText: !column.nullable && !formData[column.name] ? 'This field is required' : ''
    };

    switch (column.type.toLowerCase()) {
      case 'boolean':
        return (
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(formData[column.name])}
                onChange={(e) => handleInputChange(column.name, e.target.checked)}
              />
            }
            label={column.name}
          />
        );
      case 'integer':
      case 'numeric':
      case 'decimal':
      case 'bigint':
        return (
          <TextField
            {...commonProps}
            type="number"
            label={column.name}
          />
        );
      case 'date':
      case 'timestamp':
      case 'timestamptz':
        return (
          <TextField
            {...commonProps}
            type="datetime-local"
            label={column.name}
            InputLabelProps={{ shrink: true }}
            defaultValue={new Date().toISOString().slice(0, 16)}
          />
        );
      default:
        return (
          <TextField
            {...commonProps}
            type="text"
            label={column.name}
            multiline={column.type.toLowerCase().includes('text')}
          />
        );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    
    try {
      await api.createTableContent(tableName, formData);
      setSuccess(true);
      const resetData = {};
      structure.columns
        .filter(column => !column.name.toLowerCase().endsWith('id'))
        .forEach(column => {
          resetData[column.name] = getDefaultValue(column);
        });
      setFormData(resetData);
    } catch (err) {
      console.error('Submission error:', err);
      onError?.(err.message || 'Failed to create record');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (!structure) return null;

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>Create New Record</Typography>
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Record created successfully!
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {structure.columns
            .filter(column => !column.name.toLowerCase().endsWith('id'))
            .map(column => (
              <Grid item xs={12} sm={6} key={column.name}>
                {getInputComponent(column)}
              </Grid>
            ))}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={submitting}
              sx={{ mt: 2 }}
            >
              {submitting ? 'Creating...' : 'Create Record'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default TableContentCreate;