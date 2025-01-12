// ./src/pages/components/DashboardDrawer.js
import React from 'react';
import {
  Drawer,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PageIcon from '@mui/icons-material/Article';
import PostIcon from '@mui/icons-material/Description';
import LinkIcon from '@mui/icons-material/Link';
import SettingsIcon from '@mui/icons-material/Settings';
import PreviewIcon from '@mui/icons-material/Visibility';
import TableChartIcon from '@mui/icons-material/TableChart';
import SchemaIcon from '@mui/icons-material/Schema';
import ContentIcon from '@mui/icons-material/Inbox';
import CreateIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import ApiIcon from '@mui/icons-material/Api';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import StorageIcon from '@mui/icons-material/Storage';
import UpdateIcon from '@mui/icons-material/Update';
import { useCms } from '../../contexts/CmsContext';
import { useSlide } from '../../contexts/SlideContext';

const DashboardDrawer = ({ open, onClose, previewData }) => {
  const {
    setSelectedTable,
  } = useCms();
  const { 
    activeSlide, 
    setActiveSlide, 
    setPreviousSlide 
  } = useSlide();
  const handleSlideChange = (slideNumber) => () => {
    setPreviousSlide(activeSlide);
    setActiveSlide(slideNumber);
  };
  
  const handleTableAndSlide = (tableName, slideNumber) => () => {
    setSelectedTable(tableName);
    handleSlideChange(slideNumber)();
  };
  
  const DrawerSection = ({ title, items = [], itemTitleKey, icon: SectionIcon }) => (
    <Accordion>
      <AccordionSummary 
        expandIcon={<ExpandMoreIcon />}
        sx={{
          '&.MuiAccordionSummary-root': {
            minHeight: 48,
            '& .MuiAccordionSummary-content': {
              margin: '12px 0'
            }
          }
        }}
      >
        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SectionIcon color="primary" />
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List dense>
          {items.map((item, index) => (
            <ListItem key={`${title}-${index}`} button>
              <ListItemIcon>
                <PreviewIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary={item[itemTitleKey]} 
                primaryTypographyProps={{ noWrap: true }} 
              />
            </ListItem>
          ))}
          <Divider sx={{ my: 1 }} />
          <ListItem>
            <Button 
              fullWidth 
              variant="text" 
              startIcon={<PreviewIcon />}
              sx={{ justifyContent: 'flex-start' }}
            >
              View All {title}
            </Button>
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );

  const TreeChip = ({ label, icon: Icon, color = "default" }) => (
    <Chip
      icon={<Icon sx={{ fontSize: 20 }} />}
      label={label}
      size="small"
      color={color}
      sx={{ my: 0.5, mx: 0.5 }}
    />
  );

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: 320,
        '& .MuiDrawer-paper': {
          width: 320,
          boxSizing: 'border-box',
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'black',
          borderRadius: 0,
        }
      }}
    >
      <DrawerSection title="Pages" items={previewData.pages} itemTitleKey="post_title" icon={PageIcon} />
      <DrawerSection title="Posts" items={previewData.posts} itemTitleKey="post_title" icon={PostIcon} />
      <DrawerSection title="Links" items={previewData.links} itemTitleKey="link_name" icon={LinkIcon} />
      <DrawerSection title="Options" items={previewData.options} itemTitleKey="option_name" icon={SettingsIcon} />

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TableChartIcon color="primary" />
            Current Tables
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SimpleTreeView
            defaultExpandIcon={<ChevronRightIcon />}
            defaultCollapseIcon={<ExpandMoreIcon />}
          >
            <TreeItem itemId="pages" label={<TreeChip label="Pages" icon={PageIcon} />}>
              <TreeItem onClick={handleTableAndSlide('posts', 3)} itemId="pages-all" label={<TreeChip label="All Pages" icon={PageIcon} />} />
              <TreeItem onClick={handleTableAndSlide('posts', 4)} itemId="pages-new" label={<TreeChip label="New Page" icon={CreateIcon} />} />
            </TreeItem>

            <TreeItem itemId="links" label={<TreeChip label="Links" icon={LinkIcon} />}>
              <TreeItem onClick={handleTableAndSlide('links', 3)} itemId="links-all" label={<TreeChip label="All Links" icon={LinkIcon} />} />
              <TreeItem onClick={handleTableAndSlide('links', 4)} itemId="links-new" label={<TreeChip label="New Link" icon={CreateIcon} />} />
            </TreeItem>

            <TreeItem itemId="people" label={<TreeChip label="People" icon={PersonIcon} />}>
              <TreeItem onClick={handleTableAndSlide('people', 3)} itemId="people-all" label={<TreeChip label="All People" icon={PersonIcon} />} />
              <TreeItem itemId="people-person" label={<TreeChip label="Person" icon={PersonIcon} />}>
                <TreeItem onClick={handleTableAndSlide('people', 4)} itemId="people-person-add" label={<TreeChip label="Add" icon={CreateIcon} />} />
              </TreeItem>
            </TreeItem>

          </SimpleTreeView>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SchemaIcon color="primary" />
            Schemas
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SimpleTreeView
            defaultExpandIcon={<ChevronRightIcon />}
            defaultCollapseIcon={<ExpandMoreIcon />}
          >
            <TreeItem itemId="manage" label={<TreeChip label="Manage" icon={ManageAccountsIcon} />}>
              <TreeItem onClick={handleTableAndSlide('posts', 2)} itemId="manage-pages" label={<TreeChip label="Pages" icon={PageIcon} />} />
              <TreeItem onClick={handleTableAndSlide('links', 2)} itemId="manage-links" label={<TreeChip label="Links" icon={LinkIcon} />} />
              <TreeItem onClick={handleTableAndSlide('people', 2)} itemId="manage-people" label={<TreeChip label="People" icon={PersonIcon} />} />
            </TreeItem>
            <TreeItem itemId="meta" label={<TreeChip label="Meta" icon={StorageIcon} />}>
              <TreeItem onClick={handleTableAndSlide('postmeta', 2)} itemId="meta-post" label={<TreeChip label="Posts" icon={PageIcon} />} />
              <TreeItem onClick={handleTableAndSlide('commentmeta', 2)} itemId="meta-comment" label={<TreeChip label="Comments" icon={ApiIcon} />} />
              <TreeItem onClick={handleTableAndSlide('peoplemeta', 2)} itemId="meta-people" label={<TreeChip label="People" icon={PersonIcon} />} />
            </TreeItem>
          </SimpleTreeView>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ContentIcon color="primary" />
            Content
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SimpleTreeView
            defaultExpandIcon={<ChevronRightIcon />}
            defaultCollapseIcon={<ExpandMoreIcon />}
          >
            <TreeItem itemId="actions" label={<TreeChip label="Actions" icon={SettingsApplicationsIcon} />}>
              <TreeItem itemId="actions-load-records" label={<TreeChip label="Load All Records" icon={StorageIcon} />} />
              <TreeItem onClick={handleTableAndSlide('posts', 3)} itemId="actions-load-pages" label={<TreeChip label="Load All Pages" icon={PageIcon} />} />
              <TreeItem onClick={handleTableAndSlide('links', 3)} itemId="actions-load-links" label={<TreeChip label="Load All Links" icon={LinkIcon} />} />
              <TreeItem onClick={handleTableAndSlide('people', 3)} itemId="actions-load-people" label={<TreeChip label="Load All People" icon={PersonIcon} />} />
            </TreeItem>
          </SimpleTreeView>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CreateIcon color="primary" />
            Create Content
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SimpleTreeView
            defaultExpandIcon={<ChevronRightIcon />}
            defaultCollapseIcon={<ExpandMoreIcon />}
          >
            <TreeItem itemId="create-pages" label={<TreeChip label="Pages" icon={PageIcon} />}>
              <TreeItem onClick={handleTableAndSlide('posts', 4)} itemId="pages-create" label={<TreeChip label="Create" icon={CreateIcon} />} />
              <TreeItem onClick={handleTableAndSlide('posts', 3)} itemId="pages-read" label={<TreeChip label="Read" icon={PreviewIcon} />} />
            </TreeItem>
            <TreeItem itemId="create-links" label={<TreeChip label="Links" icon={LinkIcon} />}>
              <TreeItem onClick={handleTableAndSlide('links', 4)} itemId="links-create" label={<TreeChip label="Create" icon={CreateIcon} />} />
              <TreeItem onClick={handleTableAndSlide('links', 3)} itemId="links-read" label={<TreeChip label="Read" icon={PreviewIcon} />} />
            </TreeItem>
            <TreeItem itemId="create-people" label={<TreeChip label="People" icon={PersonIcon} />}>
              <TreeItem onClick={handleTableAndSlide('people', 4)} itemId="people-create" label={<TreeChip label="Create" icon={CreateIcon} />} />
              <TreeItem onClick={handleTableAndSlide('people', 3)} itemId="people-read" label={<TreeChip label="Read" icon={PreviewIcon} />} />
            </TreeItem>
          </SimpleTreeView>
        </AccordionDetails>
      </Accordion>
    </Drawer>
  );
};

export default DashboardDrawer;