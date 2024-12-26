// ./src/components/TableStructure.jsx
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { Save as SaveIcon } from '@mui/icons-material';
import { Cancel as CancelIcon } from '@mui/icons-material';
import { AddCircle as AddCircleIcon } from '@mui/icons-material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import useTableApi from './sources/tableApi'; // Use the new hook

export const TableStructure = ({ tableName }) => {
  const [structure, setStructure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingColumn, setEditingColumn] = useState(null);
  const [updatedColumn, setUpdatedColumn] = useState({});
  const [newColumn, setNewColumn] = useState({ name: '', type: '' });

  const api = useTableApi(); // Initialize the API hook
  
  useEffect(() => {
    loadStructure();
  }, [tableName]);

  const loadStructure = async () => {
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
  };

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
      await api.updateTable(tableName, updatedColumn);
      setEditingColumn(null);
      loadStructure(); // Reload the structure after saving
    } catch (err) {
      console.error('Error updating table structure:', err);
      setError('Failed to update table structure');
    }
  };

  const handleFieldChange = (field, value) => {
    setUpdatedColumn((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddColumn = async () => {
    try {
      if (newColumn.name && newColumn.type) {
        await api.addColumn(tableName, newColumn.name, newColumn.type);
        setNewColumn({ name: '', type: '' }); // Clear input fields
        loadStructure(); // Reload structure after adding
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
      loadStructure(); // Reload structure after dropping column
    } catch (err) {
      console.error('Error dropping column:', err);
      setError('Failed to drop column');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!structure) return null;

  return (
    <Paper sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ p: 2 }}>Table Structure</Typography>
      
      {/* Add Column Inputs */}
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
          <IconButton onClick={handleAddColumn} color="primary">
            <AddCircleIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Column Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Nullable</TableCell>
            <TableCell>Default</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {structure.columns.map((column) => (
            <TableRow key={column.name}>
              {editingColumn === column.name ? (
                <>
                  <TableCell>
                    <TextField
                      value={updatedColumn.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={updatedColumn.type}
                      onChange={(e) => handleFieldChange('type', e.target.value)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={updatedColumn.nullable ? 'Yes' : 'No'}
                      onChange={(e) =>
                        handleFieldChange('nullable', e.target.value === 'Yes')
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={updatedColumn.default || ''}
                      onChange={(e) => handleFieldChange('default', e.target.value)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={handleSave} color="primary">
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={handleCancelEdit} color="secondary">
                      <CancelIcon />
                    </IconButton>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{column.name}</TableCell>
                  <TableCell>{column.type}</TableCell>
                  <TableCell>{column.nullable ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{column.default || '-'}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(column)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDropColumn(column.name)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};