import { useState, useEffect } from 'react';

// Custom hook for fetching dynamic page content
export const useDynamicPagesContent = (assetType = 'card') => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/npx/registry/read', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();

        if (data.status === 'OK') {
          // Filter and map assets by the provided type parameter
          const filteredContent = data.assets
            .filter(asset => asset.type === assetType)
            .map(asset => ({
              name: asset.name || '',
              type: asset.type || '',
              slug: asset.slug || '',
              text: asset.text || '',
              asset_status: asset.asset_status || '',
              webhook: asset.webhook || '/'
            }))
            .sort((a, b) => {
              const statusA = parseInt(a.status) || Infinity;
              const statusB = parseInt(b.status) || Infinity;
              return statusA - statusB;
            });

          setContent(filteredContent);
        }
      } catch (error) {
        console.error(`Error fetching ${assetType} content: ${error.message}`);
        setContent([]);
      }
    };

    fetchContent();
  }, [assetType]);

  return content;
};

// Component that uses the hook
const DynamicPagesContent = ({ assetType = 'card' }) => {
  const content = useDynamicPagesContent(assetType);
  return content; // Or return JSX if needed
};

export default DynamicPagesContent;

