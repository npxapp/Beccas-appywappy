// ./src/pages/components/TableStructure.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  TextField,
  Grid,
  Box
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import NumbersIcon from '@mui/icons-material/Numbers';
import DateIcon from '@mui/icons-material/Today';
import BooleanIcon from '@mui/icons-material/CheckBox';
import DefaultIcon from '@mui/icons-material/Storage';
import useTableApi from './sources/tableApi';

export const TableStructure = ({ tableName }) => {
  const [structure, setStructure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingColumn, setEditingColumn] = useState(null);
  const [updatedColumn, setUpdatedColumn] = useState({});
  const [newColumn, setNewColumn] = useState({ name: '', type: '' });

  const api = useTableApi();

  const loadStructure = useCallback(async () => {
    try {
      setLoading(true);
      const structureData = await api.getTableStructure(tableName);
      setStructure(structureData);
      setError(null);
    } catch (err) {
      setError('Failed to load table structure');
      console.error('Error loading table structure:', err);
    } finally {
      setLoading(false);
    }
  }, [api, tableName]);

  useEffect(() => {
    if (tableName) {
      loadStructure();
    }
  }, [loadStructure, tableName]);

  const handleEdit = (column) => {
    setEditingColumn(column.name);
    setUpdatedColumn(column);
  };

  const handleCancelEdit = () => {
    setEditingColumn(null);
    setUpdatedColumn({});
  };

  const handleSave = async () => {
    try {
      await api.updateTable(tableName, editingColumn, updatedColumn);
      setEditingColumn(null);
      loadStructure();
    } catch (err) {
      console.error('Error updating table structure:', err);
      setError('Failed to update table structure');
    }
  };

  const handleAddColumn = async () => {
    try {
      if (newColumn.name && newColumn.type) {
        await api.addColumn(tableName, newColumn.name, newColumn.type);
        setNewColumn({ name: '', type: '' });
        loadStructure();
      } else {
        alert('Column name and type are required!');
      }
    } catch (err) {
      console.error('Error adding column:', err);
      setError('Failed to add column');
    }
  };

  const handleDropColumn = async (columnName) => {
    try {
      await api.dropColumn(tableName, columnName);
      loadStructure();
    } catch (err) {
      console.error('Error dropping column:', err);
      setError('Failed to drop column');
    }
  };

  const handleFieldChange = (field, value) => {
    setUpdatedColumn(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getTypeIcon = (type) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('varchar') || lowerType.includes('text')) {
      return <TextFieldsIcon variant="SuccessIcon"/>;
    } else if (lowerType.includes('int') || lowerType.includes('decimal') || lowerType.includes('numeric')) {
      return <NumbersIcon variant="SuccessIcon"/>;
    } else if (lowerType.includes('date') || lowerType.includes('time')) {
      return <DateIcon variant="SuccessIcon"/>;
    } else if (lowerType.includes('bool')) {
      return <BooleanIcon variant="SuccessIcon"/>;
    }
    return <DefaultIcon variant="SuccessIcon"/>;
  };

  const renderEditableCell = (params, field) => {
    if (editingColumn === params.row.name) {
      return (
        <TextField
          fullWidth
          size="small"
          value={updatedColumn[field] || ''}
          onChange={(e) => handleFieldChange(field, e.target.value)}
          variant="standard"
          sx={{ backgroundColor: 'background.paper' }}
        />
      );
    }
    if (field === 'type') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {getTypeIcon(params.value)}
          <SyntaxHighlighter
            language="plaintext"
            style={github}
            customStyle={{ padding: '0.5em', margin: 0, background: 'transparent' }}
          >
            {params.value}
          </SyntaxHighlighter>
        </div>
      );
    }
    return params.value;
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Column Name',
      flex: 1,
      renderCell: (params) => renderEditableCell(params, 'name')
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      renderCell: (params) => renderEditableCell(params, 'type')
    },
    {
      field: 'nullable',
      headerName: 'Nullable',
      flex: 0.7,
      renderCell: (params) => {
        if (editingColumn === params.row.name) {
          return (
            <TextField
              select
              fullWidth
              size="small"
              value={updatedColumn.nullable ? 'Yes' : 'No'}
              onChange={(e) => handleFieldChange('nullable', e.target.value === 'Yes')}
              variant="standard"
              SelectProps={{
                native: true,
              }}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </TextField>
          );
        }
        return params.row.nullable ? 'Yes' : 'No';
      }
    },
    {
      field: 'default',
      headerName: 'Default',
      flex: 0.7,
      renderCell: (params) => renderEditableCell(params, 'default')
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        editingColumn === params.row.name ? (
          <>
            <IconButton onClick={handleSave} color="primary">
              <SaveIcon variant="SuccessIcon"/>
            </IconButton>
            <IconButton onClick={handleCancelEdit} color="secondary">
              <CancelIcon variant="WarningIcon"/>
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditIcon variant="SuccessIcon"/>
            </IconButton>
            <IconButton onClick={() => handleDropColumn(params.row.name)} color="error">
              <DeleteIcon variant="ErrorIcon"/>
            </IconButton>
          </>
        )
      ),
    },
  ];

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!structure) return null;

  const rows = structure.columns.map(column => ({
    id: column.name,
    ...column
  }));

  return (
    <Paper sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ p: 2 }}>Table Structure</Typography>
      
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item>
          <TextField
            label="New Column Name"
            value={newColumn.name}
            onChange={(e) => setNewColumn({ ...newColumn, name: e.target.value })}
            size="small"
          />
        </Grid>
        <Grid item>
          <TextField
            label="Column Type"
            value={newColumn.type}
            onChange={(e) => setNewColumn({ ...newColumn, type: e.target.value })}
            size="small"
          />
        </Grid>
        <Grid item>
          <IconButton onClick={handleAddColumn}>
            <AddCircleIcon variant="SuccessIcon"/>
          </IconButton>
        </Grid>
      </Grid>
        <Box
          sx={{
            width: '100%',
            maxHeight: 700,
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            pageSizeOptions={[10, 20, 50, 100]}
            sx={{ color: 'text.primary' }}
          />
        </Box>
    </Paper>
  );
};

export default TableStructure;