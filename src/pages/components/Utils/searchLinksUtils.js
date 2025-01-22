// Updated Utility File - ./src/pages/components/Utils/searchLinksUtils.js
import axios from 'axios';

export const useSearchLinksUtils = () => {
  const getSearchLinks = async (searchTerm) => {
    try {
      const response = await axios.get(`/api/links/search/${encodeURIComponent(searchTerm)}`);
      
      // Return the full searchResults object which will only contain
      // the relevant key (first, second, or third)
      return response.data.searchResults;
    } catch (error) {
      console.error(`Failed to fetch ${searchTerm} links:`, error);
      throw error;
    }
  };

  return {
    getSearchLinks,
  };
};