import React from 'react';
import { Drawer as MUIDrawer, Box } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useNavigate } from 'react-router-dom';
import { useNavigationLinks } from './Utils/DynamicMobileDrawerLinks';
import { useTheme } from '@mui/material/styles';

const DashboardDrawer = ({ open, toggleDashboardDrawer }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const navigatePage = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navigateOpen = (path) => {
    if (path === 'toggleDashboardDrawer') {
      toggleDashboardDrawer();
    } else {
      navigate(path);
      toggleDashboardDrawer();
    }
  };

  const links = useNavigationLinks('dashboard');

  const summaryLinksMap = React.useMemo(
    () =>
      links.reduce((acc, link) => {
        if (!acc[link.summary]) acc[link.summary] = [];
        acc[link.summary].push(link);
        return acc;
      }, {}),
    [links]
  );

  const navigationMap = React.useMemo(() => {
    const map = {};
    Object.entries(summaryLinksMap).forEach(([summary, summaryLinks], summaryIndex) => {
      summaryLinks.forEach((link, linkIndex) => {
        const itemId = `${summaryIndex + 1}-${linkIndex + 1}`;
        if (link.label === 'Github projects we source') {
          map[itemId] = 'https://github.com/npxapp/npx-app';
        } else {
          map[itemId] = link.path;
        }
      });
    });
    return map;
  }, [summaryLinksMap]);

  const handleSelect = (event, itemId) => {
    const pathOrUrl = navigationMap[itemId];
    if (pathOrUrl) {
      if (pathOrUrl.startsWith('http')) {
        navigatePage(pathOrUrl);
      } else {
        navigateOpen(pathOrUrl);
      }
    } else {
      console.warn(`No navigation path defined for itemId: ${itemId}`);
    }
  };

  return (
    <MUIDrawer
      anchor="right"
      open={open}
      onClose={() => toggleDashboardDrawer(false)}
      PaperProps={{
        sx: {
          zIndex: 1400,
          height: '100vh',
          width: '70vw',
          borderRadius: 0,
          background: theme.palette.background.default,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'initial',
          transition: 'transform 1s ease',
        }}
      >
        <SimpleTreeView onItemClick={handleSelect}>
          <TreeItem itemId="1" label="Admin">
            <TreeItem itemId="1-1" label="Control panel access" />
          </TreeItem>
        </SimpleTreeView>
      </Box>
    </MUIDrawer>
  );
};

export default DashboardDrawer;