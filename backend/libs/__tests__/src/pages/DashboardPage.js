import React, { useState, useEffect } from 'react';
import { 
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Alert,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageIcon from '@mui/icons-material/Article';
import PostIcon from '@mui/icons-material/Description';
import LinkIcon from '@mui/icons-material/Link';
import SettingsIcon from '@mui/icons-material/Settings';
import PreviewIcon from '@mui/icons-material/Visibility';
import DatabaseIcon from '@mui/icons-material/Storage';
import { TablesList } from './components/TablesList';
import { TableStructure } from './components/TableStructure';
import { TableContent } from './components/TableContent';
import { TableContentCreate } from './components/TableContentCreate';
import useTableApi from './api/tableApi';
import { useDashboardDrawerProtected } from '../contexts/DashboardDrawerProtectedContext';

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
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const { dashboardDrawerProtectedOpen, toggleDashboardDrawerProtected } = useDashboardDrawerProtected();
  const [previewData, setPreviewData] = useState({
    pages: [],
    posts: [],
    links: [],
    options: []
  });

  const api = useTableApi();
  
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        setLoading(true);
        await Promise.all([loadTables(), loadPreviewData()]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();
  }, []);

  const loadTables = async () => {
    try {
      const tablesData = await api.getTables();
      setTables(tablesData);
    } catch (err) {
      throw new Error('Failed to load tables');
    }
  };

  const loadPreviewData = async () => {
    try {
      const data = await api.getPreviewData();
      setPreviewData(data);
    } catch (err) {
      throw new Error('Failed to load preview data');
    }
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      await loadTables();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const DrawerSection = ({ title, items = [], itemTitleKey, icon: SectionIcon }) => (
    <Accordion defaultExpanded>
      <AccordionSummary 
        expandIcon={<ExpandMoreIcon />}
        sx={{
          '&.MuiAccordionSummary-root': {
            minHeight: 48,
            '& .MuiAccordionSummary-content': {
              margin: '12px 0'
            }
          }
        }}
      >
        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SectionIcon color="primary" />
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List dense>
          {items.map((item, index) => (
            <ListItem key={`${title}-${index}`} button>
              <ListItemIcon>
                <PreviewIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary={item[itemTitleKey]} 
                primaryTypographyProps={{ noWrap: true }} 
              />
            </ListItem>
          ))}
          <Divider sx={{ my: 1 }} />
          <ListItem>
            <Button 
              fullWidth 
              variant="text" 
              startIcon={<PreviewIcon />}
              sx={{ justifyContent: 'flex-start' }}
            >
              View All {title}
            </Button>
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );

  if (loading) {
    return (
      <Grid 
        container 
        justifyContent="center" 
        alignItems="center" 
        sx={{ minHeight: '100vh', bgcolor: 'black' }}
      >
        <CircularProgress size={100} />
      </Grid>
    );
  }

  return (
    <Grid container sx={{ bgcolor: 'black', minHeight: '100vh' }}>
      <Drawer
        anchor="left"
        open={dashboardDrawerProtectedOpen}
        onClose={toggleDashboardDrawerProtected}
        ModalProps={{
          keepMounted: true,
          onBackdropClick: toggleDashboardDrawerProtected()
        }}
        sx={{
          width: 320,
          '& .MuiDrawer-paper': {
            width: 320,
            boxSizing: 'border-box',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'black'
          }
        }}
      >
        <Typography variant="h6" sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <DatabaseIcon color="primary" />
          Database Preview
        </Typography>
        <DrawerSection title="Pages" items={previewData.pages} itemTitleKey="post_title" icon={PageIcon} />
        <DrawerSection title="Posts" items={previewData.posts} itemTitleKey="post_title" icon={PostIcon} />
        <DrawerSection title="Links" items={previewData.links} itemTitleKey="link_name" icon={LinkIcon} />
        <DrawerSection title="Options" items={previewData.options} itemTitleKey="option_name" icon={SettingsIcon} />
      </Drawer>

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
                <Typography>Select a table to view its structure and content</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;