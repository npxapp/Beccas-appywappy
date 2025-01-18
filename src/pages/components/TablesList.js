// ./src/pages/components/TablesList.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Alert
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import useTableApi from './sources/tableApi';
import { useSlide } from '../../contexts/SlideContext';

export const TablesList = ({ tables = [], selectedTable, onTableSelect, onRefresh }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tableToDelete, setTableToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newTableName, setNewTableName] = useState('');

  const { activeSlide, setActiveSlide, setPreviousSlide } = useSlide();
  const api = useTableApi();

  const handleSlideChange = (slideNumber) => () => {
    setPreviousSlide(activeSlide);
    setActiveSlide(slideNumber);
  };
  
  const handleDeleteClick = (tableName, event) => {
    event.stopPropagation();
    setTableToDelete(tableName);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    setError(null);
    
    try {
      await api.deleteTable(tableToDelete);
      
      if (selectedTable === tableToDelete) {
        onTableSelect(null);
      }
      
      setDeleteDialogOpen(false);
      setTableToDelete(null);
      onRefresh();
    } catch (err) {
      setError(err.message || 'Failed to delete table. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateTable = async () => {
    try {
      await api.createTable(newTableName);
      setCreateDialogOpen(false);
      setNewTableName('');
      onRefresh();
    } catch (error) {
      setError(error.message || 'Failed to create table. Please try again.');
    }
  };

  const handleTableSelect = (tableName) => {
    onTableSelect(tableName);
    handleSlideChange(0)();
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Table Name',
      flex: 1,
    },
    {
      field: 'rowCount',
      headerName: 'Rows',
      flex: 0.5,
      renderCell: (params) => {
        // Access the rowCount directly from the original table data
        const table = tables.find(t => t.name === params.row.name);
        return `${table?.rowCount || 0} rows`;
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={(e) => handleDeleteClick(params.row.name, e)}
          disabled={isDeleting}
          color="error"
        >
          <DeleteIcon variant="ErrorIcon" />
        </IconButton>
      ),
    },
  ];

  // Transform tables array to include required id field for DataGrid
  const rows = tables.map(table => ({
    id: table.name,
    name: table.name,
    rowCount: table.rowCount // Explicitly include rowCount in the transformation
  }));

  return (
    <Box sx={{ width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={2}
      >
        <Typography 
          variant="h6" 
          color="text.primary"
        >
          Tables
        </Typography>
        <Box>
          <IconButton 
            size="small" 
            onClick={onRefresh} 
            title="Refresh tables list"
            sx={{ mr: 1 }}
          >
            <RefreshIcon variant="SuccessIcon"/>
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => setCreateDialogOpen(true)}
            title="Create new table"
          >
            <AddIcon variant="SuccessIcon"/>
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[10, 20, 50]}
          onRowClick={(params) => handleTableSelect(params.row.name)}
          rowSelectionModel={selectedTable ? [selectedTable] : []}
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => !isDeleting && setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Table</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the table "{tableToDelete}"? 
            This action cannot be undone and will delete all data in this table.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialogOpen(false)} 
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress size={20} /> : null}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Table Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)}>
        <DialogTitle>Create New Table</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a name for the new table. The name should contain only letters, 
            numbers, and underscores.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Table Name"
            fullWidth
            value={newTableName}
            onChange={(e) => setNewTableName(e.target.value)}
            error={Boolean(newTableName && !/^[a-zA-Z0-9_]+$/.test(newTableName))}
            helperText={
              newTableName && !/^[a-zA-Z0-9_]+$/.test(newTableName)
                ? "Table name can only contain letters, numbers, and underscores"
                : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleCreateTable} 
            color="primary"
            disabled={!newTableName || !/^[a-zA-Z0-9_]+$/.test(newTableName)}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TablesList;