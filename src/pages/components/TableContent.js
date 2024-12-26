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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import useTableApi from './sources/tableApi';

export const TableContent = ({ tableName }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [newValue, setNewValue] = useState('');

  const api = useTableApi();

  useEffect(() => {
    loadContent();
  }, [tableName]);

  const loadContent = async () => {
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
  };

  const handleEditClick = (row, column) => {
    setSelectedRow(row);
    setSelectedColumn(column);
    setNewValue(row[column]);
    setOpenDialog(true);
  };

  /*const handleSaveChanges = async () => {
    try {
      await api.updateFieldValue(tableName, selectedRow.id, selectedColumn, newValue);
      setOpenDialog(false);
      loadContent();
    } catch (err) {
    }
  };*/

/*const handleSaveChanges = async () => {
  try {
    // First, check if selectedRow.id exists
    let rowId = selectedRow.id;

    // If selectedRow.id doesn't exist, look for the first column that contains 'id'
    if (!rowId) {
      const firstColumn = Object.keys(selectedRow)[0];
      if (firstColumn.toLowerCase().includes('id')) {
        rowId = selectedRow[firstColumn];
        await api.updateFieldValue(tableName, rowId, selectedColumn, newValue, firstColumn);
        setOpenDialog(false);
        loadContent();
      }
    }
    if (rowId) {
      await api.updateFieldValue(tableName, rowId, selectedColumn, newValue);
      setOpenDialog(false);
      loadContent();
    } else {
      throw new Error('No valid ID found in the row');
    }
  } catch (err) {
    console.error(err);
  }
};*/
  
const handleSaveChanges = async () => {
  try {
    let rowId = selectedRow.id;

    // If selectedRow.id doesn't exist, find the first column that contains 'id'
    if (!rowId) {
      const firstColumn = Object.keys(selectedRow)[0];
      if (firstColumn.toLowerCase().includes('id')) {
        rowId = selectedRow[firstColumn];
      }
    }

    if (rowId) {
      // Call API with or without rowIdColumnName based on whether we found a valid column
      const firstColumn = Object.keys(selectedRow)[0]; // Get first column (if necessary)
      const rowIdColumnName = firstColumn.toLowerCase().includes('id') ? firstColumn : null;

      await api.updateFieldValue(tableName, rowId, selectedColumn, newValue, rowIdColumnName);
      setOpenDialog(false);
      loadContent();
    } else {
      throw new Error('No valid ID found in the row');
    }
  } catch (err) {
    console.error(err);
  }
};
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!content || !content.length) return <Typography>No data available</Typography>;

  const columns = Object.keys(content[0]);

  return (
    <>
      <Paper>
        <Typography variant="h6" sx={{ p: 2 }}>Table Content {localStorage.getItem('token')}</Typography>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(content) && content.length > 0 ? (
              content.map((row, index) => (
                <TableRow key={index}>
                  {Array.isArray(columns) && columns.length > 0 ? (
                    columns.map((column) => {
                      let cellValue = row[column];

                      if (cellValue === null || cellValue === undefined) {
                        cellValue = "No Data";
                      }

                      if (cellValue instanceof Blob || column.toLowerCase() === 'bytea') {
                        cellValue = "Binary Data";
                      }

                      if (typeof cellValue === 'object' && cellValue !== null) {
                        cellValue = "Invalid Object";
                      }

                      return (
                        <TableCell key={column}>
                          {cellValue}
                          <IconButton onClick={() => handleEditClick(row, column)}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      );
                    })
                  ) : (
                    <TableCell colSpan={columns.length}>
                      <Typography>No valid columns to display</Typography>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Typography>No data available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Field Value</DialogTitle>
        <DialogContent>
          <TextField
            label="New Value"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleSaveChanges} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TableContent;