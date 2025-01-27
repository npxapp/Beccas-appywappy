// ./src/pages/components/Utils/publicTermsAndTaxonomyUtils.js
import axios from 'axios';

export const usePublicTermsAndTaxonomyUtils = () => {
  const getAllPostsPublic = async (postType = 'post') => {
    try {
      const response = await axios.get(`/api/posts/${postType}`);
      return response.data.posts;
    } catch (error) {
      console.error('Failed to fetch public posts:', error);
      throw error;
    }
  };

  const fetchTaxonomiesPublic = async () => {
    try {
      const response = await axios.get('/api/taxonomy');
      return response.data.taxonomies;
    } catch (error) {
      console.error('Failed to fetch public taxonomies:', error);
      throw error;
    }
  };

  const getTermsByTaxonomyPublic = async (taxonomy) => {
    try {
      const response = await axios.get('/api/termrelationships');
      const relationships = response.data.relationships;

      const contentByTerm = relationships.reduce((acc, item) => {
        if (item.taxonomy === taxonomy) {
          if (!acc[item.term_name]) {
            acc[item.term_name] = {
              termId: item.term_id,
              taxonomy: item.taxonomy,
              content: []
            };
          }
          acc[item.term_name].content.push({
            id: item.object_id,
            title: item.post_title,
            type: item.post_type
          });
        }
        return acc;
      }, {});

      return contentByTerm;
    } catch (error) {
      console.error('Failed to fetch terms by taxonomy:', error);
      throw error;
    }
  };

  // New API Method
  const getTermsByTaxonomyAndType = async (taxonomy, postType) => {
    try {
      const response = await axios.get('/api/termrelationships');
      const relationships = response.data.relationships;

      const contentByTerm = relationships.reduce((acc, item) => {
        if (item.taxonomy === taxonomy && item.post_type === postType) {
          if (!acc[item.term_name]) {
            acc[item.term_name] = {
              termId: item.term_id,
              taxonomy: item.taxonomy,
              content: []
            };
          }
          acc[item.term_name].content.push({
            id: item.object_id,
            title: item.post_title,
            type: item.post_type,
            content: item.post_content
          });
        }
        return acc;
      }, {});

      return contentByTerm;
    } catch (error) {
      console.error('Failed to fetch terms by taxonomy and type:', error);
      throw error;
    }
  };

  return {
    getAllPostsPublic,
    fetchTaxonomiesPublic,
    getTermsByTaxonomyPublic,
    getTermsByTaxonomyAndType,
  };
};