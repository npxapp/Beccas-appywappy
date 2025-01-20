import { useState, useEffect } from 'react';

// Custom hook to fetch navigation links
export const useNavigationLinks = (assetType = 'mobile') => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(`/api/links/${assetType}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.status === 'OK') {
          // Filter and map the links data based on the new structure
          const filteredLinks = data.links
            .map(link => ({
              path: link.link_url || '/',
              label: link.link_description || 'Untitled Link',
              summary: link.link_name || 'Overview',
              status: link.link_id || 'Status',
            }))
            .sort((a, b) => {
              const statusA = parseInt(a.status) || Infinity;
              const statusB = parseInt(b.status) || Infinity;
              return statusA - statusB;
            });

          setLinks(filteredLinks);
        }
      } catch (error) {
        console.error(`Error fetching ${assetType} links: ${error.message}`);
        setLinks([]);
      }
    };

    fetchLinks();
  }, [assetType]);

  return links;
};

// Component for dynamic navigation links
const DynamicNavigationLinks = ({ type = 'mobile' }) => {
  const links = useNavigationLinks(type);

  return links;

};

export default DynamicNavigationLinks;