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
  Button
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import EditIcon from '@mui/icons-material/Edit';
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
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [newValue, setNewValue] = useState('');

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

  const handleEditClick = (row, column) => {
    setSelectedRow(row);
    setSelectedColumn(column);
    setNewValue(row[column]);
    setOpenDialog(true);
  };

  const handleSaveChanges = async () => {
    try {
      let rowId = selectedRow.id;

      if (!rowId) {
        const firstColumn = Object.keys(selectedRow)[0];
        if (firstColumn.toLowerCase().includes('id')) {
          rowId = selectedRow[firstColumn];
        }
      }

      if (rowId) {
        const firstColumn = Object.keys(selectedRow)[0];
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

  const columns = Object.keys(content[0]).map(field => ({
    field,
    headerName: field,
    flex: 1,
    renderCell: (params) => (
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {renderCellContent(params.value)}
        <EditIcon
          style={{ cursor: 'pointer', opacity: 0.7 }}
          onClick={() => handleEditClick(params.row, field)}
        />
      </div>
    )
  }));

  const rows = content.map((row, index) => ({
    id: row.id || Object.values(row)[0] || index,
    ...row
  }));

  return (
    <>
      <Paper>
        <Typography variant="h6" sx={{ p: 2 }}>Table Content</Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          hideFooter={rows.length <= 100}
          sx={{
            '& .MuiDataGrid-cell': {
              padding: '8px',
              '&:hover': {
                '& .MuiSvgIcon-root': {
                  opacity: 1
                }
              }
            }
          }}
        />
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