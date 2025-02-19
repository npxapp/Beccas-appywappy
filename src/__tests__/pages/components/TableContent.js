// ./src/pages/components/TableContent.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Paper,
  Typography,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  IconButton,
  DialogContentText,
  Snackbar,
  Alert
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import NumbersIcon from '@mui/icons-material/Numbers';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import DateIcon from '@mui/icons-material/Today';
import CodeIcon from '@mui/icons-material/Code';
import NullIcon from '@mui/icons-material/Block';
import InvalidIcon from '@mui/icons-material/Warning';
import useTableApi from './sources/tableApi';

export const TableContent = ({ tableName }) => {
  // State management
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  const api = useTableApi();

  // Content loading callback
  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      const contentData = await api.getTableContent(tableName);
      setContent(contentData);
      setError(null);
    } catch (err) {
      setError('Failed to load table content');
      showSnackbar(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [api, tableName]);

  // Initial content load
  useEffect(() => {
    if (tableName) {
      loadContent();
    }
  }, [loadContent, tableName]);

  // Snackbar utility
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Delete handling
  const handleDeleteClick = (row) => {
    setRowToDelete(row);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!rowToDelete) return;

      const idColumn = Object.keys(rowToDelete).find(key => 
        key.toLowerCase() === 'link_id' || 
        key.toLowerCase() === 'id'
      );
      
      if (!idColumn) {
        throw new Error('No valid ID column found');
      }

      await api.deleteTableContent(tableName, rowToDelete[idColumn], idColumn);
      setDeleteDialogOpen(false);
      await loadContent();
      showSnackbar('Row deleted successfully');
    } catch (err) {
      showSnackbar(`Failed to delete row: ${err.message}`, 'error');
    }
  };

  // Row update processing
  const processRowUpdate = async (newRow, oldRow) => {
    try {
      // Identify changed fields
      const changedFields = Object.keys(newRow).filter(
        key => newRow[key] !== oldRow[key] && 
               key !== 'id' && 
               key !== 'link_id'
      );

      // Find the ID column
      const idColumnAlt = 
        Object.keys(newRow)
          .sort((a, b) => b.toLowerCase() === 'link_id' ? 1 : -1) // Prioritize link_id
          .find(key => key.toLowerCase() === 'link_id' || key.toLowerCase() === 'id') || 'id';      
      
      let idColumn;
      
      idColumn = Object.keys(newRow).find(key => 
        key.toLowerCase() === 'link_id'
      );
      
      if(!idColumn || idColumn === 'undefined') {
        idColumn = Object.keys(newRow).find(key => 
          key.toLowerCase() === 'id'
        );
      }

      const rowId = newRow[idColumn];

      // Update each changed field
      for (const field of changedFields) {
        await api.updateFieldValue(
          tableName,
          rowId,
          field,
          newRow[field],
          idColumn
        );
      }

      // Refresh content
      await loadContent();

      // Show success message
      showSnackbar('Row updated successfully');

      // Return the new row to satisfy DataGrid
      return newRow;
    } catch (error) {
      console.error('Row update error:', error);
      showSnackbar(`Failed to update row: ${error.message}`, 'error');
      
      // Return the old row to revert changes
      return oldRow;
    }
  };

  // Cell content rendering
  const renderCellContent = (value) => {
    if (value === null || value === undefined) {
      return <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><NullIcon color="disabled" />No Data</div>;
    }
    if (value instanceof Blob || value === 'bytea') {
      return <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CodeIcon color="primary" />Binary Data</div>;
    }
    if (typeof value === 'object') {
      return <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><InvalidIcon color="error" />Invalid Object</div>;
    }

    const icon = !isNaN(value) ? <NumbersIcon color="primary" /> :
                String(value).match(/^\d{4}-\d{2}-\d{2}/) ? <DateIcon color="primary" /> :
                <TextFieldsIcon color="primary" />;

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {icon}
        {String(value)}
      </div>
    );
  };

  // Loading and error states
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!content || !content.length) return <Typography>No data available</Typography>;

  // Column definitions
  const dataColumns = Object.keys(content[0]).map(field => ({
    field,
    headerName: field,
    flex: 1,
    editable: true,
    renderCell: (params) => renderCellContent(params.value)
  }));

  const actionColumns = [
    {
      field: 'delete',
      headerName: 'Delete',
      width: 70,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={() => handleDeleteClick(params.row)}
          color="error"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )
    }
  ];

  const columns = [...dataColumns, ...actionColumns];

  const rows = content.map((row, index) => ({
    id: row.id || row.link_id || Object.values(row)[0] || index,
    ...row
  }));

  return (
    <Paper>
      <Typography variant="h6" sx={{ p: 2 }}>Table Content</Typography>
      <Box sx={{ width: '100%', maxHeight: 700 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this row? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
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

export default TableContent;