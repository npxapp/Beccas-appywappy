// pages/Teams/IndexTeamsPage.jsx
import { CreateTeam, DeleteTeam } from "api/mutations";
import { Teams } from "api/queries";
import confirmAlert from "libs/confirmAlert";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { useAuth } from 'contexts/AuthContext'; // Add this import
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupIcon from '@mui/icons-material/Group';
import QrCodeIcon from '@mui/icons-material/QrCode';
import SettingsIcon from '@mui/icons-material/Settings';
import WarningIcon from '@mui/icons-material/Warning';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

export default function IndexTeamsPage() {
  const { user } = useAuth(); // Add this hook
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [newTeam, setNewTeam] = useState({ code: null, name: null });
  const [createTeamModal, setCreateTeamModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const queryClient = useQueryClient();
  const { data: teams } = useQuery(["Teams", user.accountId], Teams);

  const createTeamMutate = useMutation(CreateTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Teams", user.accountId]);
    },
  });

  const createTeam = async () => {
    try {
      const response = await createTeamMutate.mutateAsync(newTeam);
      if (response) {
        confirmAlert.success("team created");
      }
    } catch (error) {
      if (error.response?.data) {
        confirmAlert.error(error.response.data);
      }
    }
  };

  const deleteTeamMutate = useMutation(DeleteTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Teams", user.accountId]);
    },
  });

  const deleteTeam = async (id) => {
    try {
      const response = await deleteTeamMutate.mutateAsync(id);
      if (response) {
        confirmAlert.success("team deleted");
      }
    } catch (error) {
      if (error.response?.data) {
        confirmAlert.error(error.response.data);
      }
    }
  };

  const handleCreateTeamSubmit = (e) => {
    e.preventDefault();
    createTeam();
    setCreateTeamModal(false);
    setNewTeam({ name: null, code: null });
  };

  const renderCreateTeamDialog = () => (
    <Dialog 
      open={createTeamModal} 
      onClose={() => setCreateTeamModal(false)}
    >
      <form onSubmit={handleCreateTeamSubmit}>
        <DialogTitle>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <GroupsIcon color="primary" />
            </Grid>
            <Grid item>
              {t("teamsPage.createTeam")}
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <DriveFileRenameOutlineIcon color="action" />
                  </Grid>
                  <Grid item>
                    {t("teamsPage.name")}
                  </Grid>
                </Grid>
              </Typography>
              <TextField
                required
                fullWidth
                value={newTeam.name || ''}
                onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <Typography>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <QrCodeIcon color="action" />
                  </Grid>
                  <Grid item>
                    {t("teamsPage.code")}
                  </Grid>
                </Grid>
              </Typography>
              <TextField
                required
                fullWidth
                value={newTeam.code || ''}
                onChange={(e) => setNewTeam({ ...newTeam, code: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <QrCodeIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setCreateTeamModal(false);
              setNewTeam({ name: null, code: null });
            }}
            color="error"
          >
            {t("teamsPage.cancel")}
          </Button>
          <Button 
            type="submit"
            color="primary"
          >
            {t("teamsPage.create")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );

  const renderDeleteDialog = () => (
    <Dialog 
      open={deleteModal} 
      onClose={() => setDeleteModal(false)}
    >
      <DialogTitle>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <WarningIcon color="error" />
          </Grid>
          <Grid item>
            {t("teamsPage.deleteTeam")}?
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogActions>
        <Button 
          onClick={() => setDeleteModal(false)}
          color="primary"
        >
          {t("teamsPage.no")}
        </Button>
        <Button
          onClick={() => {
            setDeleteModal(false);
            deleteTeam(selectedTeamId);
          }}
          color="error"
        >
          {t("teamsPage.yes")}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderMobileRow = (element, i) => (
    <TableRow key={`team-${i}`}>
      <TableCell>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <DriveFileRenameOutlineIcon color="action" sx={{ fontSize: 20 }} />
                </Grid>
                <Grid item>
                  {t("teamsPage.name")}: {element.name}
                </Grid>
              </Grid>
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <GroupIcon color="action" sx={{ fontSize: 20 }} />
                </Grid>
                <Grid item>
                  {t("teamsPage.users")}: {element.users.length}
                </Grid>
              </Grid>
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <QrCodeIcon color="action" sx={{ fontSize: 20 }} />
                </Grid>
                <Grid item>
                  {t("teamsPage.code")}: {element.code}
                </Grid>
              </Grid>
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <SettingsIcon color="action" sx={{ fontSize: 20 }} />
                </Grid>
                <Grid item>
                  {t("teamsPage.actions")}:
                </Grid>
              </Grid>
            </Typography>
            <Box display="flex" gap={1} mt={1}>
              <Button
                component={Link}
                to={`/teams/${element.id}`}
                variant="outlined"
              >
                {t("teamsPage.edit")}
              </Button>
              <Button
                onClick={() => {
                  setDeleteModal(true);
                  setSelectedTeamId(element.id);
                }}
                variant="outlined"
                color="error"
              >
                {t("teamsPage.delete")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );


  const renderDesktopRow = (element, i) => (
    <TableRow key={`team-${i}`}>
      <TableCell>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <DriveFileRenameOutlineIcon color="action" sx={{ fontSize: 20 }} />
          </Grid>
          <Grid item>{element.name}</Grid>
        </Grid>
      </TableCell>
      <TableCell>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <GroupIcon color="action" sx={{ fontSize: 20 }} />
          </Grid>
          <Grid item>{element.users.length}</Grid>
        </Grid>
      </TableCell>
      <TableCell>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <QrCodeIcon color="action" sx={{ fontSize: 20 }} />
          </Grid>
          <Grid item>{element.code}</Grid>
        </Grid>
      </TableCell>
      <TableCell>
        <Box display="flex" gap={1}>
          <Button
            component={Link}
            to={`/teams/${element.id}`}
            variant="outlined"
          >
            {t("teamsPage.edit")}
          </Button>
          <Button
            onClick={() => {
              setDeleteModal(true);
              setSelectedTeamId(element.id);
            }}
            variant="outlined"
            color="error"
          >
            {t("teamsPage.delete")}
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
  
  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <GroupsIcon color="primary" sx={{ fontSize: 32 }} />
        Teams
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Box mb={2}>
          <Button
            onClick={() => setCreateTeamModal(true)}
            variant="contained"
          >
            {t("teamsPage.createTeam")}
          </Button>
        </Box>

        <TableContainer>
          <Table>
            {!isMobile && (
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <DriveFileRenameOutlineIcon color="action" sx={{ fontSize: 20 }} />
                      </Grid>
                      <Grid item>{t("teamsPage.name")}</Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <GroupIcon color="action" sx={{ fontSize: 20 }} />
                      </Grid>
                      <Grid item>{t("teamsPage.users")}</Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <QrCodeIcon color="action" sx={{ fontSize: 20 }} />
                      </Grid>
                      <Grid item>{t("teamsPage.code")}</Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <SettingsIcon color="action" sx={{ fontSize: 20 }} />
                      </Grid>
                      <Grid item>{t("teamsPage.actions")}</Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {teams?.data.map((element, i) => (
                isMobile ? 
                  renderMobileRow(element, i) : 
                  renderDesktopRow(element, i)
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {renderCreateTeamDialog()}
      {renderDeleteDialog()}
    </Container>
  );
}