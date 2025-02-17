// ./src/pages/components/TableStructure.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  TextField,
  Grid,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
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
  const [newColumn, setNewColumn] = useState({ name: '', type: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const api = useTableApi();

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const loadStructure = useCallback(async () => {
    try {
      setLoading(true);
      const structureData = await api.getTableStructure(tableName);
      setStructure(structureData);
      setError(null);
    } catch (err) {
      setError('Failed to load table structure');
      showSnackbar('Failed to load table structure', 'error');
    } finally {
      setLoading(false);
    }
  }, [api, tableName]);

  useEffect(() => {
    if (tableName) {
      loadStructure();
    }
  }, [loadStructure, tableName]);

const processRowUpdate = async (newRow, oldRow) => {
  try {
    // Pass the entire row as the third argument
    await api.updateTable(tableName, oldRow.name, newRow);
    await loadStructure();
    showSnackbar('Column updated successfully');
    return newRow;
  } catch (error) {
    console.error('Row update error:', error);
    showSnackbar(`Failed to update column: ${error.message}`, 'error');
    return oldRow;
  }
};

  const handleAddColumn = async () => {
    try {
      if (newColumn.name && newColumn.type) {
        await api.addColumn(tableName, newColumn.name, newColumn.type);
        setNewColumn({ name: '', type: '' });
        await loadStructure();
        showSnackbar('Column added successfully');
      } else {
        showSnackbar('Column name and type are required!', 'error');
      }
    } catch (err) {
      console.error('Error adding column:', err);
      showSnackbar('Failed to add column', 'error');
    }
  };

  const handleDropColumn = async (columnName) => {
    try {
      await api.dropColumn(tableName, columnName);
      await loadStructure();
      showSnackbar('Column dropped successfully');
    } catch (err) {
      console.error('Error dropping column:', err);
      showSnackbar('Failed to drop column', 'error');
    }
  };

  const getTypeIcon = (type) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('varchar') || lowerType.includes('text')) {
      return <TextFieldsIcon />;
    } else if (lowerType.includes('int') || lowerType.includes('decimal') || lowerType.includes('numeric')) {
      return <NumbersIcon />;
    } else if (lowerType.includes('date') || lowerType.includes('time')) {
      return <DateIcon />;
    } else if (lowerType.includes('bool')) {
      return <BooleanIcon />;
    }
    return <DefaultIcon />;
  };

  const renderTypeCell = (value) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {getTypeIcon(value)}
      <Box>
        {value}
      </Box>
    </div>
  );

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!structure) return null;

  const columns = [
    {
      field: 'name',
      headerName: 'Column Name',
      flex: 1,
      editable: true,
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      renderCell: (params) => renderTypeCell(params.value)
    },
    {
      field: 'nullable',
      headerName: 'Nullable',
      flex: 0.7,
      type: 'boolean',
      editable: true,
      valueFormatter: (value) => value ? 'Yes' : 'No'
    },
    {
      field: 'default',
      headerName: 'Default',
      flex: 0.7,
      editable: true
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => handleDropColumn(params.row.name)} color="error">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const rows = structure.columns.map(column => ({
    id: column.name,
    ...column,
    nullable: column.nullable,
  }));

  return (
    <Paper>
      <Typography variant="h6" sx={{ p: 2 }}>Table Structure</Typography>
      
      <Grid container spacing={2} sx={{ p: 2 }} alignItems="center">
        <Grid item>
          <TextField
            label="New Column Name"
            value={newColumn.name}
            onChange={(e) => setNewColumn({ ...newColumn, name: e.target.value })}
            size="small"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            label="Column Type"
            value={newColumn.type}
            onChange={(e) => setNewColumn({ ...newColumn, type: e.target.value })}
            size="small"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <IconButton onClick={handleAddColumn} color="primary">
            <AddCircleIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Box sx={{ width: '100%', maxHeight: 700 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="cell"
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={(error) => {
            showSnackbar(`Update error: ${error.message}`, 'error');
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100]}
        />
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default TableStructure;