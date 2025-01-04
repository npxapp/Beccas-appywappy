// ./src/pages/DashboardPage.js
import React, { useEffect } from 'react';
import { 
  Grid,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  Alert,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  Skeleton,
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { TablesList } from './components/TablesList';
import { TableStructure } from './components/TableStructure';
import { TableContent } from './components/TableContent';
import { TableContentCreate } from './components/TableContentCreate';
import useTableApi from './components/sources/tableApi';
import { useDashboardDrawerProtected } from '../contexts/DashboardDrawerProtectedContext';
import { useCms } from '../contexts/CmsContext';
import DashboardDrawer from './components/DashboardDrawer';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const cyberpunkStyle = {
  background: 'linear-gradient(135deg, rgba(97,218,251,0.15) 0%, rgba(97,218,251,0.05) 100%)',
  backdropFilter: 'blur(8px)',
  borderRadius: '8px',
  boxShadow: 'inset 0 2px 8px rgba(97,218,251,0.2), inset 0 -2px 8px rgba(0,0,0,0.3)',
  color: 'white'
};

const DashboardPage = () => {
  const {
    tables,
    selectedTable,
    loading,
    error,
    tabValue,
    previewData,
    setSelectedTable,
    setError,
    handleTabChange,
    handleRefresh,
    initializeDashboard
  } = useCms();
  const { dashboardDrawerProtectedOpen, toggleDashboardDrawerProtected } = useDashboardDrawerProtected();

  const api = useTableApi();

  useEffect(() => {
    initializeDashboard(api);
  }, [initializeDashboard, api]);

  if (loading) {
    return (
      <Grid container 
        sx={{ 
          minHeight: '100vh',
        }}
      >
        <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                <Skeleton variant="circular" width={50} height={50} />
              </Grid>
              <Grid item xs={10}>
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
              </Grid>
            </Grid>
          <Grid container spacing={3} sx={{ p: 3 }}>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={10}>
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
              </Grid>
              <Grid item xs={2}>
                <Skeleton variant="circular" width={50} height={50} />
              </Grid>
            </Grid>
          </Grid>
          
          {[...Array(5)].map((_, index) => (
            <Grid item xs={12} key={index}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={10}>
                  <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                </Grid>
                <Grid item xs={2}>
                  <Skeleton variant="circular" width={25} height={25} />
                </Grid>
              </Grid>
            </Grid>
          ))}
          </Grid>
        </Grid>
        <Box 
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
        >
            <CircularProgress size={100} />
        </Box>
    </Grid>
    );
  }

  return (
      <Grid container 
        sx={{ 
          minHeight: '100vh',
        }}
      >
<DashboardDrawer 
  open={dashboardDrawerProtectedOpen} 
  onClose={toggleDashboardDrawerProtected} 
  previewData={previewData} 
/>

      <Grid item xs={12}>
        <AppBar position="static" sx={cyberpunkStyle}>
          <Toolbar>
            <IconButton 
              onClick={() => toggleDashboardDrawerProtected(!dashboardDrawerProtectedOpen)}
              sx={{ color: 'white' }}
            >
              <DragHandleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Grid container spacing={3} sx={{ p: 3 }}>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          
          <Grid item xs={12} sm={3}>
            <Paper sx={{ p: 2, height: '100%', minHeight: 200 }}>
              <TablesList 
                tables={tables} 
                selectedTable={selectedTable}
                onTableSelect={setSelectedTable}
                onRefresh={handleRefresh}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={9}>
            <Paper sx={{ p: 2 }}>
              {selectedTable ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    {selectedTable}
                  </Typography>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                      <Tab label="Structure" />
                      <Tab label="Content" />
                      <Tab label="Create" />
                    </Tabs>
                  </Box>
                  
                  <TabPanel value={tabValue} index={0}>
                    <TableStructure 
                      tableName={selectedTable} 
                      onError={(msg) => setError(msg)}
                    />
                  </TabPanel>
                  
                  <TabPanel value={tabValue} index={1}>
                    <TableContent 
                      tableName={selectedTable}
                      onError={(msg) => setError(msg)}
                    />
                  </TabPanel>
                  
                  <TabPanel value={tabValue} index={2}>
                    <TableContentCreate 
                      tableName={selectedTable}
                      onError={(msg) => setError(msg)}
                    />
                  </TabPanel>
                </>
              ) : (
                <Typography color="text.primary">Select a table to view its structure and content</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;