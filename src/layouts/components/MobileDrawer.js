import React from 'react';
import { Drawer, Box } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useDashboardDrawer } from '../../contexts/DashboardDrawerContext';
import { useNavigate } from 'react-router-dom';
import { useNavigationLinks } from './Utils/DynamicMobileDrawerLinks';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '@mui/material/styles';

const MobileDrawer = ({ open, toggleDrawer }) => {
  const { toggleDashboardDrawer } = useDashboardDrawer();
  const navigate = useNavigate();
  const links = useNavigationLinks();
  const theme = useTheme();

  const summaryLinksMap = React.useMemo(
    () =>
      links.reduce((acc, link) => {
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
          <TreeItem itemId="1" label="Overview">
            <TreeItem itemId="1-1" label="Overview" />
            <TreeItem itemId="1-2" label="Startersoft.io integrations" />
            <TreeItem itemId="1-3" label={<>Github projects we source <GitHubIcon /></>} />
          </TreeItem>
          <TreeItem itemId="2" label="Integrations">
            <TreeItem itemId="2-1" label="Dashboard Panel" />
            <TreeItem itemId="2-2" label="Startersoft.io Premium middleware" />
          </TreeItem>
          <TreeItem itemId="3" label="Control access">
            <TreeItem itemId="3-1" label="Slide open control panel" />
          </TreeItem>
        </SimpleTreeView>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;