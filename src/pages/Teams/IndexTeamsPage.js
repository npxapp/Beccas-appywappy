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
  useMediaQuery
} from '@mui/material';

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
          {t("teamsPage.createTeam")}
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography>
                {t("teamsPage.name")}
              </Typography>
              <TextField
                required
                fullWidth
                value={newTeam.name || ''}
                onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
              />
            </Grid>
            <Grid item>
              <Typography>
                {t("teamsPage.code")}
              </Typography>
              <TextField
                required
                fullWidth
                value={newTeam.code || ''}
                onChange={(e) => setNewTeam({ ...newTeam, code: e.target.value })}
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
          >
            {t("teamsPage.cancel")}
          </Button>
          <Button type="submit">
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
        {t("teamsPage.deleteTeam")}?
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => setDeleteModal(false)}>
          {t("teamsPage.no")}
        </Button>
        <Button
          onClick={() => {
            setDeleteModal(false);
            deleteTeam(selectedTeamId);
          }}
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
            <Typography>{t("teamsPage.name")}: {element.name}</Typography>
          </Grid>
          <Grid item>
            <Typography>{t("teamsPage.users")}: {element.users.length}</Typography>
          </Grid>
          <Grid item>
            <Typography>{t("teamsPage.code")}: {element.code}</Typography>
          </Grid>
          <Grid item>
            <Typography>{t("teamsPage.actions")}:</Typography>
            <Box display="flex">
              <Button
                component={Link}
                to={`/teams/${element.id}`}
              >
                {t("teamsPage.edit")}
              </Button>
              <Button
                onClick={() => {
                  setDeleteModal(true);
                  setSelectedTeamId(element.id);
                }}
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
      <TableCell>{element.name}</TableCell>
      <TableCell>{element.users.length}</TableCell>
      <TableCell>{element.code}</TableCell>
      <TableCell>
        <Box display="flex">
          <Button
            component={Link}
            to={`/teams/${element.id}`}
          >
            {t("teamsPage.edit")}
          </Button>
          <Button
            onClick={() => {
              setDeleteModal(true);
              setSelectedTeamId(element.id);
            }}
          >
            {t("teamsPage.delete")}
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );

  return (
    <Container>
      <Typography component="h1">
        Teams
      </Typography>

      <Paper>
        <Box>
          <Button
            onClick={() => setCreateTeamModal(true)}
          >
            {t("teamsPage.createTeam")}
          </Button>
        </Box>

        <TableContainer>
          <Table>
            {!isMobile && (
              <TableHead>
                <TableRow>
                  <TableCell>{t("teamsPage.name")}</TableCell>
                  <TableCell>{t("teamsPage.users")}</TableCell>
                  <TableCell>{t("teamsPage.code")}</TableCell>
                  <TableCell>{t("teamsPage.actions")}</TableCell>
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