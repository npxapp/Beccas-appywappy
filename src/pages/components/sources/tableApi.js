// ./src/pages/components/sources/tableApi.js
import { useAuth } from '../../../contexts/AuthContext';

const useTableApi = () => {
  const { api } = useAuth();

  const tableApi = {
    async getTables() {
      try {
        const response = await api.get('/api/structure/tables');
        return response.data;
      } catch (error) {
        console.error('Failed to fetch tables:', error);
        throw error;
      }
    },

    async getTableStructure(tableName) {
      try {
        const response = await api.get(`/api/structure/${tableName}`);
        return response.data;
      } catch (error) {
        console.error(`Failed to fetch table structure for ${tableName}:`, error);
        throw error;
      }
    },

    async getTableContent(tableName) {
      try {
        const response = await api.get(`/api/content/${tableName}`);
        return response.data;
      } catch (error) {
        console.error(`Failed to fetch table content for ${tableName}:`, error);
        throw error;
      }
    },

    async createTable(tableName, columns = []) {
      try {
        const response = await api({
          method: 'POST',
          url: `/api/structure/${tableName}`,
          data: { columns }
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to create table ${tableName}:`, error);
        throw error;
      }
    },

    async deleteTable(tableName) {
      try {
        const response = await api({
          method: 'DELETE',
          url: `/api/structure/${tableName}`
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to delete table ${tableName}:`, error);
        throw error;
      }
    },

    async updateTable(tableName, updatedColumn) {
      try {
        const response = await api({
          method: 'PUT',
          url: `/api/structure/${tableName}/columns/${updatedColumn.name}`,
          data: updatedColumn
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to update column ${updatedColumn.name} in table ${tableName}:`, error);
        throw error;
      }
    },

async updateFieldValue(tableName, rowId, columnName, updatedValue, rowIdColumnName) {
  try {
    // Conditionally add rowIdColumnName if it's provided, otherwise leave the URL as is
    const url = rowIdColumnName 
      ? `/api/content/${tableName}/${rowId}/field/${columnName}/${rowIdColumnName}`
      : `/api/content/${tableName}/${rowId}/field/${columnName}`;

    const response = await api({
      method: 'PUT',
      url: url,
      data: { value: updatedValue }
    });

    return response.data;
  } catch (error) {
    console.error(
      `Failed to update field ${columnName} in row ${rowId} for table ${tableName}:`,
      error
    );
    throw error;
  }
},
    
    async createTableContent(tableName, data) {
      try {
        const response = await api.post(`/api/content/${tableName}`, data);
        return response.data;
      } catch (error) {
        console.error(`Failed to create content for ${tableName}:`, error);
        throw error;
      }
    },

    async addColumn(tableName, columnName, columnType) {
      try {
        const response = await api({
          method: 'POST',
          url: `/api/structure/${tableName}/columns`,
          data: { columnName, columnType }
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to add column ${columnName} to table ${tableName}:`, error);
        throw error;
      }
    },

    async dropColumn(tableName, columnName) {
      try {
        const response = await api({
          method: 'DELETE',
          url: `/api/structure/${tableName}/columns/${columnName}`
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to drop column ${columnName} from table ${tableName}:`, error);
        throw error;
      }
    },

    async getPreviewData() {
      try {
        const [pages, posts, links, options] = await Promise.all([
          api.get('/api/preview/pages').then((res) => res.data),
          api.get('/api/preview/posts').then((res) => res.data),
          api.get('/api/preview/links').then((res) => res.data),
          api.get('/api/preview/options').then((res) => res.data),
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
  };

  return tableApi;
};

export default useTableApi;