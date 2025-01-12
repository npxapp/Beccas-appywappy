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
  Box
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
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
  // Add this new state at the top with other states
  const [originalRowData, setOriginalRowData] = useState(null);
  
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
  
    // Modify handleEditClick to store the original row data
    const handleEditClick = (row, column) => {
      // Find the original row data from content
      const originalRow = content.find(contentRow => {
        const idColumn = Object.keys(contentRow).find(key => 
          key.toLowerCase() === 'link_id' || 
          key.toLowerCase() === 'id'
        );
        return contentRow[idColumn] === row[idColumn];
      });
      
      setOriginalRowData(originalRow);
      setSelectedRow(row);
      setSelectedColumn(column);
      setNewValue(row[column]);
      setOpenDialog(true);
    };
      
    // Modify handleSaveChanges to use originalRowData
    const handleSaveChanges = async () => {
      try {
        if (!originalRowData) {
          throw new Error('Original row data not found');
        }
        if(!selectedRow) {
          return;
        }
    
        const idColumn = Object.keys(originalRowData).find(key => 
          key.toLowerCase() === 'link_id' || 
          key.toLowerCase() === 'id'
        );
        const rowId = originalRowData[idColumn];
    
        if (rowId) {
          await api.updateFieldValue(tableName, rowId, selectedColumn, newValue, idColumn);
          setOpenDialog(false);
          loadContent();
        } else {
          throw new Error('No valid ID found in the row');
        }
      } catch (err) {
        alert(err);
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
          variant="SuccessIcon"
        />
      </div>
    )
  }));

  const rows = content.map((row, index) => ({
    id: row.id || Object.values(row)[0] || index,
    ...row
  }));

  return (
      <Paper>
        <Typography variant="h6" sx={{ p: 2 }}>Table Content</Typography>
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
      </Paper>
  );
};

export default TableContent;