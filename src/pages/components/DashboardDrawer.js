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
import DatabaseIcon from '@mui/icons-material/Storage';
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

const DashboardDrawer = ({ open, onClose, previewData }) => {
  const DrawerSection = ({ title, items = [], itemTitleKey, icon: SectionIcon }) => (
    <Accordion defaultExpanded>
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
          bgcolor: 'black'
        }
      }}
    >
      <Typography variant="h6" sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <DatabaseIcon color="primary" />
        Database Preview
      </Typography>

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
              <TreeItem itemId="pages-all" label={<TreeChip label="All Pages" icon={PageIcon} />} />
              <TreeItem itemId="pages-new" label={<TreeChip label="New Page" icon={CreateIcon} />} />
              <TreeItem itemId="pages-remove" label={<TreeChip label="Remove Page" icon={DeleteIcon} />} />
              <TreeItem itemId="pages-options" label={<TreeChip label="Options" icon={SettingsIcon} />}>
                <TreeItem itemId="pages-options-all" label={<TreeChip label="All Pages" icon={PageIcon} />} />
                <TreeItem itemId="pages-options-slugs" label={<TreeChip label="All Slugs" icon={LinkIcon} />} />
                <TreeItem itemId="pages-options-defaults" label={<TreeChip label="Defaults" icon={SettingsIcon} />} />
              </TreeItem>
            </TreeItem>

            <TreeItem itemId="links" label={<TreeChip label="Links" icon={LinkIcon} />}>
              <TreeItem itemId="links-all" label={<TreeChip label="All Links" icon={LinkIcon} />} />
              <TreeItem itemId="links-new" label={<TreeChip label="New Link" icon={CreateIcon} />} />
              <TreeItem itemId="links-remove" label={<TreeChip label="Remove Link" icon={DeleteIcon} />} />
              <TreeItem itemId="links-settings" label={<TreeChip label="Settings" icon={SettingsApplicationsIcon} />}>
                <TreeItem itemId="links-settings-defaults" label={<TreeChip label="Defaults" icon={SettingsIcon} />} />
                <TreeItem itemId="links-settings-current" label={<TreeChip label="Current" icon={StorageIcon} />} />
                <TreeItem itemId="links-settings-reset" label={<TreeChip label="Reset" icon={UpdateIcon} />} />
              </TreeItem>
            </TreeItem>

            <TreeItem itemId="people" label={<TreeChip label="People" icon={PersonIcon} />}>
              <TreeItem itemId="people-all" label={<TreeChip label="All People" icon={PersonIcon} />} />
              <TreeItem itemId="people-person" label={<TreeChip label="Person" icon={PersonIcon} />}>
                <TreeItem itemId="people-person-add" label={<TreeChip label="Add" icon={CreateIcon} />} />
                <TreeItem itemId="people-person-about" label={<TreeChip label="About" icon={PreviewIcon} />} />
                <TreeItem itemId="people-person-update" label={<TreeChip label="Update" icon={EditIcon} />} />
                <TreeItem itemId="people-person-remove" label={<TreeChip label="Remove" icon={DeleteIcon} />} />
              </TreeItem>
            </TreeItem>

            <TreeItem itemId="apis" label={<TreeChip label="APIs" icon={ApiIcon} />}>
              <TreeItem itemId="apis-integrations" label={<TreeChip label="Integrations" icon={CloudSyncIcon} />} />
              <TreeItem itemId="apis-components" label={<TreeChip label="Components" icon={StorageIcon} />} />
              <TreeItem itemId="apis-settings" label={<TreeChip label="Settings" icon={SettingsApplicationsIcon} />}>
                <TreeItem itemId="apis-settings-options" label={<TreeChip label="Options" icon={SettingsIcon} />} />
                <TreeItem itemId="apis-settings-defaults" label={<TreeChip label="Defaults" icon={SettingsIcon} />} />
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
              <TreeItem itemId="manage-pages" label={<TreeChip label="Pages" icon={PageIcon} />} />
              <TreeItem itemId="manage-links" label={<TreeChip label="Links" icon={LinkIcon} />} />
              <TreeItem itemId="manage-people" label={<TreeChip label="People" icon={PersonIcon} />} />
            </TreeItem>
            <TreeItem itemId="meta" label={<TreeChip label="Meta" icon={StorageIcon} />}>
              <TreeItem itemId="meta-options" label={<TreeChip label="Options" icon={SettingsIcon} />} />
              <TreeItem itemId="meta-associations" label={<TreeChip label="Associations" icon={StorageIcon} />} />
              <TreeItem itemId="meta-apis" label={<TreeChip label="APIs" icon={ApiIcon} />} />
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
              <TreeItem itemId="actions-load-pages" label={<TreeChip label="Load All Pages" icon={PageIcon} />} />
              <TreeItem itemId="actions-load-links" label={<TreeChip label="Load All Links" icon={LinkIcon} />} />
              <TreeItem itemId="actions-load-people" label={<TreeChip label="Load All People" icon={PersonIcon} />} />
              <TreeItem itemId="actions-load-apis" label={<TreeChip label="Load All APIs" icon={ApiIcon} />} />
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
              <TreeItem itemId="pages-create" label={<TreeChip label="Create" icon={CreateIcon} />} />
              <TreeItem itemId="pages-read" label={<TreeChip label="Read" icon={PreviewIcon} />} />
              <TreeItem itemId="pages-update" label={<TreeChip label="Update" icon={EditIcon} />} />
              <TreeItem itemId="pages-delete" label={<TreeChip label="Delete" icon={DeleteIcon} />} />
            </TreeItem>
            <TreeItem itemId="create-links" label={<TreeChip label="Links" icon={LinkIcon} />}>
              <TreeItem itemId="links-create" label={<TreeChip label="Create" icon={CreateIcon} />} />
              <TreeItem itemId="links-read" label={<TreeChip label="Read" icon={PreviewIcon} />} />
              <TreeItem itemId="links-update" label={<TreeChip label="Update" icon={EditIcon} />} />
              <TreeItem itemId="links-delete" label={<TreeChip label="Delete" icon={DeleteIcon} />} />
            </TreeItem>
            <TreeItem itemId="create-people" label={<TreeChip label="People" icon={PersonIcon} />}>
              <TreeItem itemId="people-create" label={<TreeChip label="Create" icon={CreateIcon} />} />
              <TreeItem itemId="people-read" label={<TreeChip label="Read" icon={PreviewIcon} />} />
              <TreeItem itemId="people-update" label={<TreeChip label="Update" icon={EditIcon} />} />
              <TreeItem itemId="people-delete" label={<TreeChip label="Delete" icon={DeleteIcon} />} />
            </TreeItem>
            <TreeItem itemId="create-apis" label={<TreeChip label="APIs" icon={ApiIcon} />}>
              <TreeItem itemId="apis-create" label={<TreeChip label="Create" icon={CreateIcon} />} />
              <TreeItem itemId="apis-read" label={<TreeChip label="Read" icon={PreviewIcon} />} />
              <TreeItem itemId="apis-update" label={<TreeChip label="Update" icon={EditIcon} />} />
              <TreeItem itemId="apis-delete" label={<TreeChip label="Delete" icon={DeleteIcon} />} />
            </TreeItem>
          </SimpleTreeView>
        </AccordionDetails>
      </Accordion>
    </Drawer>
  );
};

export default DashboardDrawer;