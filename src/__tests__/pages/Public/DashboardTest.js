// ./src/pages/DashboardTest.js
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Box,
  Slide,
  Chip,
  IconButton,
  Alert,
  AppBar,
  Toolbar,
  Typography,
  Divider,
} from '@mui/material';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchemaIcon from '@mui/icons-material/Schema';
import TableViewIcon from '@mui/icons-material/TableView';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import PageIcon from '@mui/icons-material/Article';
import LinkIcon from '@mui/icons-material/Link';
import PersonIcon from '@mui/icons-material/Person';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TablesList } from 'pages/components/TablesList';
import { TableStructure } from 'pages/components/TableStructure';
import { TableContent } from 'pages/components/TableContent';
import { TableContentCreate } from 'pages/components/TableContentCreate';
import MediaLibraryUpload from 'pages/components/MediaLibraryUpload';
import CreateTermForm from 'pages/components/CreateTermForm';
import CreateTaxonomyForm from 'pages/components/CreateTaxonomyForm';
import CreatePostForm from 'pages/components/CreatePostForm';
import EditPostForm from 'pages/components/EditPostForm';
import useTableApi from 'pages/components/sources/tableApi';
import { useDashboardDrawerProtected } from 'contexts/DashboardDrawerProtectedContext';
import { useCms } from 'contexts/CmsContext';
import { useSlide } from 'contexts/SlideContext';
import DashboardDrawer from 'pages/components/DashboardDrawer';
import LoadingSkeleton from 'pages/components/LoadingSkeleton';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';

