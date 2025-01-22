// ./src/layouts/components/MobileDrawer.js
import React from 'react';
import { Drawer, Box } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useDashboardDrawer } from '../../contexts/DashboardDrawerContext';
import { useNavigate } from 'react-router-dom';
import { useNavigationLinks } from './Utils/DynamicMobileDrawerLinks';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '@mui/material/styles';

// Icon mapping constant
const ICON_MAPPING = {
  'GitHubIcon': GitHubIcon
};

const MobileDrawer = ({ open, toggleDrawer }) => {
  const { toggleDashboardDrawer } = useDashboardDrawer();
  const navigate = useNavigate();
  const links = useNavigationLinks();
  const theme = useTheme();
  
    const summaryLinksMap = React.useMemo(
      () =>
        links
          .sort((a, b) => a.rating - b.rating) // Sort links by rating in ascending order
          .reduce((acc, link) => {
            if (!acc[link.summary]) acc[link.summary] = [];
            acc[link.summary].push(link);
            return acc;
          }, {}),
      [links]
    );

  const navigatePage = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navigateOpen = (path) => {
    if (path === 'toggleDashboardDrawer') {
      toggleDashboardDrawer(true);
    } else {
      navigate(path);
      toggleDrawer();
    }
  };

  const navigationMap = React.useMemo(() => {
    const map = {};
    Object.entries(summaryLinksMap).forEach(([summary, summaryLinks], summaryIndex) => {
      summaryLinks.forEach((link, linkIndex) => {
        const itemId = `${summaryIndex + 1}-${linkIndex + 1}`;
        map[itemId] = link.path;
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

  const renderTreeItemLabel = (link) => {
    if (link.image && ICON_MAPPING[link.image]) {
      const Icon = ICON_MAPPING[link.image];
      return (
        <>
          {link.label} <Icon />
        </>
      );
    }
    return link.label;
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => toggleDrawer(false)}
      PaperProps={{
        sx: {
          zIndex: 1400,
          height: '100vh',
          width: '100vw',
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
          {Object.entries(summaryLinksMap).map(([summary, summaryLinks], summaryIndex) => {
            const panelId = (summaryIndex + 1).toString();
            return (
              <TreeItem key={summary} itemId={panelId} label={summary}>
                {summaryLinks.map((link, linkIndex) => {
                  const itemId = `${panelId}-${linkIndex + 1}`;
                  return (
                    <TreeItem
                      key={itemId}
                      itemId={itemId}
                      label={renderTreeItemLabel(link)}
                    />
                  );
                })}
              </TreeItem>
            );
          })}
        </SimpleTreeView>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;