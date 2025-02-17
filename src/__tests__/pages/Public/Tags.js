import React, { useState, useEffect } from 'react';
import { usePublicTermsAndTaxonomyUtils } from './components/Utils/publicTermsAndTaxonomyUtils';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Container, 
  Box,
  CircularProgress,
  Alert,
  CardActionArea,
  Chip
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useDarkMode } from 'contexts/DarkMode';

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAllTags } = usePublicTermsAndTaxonomyUtils();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsData = await getAllTags();
        setTags(tagsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load tags');
        setLoading(false);
      }
    };

    fetchTags();
  }, [getAllTags]);

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="200px"
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: 4,
        backgroundColor: darkMode ? 'black' : 'white',
      }}
    >
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tags
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse all available tags
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {tags.map((tag) => (
          <Grid item xs={12} sm={6} md={4} key={tag.term_id}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.shadows[4]
                }
              }}
            >
              <CardActionArea sx={{ height: '100%' }}>
                <CardContent>
                  <Box 
                    display="flex" 
                    alignItems="center" 
                    mb={2}
                  >
                    <LocalOfferIcon 
                      sx={{ 
                        mr: 1,
                        color: 'primary.main'
                      }} 
                    />
                    <Typography variant="h6" component="h2">
                      {tag.name}
                    </Typography>
                  </Box>
                  <Box 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="space-between"
                  >
                    <Chip 
                      label={tag.slug}
                      size="small"
                      variant="outlined"
                      sx={{ 
                        borderRadius: 1,
                        backgroundColor: 'background.paper'
                      }}
                    />
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                    >
                      ID: {tag.term_id}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Tags;

