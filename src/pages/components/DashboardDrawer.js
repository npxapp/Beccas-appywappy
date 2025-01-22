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
  ListItemText,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
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
  
  const DrawerSection = ({ title, items = [], itemTitleKey }) => (
    <Accordion>
      <AccordionSummary 
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
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List dense>
          {items.map((item, index) => (
            <ListItem key={`${title}-${index}`} button>
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
              sx={{ justifyContent: 'flex-start' }}
            >
              View All {title}
            </Button>
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );

  const TreeChip = ({ label, color = "default" }) => (
    <Chip
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
      <DrawerSection title="Pages" items={previewData.pages} itemTitleKey="post_title" />
      <DrawerSection title="Posts" items={previewData.posts} itemTitleKey="post_title" />
      <DrawerSection title="Links" items={previewData.links} itemTitleKey="link_name" />
      <DrawerSection title="Options" items={previewData.options} itemTitleKey="option_name" />

      <Accordion>
        <AccordionSummary>
          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            Current Tables
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SimpleTreeView>
            <TreeItem itemId="pages" label={<TreeChip label="Pages" />}>
              <TreeItem onClick={handleTableAndSlide('posts', 3)} itemId="pages-all" label={<TreeChip label="All Pages" />} />
              <TreeItem onClick={handleTableAndSlide('posts', 4)} itemId="pages-new" label={<TreeChip label="New Page" />} />
            </TreeItem>

            <TreeItem itemId="links" label={<TreeChip label="Links" />}>
              <TreeItem onClick={handleTableAndSlide('links', 3)} itemId="links-all" label={<TreeChip label="All Links" />} />
              <TreeItem onClick={handleTableAndSlide('links', 4)} itemId="links-new" label={<TreeChip label="New Link" />} />
            </TreeItem>

            <TreeItem itemId="people" label={<TreeChip label="People" />}>
              <TreeItem onClick={handleTableAndSlide('people', 3)} itemId="people-all" label={<TreeChip label="All People" />} />
              <TreeItem itemId="people-person" label={<TreeChip label="Person" />}>
                <TreeItem onClick={handleTableAndSlide('people', 4)} itemId="people-person-add" label={<TreeChip label="Add" />} />
              </TreeItem>
            </TreeItem>

          </SimpleTreeView>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            Schemas
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SimpleTreeView>
            <TreeItem itemId="manage" label={<TreeChip label="Manage" />}>
              <TreeItem onClick={handleTableAndSlide('posts', 2)} itemId="manage-pages" label={<TreeChip label="Pages" />} />
              <TreeItem onClick={handleTableAndSlide('links', 2)} itemId="manage-links" label={<TreeChip label="Links" />} />
              <TreeItem onClick={handleTableAndSlide('people', 2)} itemId="manage-people" label={<TreeChip label="People" />} />
            </TreeItem>
            <TreeItem itemId="meta" label={<TreeChip label="Meta" />}>
              <TreeItem onClick={handleTableAndSlide('postmeta', 2)} itemId="meta-post" label={<TreeChip label="Posts" />} />
              <TreeItem onClick={handleTableAndSlide('commentmeta', 2)} itemId="meta-comment" label={<TreeChip label="Comments" />} />
              <TreeItem onClick={handleTableAndSlide('peoplemeta', 2)} itemId="meta-people" label={<TreeChip label="People" />} />
            </TreeItem>
          </SimpleTreeView>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            Content
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SimpleTreeView>
            <TreeItem itemId="actions" label={<TreeChip label="Actions" />}>
              <TreeItem itemId="actions-load-records" label={<TreeChip label="Load All Records" />} />
              <TreeItem onClick={handleTableAndSlide('posts', 3)} itemId="actions-load-pages" label={<TreeChip label="Load All Pages" />} />
              <TreeItem onClick={handleTableAndSlide('links', 3)} itemId="actions-load-links" label={<TreeChip label="Load All Links" />} />
              <TreeItem onClick={handleTableAndSlide('people', 3)} itemId="actions-load-people" label={<TreeChip label="Load All People" />} />
            </TreeItem>
          </SimpleTreeView>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            Create Content
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SimpleTreeView>
            <TreeItem itemId="create-pages" label={<TreeChip label="Pages" />}>
              <TreeItem onClick={handleTableAndSlide('posts', 4)} itemId="pages-create" label={<TreeChip label="Create" />} />
              <TreeItem onClick={handleTableAndSlide('posts', 3)} itemId="pages-read" label={<TreeChip label="Read" />} />
            </TreeItem>
            <TreeItem itemId="create-links" label={<TreeChip label="Links" />}>
              <TreeItem onClick={handleTableAndSlide('links', 4)} itemId="links-create" label={<TreeChip label="Create" />} />
              <TreeItem onClick={handleTableAndSlide('links', 3)} itemId="links-read" label={<TreeChip label="Read" />} />
            </TreeItem>
            <TreeItem itemId="create-people" label={<TreeChip label="People" />}>
              <TreeItem onClick={handleTableAndSlide('people', 4)} itemId="people-create" label={<TreeChip label="Create" />} />
              <TreeItem onClick={handleTableAndSlide('people', 3)} itemId="people-read" label={<TreeChip label="Read" />} />
            </TreeItem>
          </SimpleTreeView>
        </AccordionDetails>
      </Accordion>
    </Drawer>
  );
};

export default DashboardDrawer;