const DashboardTest = () => {
  const {
    tables,
    selectedTable,
    loading,
    error,
    previewData,
    setSelectedTable,
    setError,
    handleRefresh,
    initializeDashboard,
  } = useCms();

  const [isCompactView, setIsCompactView] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showStructure, setShowStructure] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const { dashboardDrawerProtectedOpen, toggleDashboardDrawerProtected } = useDashboardDrawerProtected();
  const { activeSlide, setActiveSlide, setPreviousSlide } = useSlide();
  const api = useTableApi();

  useEffect(() => {
    initializeDashboard(api);
  }, [initializeDashboard, api]);

  const handleSlideChange = (slideNumber) => () => {
    setPreviousSlide(activeSlide);
    setActiveSlide(slideNumber);
  };

  if (loading) {
    return <LoadingSkeleton />;
  }
  
  return (
    <>
      <DashboardDrawer
        open={dashboardDrawerProtectedOpen}
        onClose={toggleDashboardDrawerProtected}
        previewData={previewData}
      />

      <Slide direction="right" in={activeSlide === 0} mountOnEnter unmountOnExit>
        <Grid container sx={{ width: { xs: '100%', sm: 600, }, mx: 'auto', background: 'linear-gradient(90deg, rgba(0,2,3,0) 0%, rgba(0,2,3,1) 50%, rgba(0,2,3,0) 100%)', }}>
          <Grid item xs={12}>
            <AppBar position="static" sx={{ background: 'transparent', }}>
              <Toolbar sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: '100%' }}>
                <Box onClick={() => setIsCompactView(!isCompactView)} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 24px', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }, color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isCompactView ? <ViewListIcon /> : <ViewModuleIcon />}Sort
                  </Box>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 24px', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }, color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AddOutlinedIcon />New
                  </Box>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box onClick={() => setShowList(!showList)} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 24px', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }, color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {showList ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}List
                  </Box>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box onClick={() => setShowStructure(!showStructure)} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 24px', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }, color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {showStructure ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}Structure
                  </Box>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box onClick={() => setShowContent(!showContent)} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 24px', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }, color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {showContent ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}Content
                  </Box>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box onClick={() => setShowCreate(!showCreate)} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 24px', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }, color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {showCreate ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}Create
                  </Box>
                </Box>
              </Toolbar>
            </AppBar>
            </Grid>  
            <Grid item xs={12}>
            <Paper>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                <Typography>Quick View panel</Typography>
                <Grid container>
                  <Grid item xs={12}>
                   <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                    <Typography>Actions</Typography>
                    <Chip icon={<MenuOpenRoundedIcon />} label="Open Panel" size="small" onClick={() => toggleDashboardDrawerProtected(!dashboardDrawerProtectedOpen)} />
                    {selectedTable && (
                      <Chip icon={<CancelIcon />} label="Clear all" size="small" onClick={() => setSelectedTable(null)} />
                    )}
                    <Chip icon={<CloudUploadIcon />} label="Upload file" size="small" onClick={handleSlideChange(5)} />
                    <Typography>Build</Typography>
                    <Chip icon={<PersonIcon />} label="Terms" size="small" onClick={handleSlideChange(6)} />
                    <Chip icon={<LinkIcon />} label="Taxonomy" size="small" onClick={handleSlideChange(7)} />
                    <Chip icon={<PageIcon />} label="Create Post" size="small" onClick={handleSlideChange(8)} />
                    <Chip icon={<PageIcon />} label="Edit Post" size="small" onClick={handleSlideChange(9)} />
                    <Typography>Manage</Typography>
                    <Chip icon={<ViewListIcon />} label="Tables List" size="small" onClick={handleSlideChange(1)} disabled={!tables || tables.length === 0} />
                    <Chip icon={<SchemaIcon />} label={`Structure ${selectedTable ? selectedTable : ''}`} size="small" onClick={handleSlideChange(2)} disabled={!selectedTable} />
                    <Chip icon={<TableViewIcon />} label={`Content ${selectedTable ? selectedTable : ''}`} size="small" onClick={handleSlideChange(3)} disabled={!selectedTable} />
                    <Chip icon={<AddBoxIcon />} label={`Create ${selectedTable ? selectedTable : ''}`} size="small" onClick={handleSlideChange(4)} disabled={!selectedTable} />
                   </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
            </Grid>
            <Grid item xs={12}>
              <Typography>Grid Papers</Typography>
              <Box>
                <Paper>
                  <TablesList tables={tables} selectedTable={selectedTable} onTableSelect={setSelectedTable} onRefresh={handleRefresh} />
                </Paper>
                <Paper>
                  {selectedTable && showStructure && (
                    <TableStructure tableName={selectedTable} onError={setError} />
                  )}
                </Paper>
                <Paper>
                  {selectedTable && showContent && (
                    <TableContent tableName={selectedTable} onError={setError} />
                  )}
                </Paper>
                <Paper>
                  {selectedTable && showCreate && (
                    <TableContentCreate tableName={selectedTable} onError={setError} />
                  )}
                </Paper>
              </Box>
          </Grid>
        </Grid>
      </Slide>

      <Slide direction="left" in={activeSlide === 1} mountOnEnter unmountOnExit>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
          }}
        >
          <IconButton onClick={handleSlideChange(0)} sx={{ mb: 2 }}>
            <ArrowBackIcon sx={{ color: '#61dafb' }} />
          </IconButton>
          </Box>
          <Paper sx={{ p: 2 }}>
            <TablesList
              tables={tables}
              selectedTable={selectedTable}
              onTableSelect={setSelectedTable}
              onRefresh={handleRefresh}
            />
          </Paper>
        </Box>
      </Slide>

      <Slide direction="left" in={activeSlide === 2} mountOnEnter unmountOnExit>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
          }}
        >
          <IconButton onClick={handleSlideChange(0)} sx={{ mb: 2 }}>
            <ArrowBackIcon sx={{ color: '#61dafb' }} />
          </IconButton>
          </Box>
          <Paper sx={{ p: 2 }}>
            <TableStructure tableName={selectedTable} onError={setError} />
          </Paper>
        </Box>
      </Slide>

      <Slide direction="left" in={activeSlide === 3} mountOnEnter unmountOnExit>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
          }}
        >
          <IconButton onClick={handleSlideChange(0)} sx={{ mb: 2 }}>
            <ArrowBackIcon sx={{ color: '#61dafb' }} />
          </IconButton>
          </Box>
          <Paper sx={{ p: 2 }}>
            <TableContent tableName={selectedTable} onError={setError} />
          </Paper>
        </Box>
      </Slide>

      <Slide direction="left" in={activeSlide === 4} mountOnEnter unmountOnExit>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
          }}
        >
          <IconButton onClick={handleSlideChange(0)} sx={{ mb: 2 }}>
            <ArrowBackIcon sx={{ color: '#61dafb' }} />
          </IconButton>
          </Box>
          <Paper sx={{ p: 2 }}>
            <TableContentCreate tableName={selectedTable} onError={setError} />
          </Paper>
        </Box>
      </Slide>
  
      <Slide direction="left" in={activeSlide === 5} mountOnEnter unmountOnExit>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
          }}
        >
          <IconButton onClick={handleSlideChange(0)} sx={{ mb: 2 }}>
            <ArrowBackIcon sx={{ color: '#61dafb' }} />
          </IconButton>
          </Box>
          <Paper sx={{ p: 2 }}>
            <MediaLibraryUpload />
          </Paper>
        </Box>
      </Slide>
  
      <Slide direction="left" in={activeSlide === 6} mountOnEnter unmountOnExit>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
          }}
        >
          <IconButton onClick={handleSlideChange(0)} sx={{ mb: 2 }}>
            <ArrowBackIcon sx={{ color: '#61dafb' }} />
          </IconButton>
          </Box>
          <Paper sx={{ p: 2 }}>
            <CreateTermForm />
          </Paper>
        </Box>
      </Slide>
  
      <Slide direction="left" in={activeSlide === 7} mountOnEnter unmountOnExit>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
          }}
        >
          <IconButton onClick={handleSlideChange(0)} sx={{ mb: 2 }}>
            <ArrowBackIcon sx={{ color: '#61dafb' }} />
          </IconButton>
          </Box>
          <Paper sx={{ p: 2 }}>
            <CreateTaxonomyForm />
          </Paper>
        </Box>
      </Slide>
  
      <Slide direction="left" in={activeSlide === 8} mountOnEnter unmountOnExit>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
          }}
        >
          <IconButton onClick={handleSlideChange(0)} sx={{ mb: 2 }}>
            <ArrowBackIcon sx={{ color: '#61dafb' }} />
          </IconButton>
          </Box>
          <Paper sx={{ p: 2 }}>
            <CreatePostForm />
          </Paper>
        </Box>
      </Slide>
  
      <Slide direction="left" in={activeSlide === 9} mountOnEnter unmountOnExit>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
          }}
        >
          <IconButton onClick={handleSlideChange(0)} sx={{ mb: 2 }}>
            <ArrowBackIcon sx={{ color: '#61dafb' }} />
          </IconButton>
          </Box>
          <Paper sx={{ p: 2 }}>
            <EditPostForm />
          </Paper>
        </Box>
      </Slide>

      {error && (
        <Alert severity="error" sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}>
          {error}
        </Alert>
      )}
    </>
  );
};

export default DashboardTest;