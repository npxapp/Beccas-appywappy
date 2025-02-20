// ./src/pages/components/TablesList.jsx
import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Alert
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import useTableApi from './sources/tableApi';

export const TablesList = ({ tables = [], selectedTable, onTableSelect, onRefresh }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tableToDelete, setTableToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newTableName, setNewTableName] = useState('');

  const api = useTableApi();

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
      
      // If the deleted table was selected, clear the selection
      if (selectedTable === tableToDelete) {
        onTableSelect(null);
      }
      
      // Close dialog and refresh list
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
        <Typography variant="h6">Tables</Typography>
        <Box>
          <IconButton 
            size="small" 
            onClick={onRefresh} 
            title="Refresh tables list"
            sx={{ mr: 1 }}
          >
            <RefreshIcon />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => setCreateDialogOpen(true)}
            title="Create new table"
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      <List sx={{ width: '100%' }}>
        {tables.map((table) => (
          <ListItem
            key={table.name}
            button
            selected={selectedTable === table.name}
            onClick={() => onTableSelect(table.name)}
            disabled={isDeleting && tableToDelete === table.name}
          >
            <ListItemText
              primary={table.name}
              secondary={`${table.rowCount || 0} rows`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={(e) => handleDeleteClick(table.name, e)}
                disabled={isDeleting}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

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