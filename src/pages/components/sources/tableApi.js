// ./src/pages/components/sources/tableApi.js
import { useMemo } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

const useTableApi = () => {
  const { api } = useAuth();

  const tableApi = useMemo(() => ({
    async getTables({ onUploadProgress, onDownloadProgress } = {}) {
      try {
        const response = await api({
          method: 'GET',
          url: '/api/structure/tables',
          onUploadProgress,
          onDownloadProgress
        });
        return response.data;
      } catch (error) {
        console.error('Failed to fetch tables:', error);
        throw error;
      }
    },

    async getTableStructure(tableName, { onUploadProgress, onDownloadProgress } = {}) {
      try {
        const response = await api({
          method: 'GET',
          url: `/api/structure/${tableName}`,
          onUploadProgress,
          onDownloadProgress
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to fetch table structure for ${tableName}:`, error);
        throw error;
      }
    },

    async getTableContent(tableName, { onUploadProgress, onDownloadProgress } = {}) {
      try {
        const response = await api({
          method: 'GET',
          url: `/api/content/${tableName}`,
          onUploadProgress,
          onDownloadProgress
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to fetch table content for ${tableName}:`, error);
        throw error;
      }
    },

    async createTable(tableName, columns = [], { onUploadProgress, onDownloadProgress } = {}) {
      try {
        const response = await api({
          method: 'POST',
          url: `/api/structure/${tableName}`,
          data: { columns },
          onUploadProgress,
          onDownloadProgress
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to create table ${tableName}:`, error);
        throw error;
      }
    },

    async deleteTable(tableName, { onUploadProgress, onDownloadProgress } = {}) {
      try {
        const response = await api({
          method: 'DELETE',
          url: `/api/structure/${tableName}`,
          onUploadProgress,
          onDownloadProgress
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to delete table ${tableName}:`, error);
        throw error;
      }
    },

    async updateTable(tableName, columnName, updatedColumn, { onUploadProgress, onDownloadProgress } = {}) {
      try {
        const response = await api({
          method: 'PUT',
          url: `/api/structure/${tableName}/columns/${columnName}/${updatedColumn.name}`,
          data: updatedColumn,
          onUploadProgress,
          onDownloadProgress
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to update column ${updatedColumn.name} in table ${tableName}:`, error);
        throw error;
      }
    },
    
    // Add this to useTableApi hook
    async deleteTableContent(tableName, rowId, rowIdColumnName, { onUploadProgress, onDownloadProgress } = {}) {
      try {
        const url = rowIdColumnName 
          ? `/api/content/${tableName}/${rowId}/${rowIdColumnName}`
          : `/api/content/${tableName}/${rowId}`;
    
        const response = await api({
          method: 'DELETE',
          url: url,
          onUploadProgress,
          onDownloadProgress
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to delete row ${rowId} from table ${tableName}:`, error);
        throw error;
      }
    },

    async updateFieldValue(tableName, rowId, columnName, updatedValue, rowIdColumnName, { onUploadProgress, onDownloadProgress } = {}) {
      try {
        const url = rowIdColumnName 
          ? `/api/content/${tableName}/${rowId}/field/${columnName}/${rowIdColumnName}`
          : `/api/content/${tableName}/${rowId}/field/${columnName}`;

        const response = await api({
          method: 'PUT',
          url: url,
          data: { value: updatedValue },
          onUploadProgress,
          onDownloadProgress
        });

        return response.data;
      } catch (error) {
        console.error(`Failed to update field ${columnName} in row ${rowId} for table ${tableName}:`, error);
        throw error;
      }
    },

    async createTableContent(tableName, data, { onUploadProgress, onDownloadProgress } = {}) {
      try {
        const response = await api({
          method: 'POST',
          url: `/api/content/${tableName}`,
          data,
          onUploadProgress,
          onDownloadProgress
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to create content for ${tableName}:`, error);
        throw error;
      }
    },

    async addColumn(tableName, columnName, columnType, { onUploadProgress, onDownloadProgress } = {}) {
      try {
        const response = await api({
          method: 'POST',
          url: `/api/structure/${tableName}/columns`,
          data: { columnName, columnType },
          onUploadProgress,
          onDownloadProgress
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to add column ${columnName} to table ${tableName}:`, error);
        throw error;
      }
    },

    async dropColumn(tableName, columnName, { onUploadProgress, onDownloadProgress } = {}) {
      try {
        const response = await api({
          method: 'DELETE',
          url: `/api/structure/${tableName}/columns/${columnName}`,
          onUploadProgress,
          onDownloadProgress
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to drop column ${columnName} from table ${tableName}:`, error);
        throw error;
      }
    },

    async getPreviewData({ onUploadProgress, onDownloadProgress } = {}) {
      try {
        const [pages, posts, links, options] = await Promise.all([
          api({
            method: 'GET',
            url: '/api/preview/pages',
            onUploadProgress,
            onDownloadProgress
          }).then((res) => res.data),
          api({
            method: 'GET',
            url: '/api/preview/posts',
            onUploadProgress,
            onDownloadProgress
          }).then((res) => res.data),
          api({
            method: 'GET',
            url: '/api/preview/links',
            onUploadProgress,
            onDownloadProgress
          }).then((res) => res.data),
          api({
            method: 'GET',
            url: '/api/preview/options',
            onUploadProgress,
            onDownloadProgress
          }).then((res) => res.data),
        ]);

        return {
          pages,
          posts,
          links,
          options,
        };
      } catch (error) {
        console.error('Error fetching preview data:', error);
        throw error;
      }
    },
    
    async uploadMedia(formData, { onUploadProgress, onDownloadProgress } = {}) {
      try {
        const response = await api({
          method: 'POST',
          url: '/api/uploads',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress,
          onDownloadProgress,
        });
        return response.data;
      } catch (error) {
        console.error('Failed to upload media:', error);
        throw error;
      }
    },

    async getMediaLibrary({ onUploadProgress, onDownloadProgress } = {}) {
      try {
        const response = await api({
          method: 'GET',
          url: '/api/content/posts',
          params: {
            post_type: 'attachment'
          },
          onUploadProgress,
          onDownloadProgress
        });
        return response.data;
      } catch (error) {
        console.error('Failed to fetch media library:', error);
        throw error;
      }
    },

    async getMediaItem(id, { onUploadProgress, onDownloadProgress } = {}) {
      try {
        const response = await api({
          method: 'GET',
          url: `/api/content/posts/${id}`,
          onUploadProgress,
          onDownloadProgress
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to fetch media item ${id}:`, error);
        throw error;
      }
    },

    async deleteMediaItem(id, { onUploadProgress, onDownloadProgress } = {}) {
      try {
        const response = await api({
          method: 'DELETE',
          url: `/api/content/posts/${id}`,
          params: {
            post_type: 'attachment'
          },
          onUploadProgress,
          onDownloadProgress
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to delete media item ${id}:`, error);
        throw error;
      }
    },

    async updateMediaItem(id, data, { onUploadProgress, onDownloadProgress } = {}) {
      try {
        const response = await api({
          method: 'PUT',
          url: `/api/content/posts/${id}`,
          data: data,
          params: {
            post_type: 'attachment'
          },
          onUploadProgress,
          onDownloadProgress
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to update media item ${id}:`, error);
        throw error;
      }
    },
  
    async getPostsContent(postTypes, options = {}, { onUploadProgress, onDownloadProgress } = {}) {
      try {
        // Format conditions for the backend
        const conditions = {
          post_type: postTypes
        };
    
        const response = await api({
          method: 'GET',
          url: '/api/content/posts',
          params: {
            conditions: JSON.stringify(conditions),
            options: JSON.stringify(options),
          },
          onUploadProgress,
          onDownloadProgress,
        });
        return response.data;
      } catch (error) {
        console.error('Failed to fetch posts content:', error);
        throw error;
      }
    },
    
    async getTermRelationshipsContent(conditions = {}, options = {}, { onUploadProgress, onDownloadProgress } = {}) {
      try {
        const response = await api({
          method: 'GET',
          url: '/api/content/termrelationships',
          params: {
            conditions: JSON.stringify(conditions),
            options: JSON.stringify(options),
          },
          onUploadProgress,
          onDownloadProgress,
        });
        return response.data;
      } catch (error) {
        console.error('Failed to fetch term relationships:', error);
        throw error;
      }
    },
    
    async getTermsContent(termIds, options = {}, { onUploadProgress, onDownloadProgress } = {}) {
      try {
        const conditions = {
          term_id: termIds
        };
    
        const response = await api({
          method: 'GET',
          url: '/api/content/terms',
          params: {
            conditions: JSON.stringify(conditions),
            options: JSON.stringify(options),
          },
          onUploadProgress,
          onDownloadProgress,
        });
        return response.data;
      } catch (error) {
        console.error('Failed to fetch terms content:', error);
        throw error;
      }
    },
    
  }), [api]);

  return tableApi;
};

export default useTableApi;