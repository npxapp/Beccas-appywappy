import { useState, useEffect } from 'react';

// Custom hook for fetching dynamic page content
export const useDynamicPagesContent = (postType = 'post') => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/posts', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();

        if (data.status === 'OK') {
          // Filter and map posts by the provided type parameter
          const filteredContent = data.posts
            .filter(post => post.post_type === postType)
            .map(post => ({
              name: post.post_title || '',
              type: post.post_mime_type || '',
              slug: post.post_excerpt || '',
              text: post.post_content || '',
              post_status: post.post_status || '',
              webhook: post.post_content || '/',
              icon: post.post_name || '',
            }))
            .sort((a, b) => {
              const statusA = parseInt(a.status) || Infinity;
              const statusB = parseInt(b.status) || Infinity;
              return statusA - statusB;
            });

          setContent(filteredContent);
        }
      } catch (error) {
        console.error(`Error fetching ${postType} content: ${error.message}`);
        setContent([]);
      }
    };

    fetchContent();
  }, [postType]);

  return content;
};

// Component that uses the hook
const DynamicPagesContent = ({ postType = 'card' }) => {
  const content = useDynamicPagesContent(postType);
  return content; // Or return JSX if needed
};

export default DynamicPagesContent;