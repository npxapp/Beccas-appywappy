// ./src/pages/components/ContentByTerms.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import PagesIcon from '@mui/icons-material/Pages';
import ArticleIcon from '@mui/icons-material/Article';
import { useAccordionContext } from '../../contexts/AccordionContext';
import { usePublicTermsAndTaxonomyUtils } from './Utils/publicTermsAndTaxonomyUtils';

const AccordionContentByTerms = ({ postType = 'post' }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [organizedContent, setOrganizedContent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  const { getTermsByTaxonomyAndType } = usePublicTermsAndTaxonomyUtils();
  const { expanded, handleChange } = useAccordionContext();

  const fetchData = useCallback(async () => {
    if (organizedContent?.postType === postType) return;

    try {
      setLoading(true);
      setError(null);

      const contentByCategories = await getTermsByTaxonomyAndType('category', postType);
      setOrganizedContent({ ...contentByCategories, postType });
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch content: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [organizedContent, getTermsByTaxonomyAndType, postType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClickOpen = (item) => {
    setSelectedContent(item);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedContent(null);
  };

  const getTermIcon = (termName) => {
    if (termName === 'Components') return <CodeIcon />;
    if (termName === 'Pages') return <PagesIcon />;
    return null;
  };

  const getDetailIcon = (termName) => {
    if (termName === 'Components') return <IntegrationInstructionsIcon />;
    if (termName === 'Pages') return <ArticleIcon />;
    return null;
  };

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  if (!organizedContent || Object.keys(organizedContent).length === 0) {
    return (
      <Box>
        <Typography>No content available for the selected post type: {postType}</Typography>
      </Box>
    );
  }

  return (
    <>
        {Object.entries(organizedContent)
          .filter(([termName]) => termName !== 'postType')
          .map(([termName, data]) => (
            <Accordion 
              key={data.termId || termName} 
              expanded={expanded === termName} 
              onChange={handleChange(termName)}
              sx={{
                width: '100%',
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-50">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {getTermIcon(termName)}
                  <Typography variant="h6" className="font-medium">
                    {termName}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  {Array.isArray(data.content) && data.content.length > 0 ? (
                    data.content.map((item) => (
                      <Box
                        key={item.id}
                        onClick={() => handleClickOpen(item)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          p: 1.5,
                          cursor: 'pointer',
                          borderRadius: 1,
                          '&:hover': {
                            bgcolor: 'rgba(97,218,251,0.1)',
                          },
                        }}
                      >
                        {getDetailIcon(termName)}
                        <Typography>{item.title}</Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography>No content available for this term.</Typography>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}

      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        aria-labelledby="content-dialog-title"
      >
        <DialogTitle id="content-dialog-title">
          {selectedContent?.title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography sx={{ whiteSpace: "pre-wrap", }} >
            {selectedContent?.content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(AccordionContentByTerms);