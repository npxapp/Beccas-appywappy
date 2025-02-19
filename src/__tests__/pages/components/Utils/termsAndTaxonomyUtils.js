// ./src/pages/components/Utils/termsAndTaxonomyUtils
import useTableApi from '../sources/tableApi';

export const useTermsAndTaxonomyUtils = () => {
  const api = useTableApi();

  const fetchTerms = async () => {
    try {
      const result = await api.getTableContent('terms');
      return result;
    } catch (error) {
      console.error('Failed to fetch terms:', error);
      throw error;
    }
  };

  const fetchTaxonomies = async () => {
    try {
      const result = await api.getTableContent('termtaxonomy');
      return result;
    } catch (error) {
      console.error('Failed to fetch taxonomies:', error);
      throw error;
    }
  };

  const createTerm = async (termData) => {
    try {
      const result = await api.createTableContent('terms', termData);
      return result;
    } catch (error) {
      console.error('Failed to create term:', error);
      throw error;
    }
  };

  const createTaxonomy = async (taxonomyData) => {
    try {
      const result = await api.createTableContent('termtaxonomy', taxonomyData);
      return result;
    } catch (error) {
      console.error('Failed to create taxonomy:', error);
      throw error;
    }
  };

  const createTermRelationship = async (relationshipData) => {
    try {
      const result = await api.createTableContent('termrelationships', relationshipData);
      return result;
    } catch (error) {
      console.error('Failed to create term relationship:', error);
      throw error;
    }
  };

  const createPost = async (postData) => {
    try {
      const result = await api.createTableContent('posts', postData);
      return result;
    } catch (error) {
      console.error('Failed to create post:', error);
      throw error;
    }
  };
  
    const getPostTerms = async (postId) => {
      try {
        // Get all term relationships for this post using the new method
        const relationships = await api.getTermRelationshipsContent({
          object_id: postId
        });
    
        if (!relationships.length) {
          return [];
        }
        // Get the taxonomies using existing fetchTaxonomies method
        const taxonomies = await fetchTaxonomies();
        const relevantTaxonomies = taxonomies.filter(tax => 
          relationships.some(rel => rel.term_taxonomy_id === tax.term_taxonomy_id)
        );
    
        // Get all term_ids
        const termIds = relevantTaxonomies.map(tax => tax.term_id);
    
        if (termIds.length === 0) {
          return [];
        }
    
        // Get the actual terms using the existing getTermsContent method
        const terms = await api.getTermsContent(termIds);
        return terms;
      } catch (error) {
        console.error('Failed to fetch post terms:', error);
        throw error;
      }
    };
  
    const getTermsByTaxonomy = async (taxonomy) => {
      try {
        // Use the existing fetchTaxonomies method
        const taxonomies = await fetchTaxonomies();
        
        // Filter taxonomies by the requested taxonomy type
        const filteredTaxonomies = taxonomies.filter(tax => tax.taxonomy === taxonomy);
        
        // Extract term IDs
        const termIds = filteredTaxonomies.map(tax => tax.term_id);
        
        if (termIds.length === 0) {
          return [];
        }
    
        // Use the new getTermsContent method
        const terms = await api.getTermsContent(termIds);
        return terms;
      } catch (error) {
        console.error('Failed to fetch terms by taxonomy:', error);
        throw error;
      }
    };
  
    const editPost = async (postId, postData) => {
      try {
        if (postData.post_title) {
          await api.updateFieldValue('posts', postId, 'post_title', postData.post_title, 'id');
        }
        if (postData.post_content) {
          await api.updateFieldValue('posts', postId, 'post_content', postData.post_content, 'id');
        }
        if (postData.post_excerpt) {
          await api.updateFieldValue('posts', postId, 'post_excerpt', postData.post_excerpt, 'id');
        }
        if (postData.post_status) {
          await api.updateFieldValue('posts', postId, 'post_status', postData.post_status, 'id');
        }
        if (postData.post_type) {
          await api.updateFieldValue('posts', postId, 'post_type', postData.post_type, 'id');
        }
        if (postData.post_author) {
          await api.updateFieldValue('posts', postId, 'post_author', postData.post_author, 'id');
        }
        if (postData.comment_status) {
          await api.updateFieldValue('posts', postId, 'comment_status', postData.comment_status, 'id');
        }
        if (postData.ping_status) {
          await api.updateFieldValue('posts', postId, 'ping_status', postData.ping_status, 'id');
        }
        
    // Handle term relationships
    if (postData.selectedTerms) {
      // Get all taxonomies to get term_taxonomy_ids
      const taxonomies = await fetchTaxonomies();
      
      // Delete existing relationships using deleteTableContent since it uses direct ID
      const existingRelationships = await api.getTermRelationshipsContent({
        object_id: postId
      });

      await Promise.all(existingRelationships.map(rel => 
        api.deleteTableContent('termrelationships', rel.object_id, 'object_id')
      ));

      // Create new relationships using term_taxonomy_ids
      const newRelationships = postData.selectedTerms.map(termId => {
        const taxonomy = taxonomies.find(tax => tax.term_id === termId);
        if (!taxonomy) return null;

        return {
          object_id: postId,
          term_taxonomy_id: taxonomy.term_taxonomy_id,
          term_order: 0
        };
      }).filter(Boolean);

      await Promise.all(newRelationships.map(rel =>
        api.createTableContent('termrelationships', rel)
      ));
    }
    
        return { success: true };  // Return a success response
      } catch (error) {
        console.error('Failed to edit post:', error);
        throw error;
      }
    };

  const getAllPosts = async (postTypes = ['post', 'page', 'card']) => {
    try {
      const result = await api.getPostsContent(postTypes);
      return result;
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      throw error;
    }
  };

  const getPostsByType = async (postType) => {
    try {
      const result = await api.getPostsContent(postType);
      return result;
    } catch (error) {
      console.error(`Failed to fetch posts of type ${postType}:`, error);
      throw error;
    }
  };

  return {
    fetchTerms,
    fetchTaxonomies,
    createTerm,
    createTaxonomy,
    createTermRelationship,
    createPost,
    getTermsByTaxonomy,
    editPost,
    getAllPosts,
    getPostsByType,
    getPostTerms
  };
};

