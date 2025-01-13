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
  TextField,
  Button,
  Box,
  IconButton,
  DialogContentText,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import NumbersIcon from '@mui/icons-material/Numbers';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import DateIcon from '@mui/icons-material/Today';
import CodeIcon from '@mui/icons-material/Code';
import NullIcon from '@mui/icons-material/Block';
import InvalidIcon from '@mui/icons-material/Warning';
import useTableApi from './sources/tableApi';

export const TableContent = ({ tableName }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [updatedRow, setUpdatedRow] = useState({});
  
  const api = useTableApi();

  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      const contentData = await api.getTableContent(tableName);
      setContent(contentData);
      setError(null);
    } catch (err) {
      setError('Failed to load table content');
    } finally {
      setLoading(false);
    }
  }, [api, tableName]);

  useEffect(() => {
    if (tableName) {
      loadContent();
    }
  }, [loadContent, tableName]);

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
      loadContent(); // Refresh the table
    } catch (err) {
      setError(`Failed to delete row: ${err.message}`);
    }
  };

  const handleEdit = (row) => {
    setEditingRow(row.id);
    setUpdatedRow(row);
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setUpdatedRow({});
  };

  const handleSave = async () => {
    try {
      const idColumn = Object.keys(updatedRow).find(key => 
        key.toLowerCase() === 'link_id' || 
        key.toLowerCase() === 'id'
      );
      
      if (!idColumn) {
        throw new Error('No valid ID column found');
      }

      // Update each changed field
      const originalRow = content.find(row => row[idColumn] === updatedRow[idColumn]);
      const changedFields = Object.keys(updatedRow).filter(key => 
        originalRow[key] !== updatedRow[key] && key !== 'id' && key !== idColumn
      );

      for (const field of changedFields) {
        await api.updateFieldValue(
          tableName,
          updatedRow[idColumn],
          field,
          updatedRow[field],
          idColumn
        );
      }

      setEditingRow(null);
      loadContent();
    } catch (err) {
      setError(`Failed to update row: ${err.message}`);
    }
  };

  const handleFieldChange = (field, value) => {
    setUpdatedRow(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderCellContent = (value) => {
    if (value === null || value === undefined) {
      return <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><NullIcon color="disabled" variant="SuccessIcon"/>No Data</div>;
    }
    if (value instanceof Blob || value === 'bytea') {
      return <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CodeIcon color="primary" variant="SuccessIcon"/>Binary Data</div>;
    }
    if (typeof value === 'object') {
      return <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><InvalidIcon color="error" variant="SuccessIcon"/>Invalid Object</div>;
    }

    const icon = !isNaN(value) ? <NumbersIcon color="primary" variant="SuccessIcon"/> :
                String(value).match(/^\d{4}-\d{2}-\d{2}/) ? <DateIcon color="primary" variant="SuccessIcon"/> :
                <TextFieldsIcon color="primary" variant="SuccessIcon"/>;

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {icon}
        {String(value)}
      </div>
    );
  };

  const renderEditableCell = (params) => {
    if (editingRow === params.row.id) {
      return (
        <TextField
          fullWidth
          size="small"
          value={updatedRow[params.field] || ''}
          onChange={(e) => handleFieldChange(params.field, e.target.value)}
          variant="standard"
          sx={{ backgroundColor: 'background.paper' }}
        />
      );
    }
    return renderCellContent(params.value);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!content || !content.length) return <Typography>No data available</Typography>;

  const dataColumns = Object.keys(content[0]).map(field => ({
    field,
    headerName: field,
    flex: 1,
    renderCell: renderEditableCell
  }));

  const actionColumns = [
    {
      field: 'edit',
      headerName: 'Edit',
      width: 70,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={() => handleEdit(params.row)}
          disabled={editingRow === params.row.id}
        >
          <EditIcon fontSize="small" color={editingRow === params.row.id ? "disabled" : "primary"} />
        </IconButton>
      )
    },
    {
      field: 'save',
      headerName: 'Save',
      width: 70,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={handleSave}
          disabled={editingRow !== params.row.id}
        >
          <SaveIcon fontSize="small" color={editingRow === params.row.id ? "primary" : "disabled"} />
        </IconButton>
      )
    },
    {
      field: 'cancel',
      headerName: 'Cancel',
      width: 70,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={handleCancelEdit}
          disabled={editingRow !== params.row.id}
        >
          <CancelIcon fontSize="small" color={editingRow === params.row.id ? "warning" : "disabled"} />
        </IconButton>
      )
    },
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
          disabled={editingRow === params.row.id}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )
    }
  ];

  const columns = [...dataColumns, ...actionColumns];

  const rows = content.map((row, index) => ({
    id: row.id || Object.values(row)[0] || index,
    ...row
  }));

  return (
    <Paper>
      <Typography variant="h6" sx={{ p: 2 }}>Table Content</Typography>
      <Box sx={{ width: '100%', maxHeight: 700 }}>
        <DataGrid
          rows={rows}
          columns={columns}
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
    </Paper>
  );
};

export default TableContent;