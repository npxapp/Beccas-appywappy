// pages/Teams/TeamPage.jsx
import { AddTeamUser, RemoveTeamUser, UpdateTeam } from "api/mutations";
import { Team, Users } from "api/queries";
import confirmAlert from "libs/confirmAlert";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from 'contexts/AuthContext'; // Add this import
import CheckIcon from '@mui/icons-material/Check';
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
  TextField,
  Grid,
  Box,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';

export default function TeamPage() {
  const { user } = useAuth(); // Add this hook
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [teamName, setTeamName] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const queryClient = useQueryClient();

  const { data: team } = useQuery(
    ["Team", user.accountId],
    () => Team(teamId),
    {
      onSuccess: (data) => {
        setTeamName(data.data.name);
      },
    }
  );

  const { data: users } = useQuery(["Users", user.accountId], Users);

  const addTeamUserMutate = useMutation(AddTeamUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Team", user.accountId]);
      queryClient.invalidateQueries(["Users", user.accountId]);
    },
  });

  const addTeamUser = async (userId) => {
    try {
      await addTeamUserMutate.mutateAsync({
        teamId: teamId,
        userId: userId,
      });
    } catch (error) {
      if (error.response?.data) {
        confirmAlert.error(error.response.data);
      }
    }
  };

  const removeTeamUserMutate = useMutation(RemoveTeamUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Team", user.accountId]);
      queryClient.invalidateQueries(["Users", user.accountId]);
    },
  });

  const removeTeamUser = async (userId) => {
    try {
      await removeTeamUserMutate.mutateAsync({
        teamId: teamId,
        userId: userId,
      });
    } catch (error) {
      if (error.response?.data) {
        confirmAlert.error(error.response.data);
      }
    }
  };

  const updateTeamMutate = useMutation(UpdateTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Team", user.accountId]);
    },
  });

  const updateTeam = async () => {
    try {
      const result = await updateTeamMutate.mutateAsync({
        id: teamId,
        data: { name: teamName },
      });
      if (result) {
        confirmAlert.success("team updated");
      }
    } catch (error) {
      if (error.response?.data) {
        confirmAlert.error(error.response.data);
      }
    }
  };

  const renderMobileRow = (user, id) => (
    <TableRow key={`user-${id}`}>
      <TableCell>
        <Box>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Box display="flex" alignItems="center">
                {renderCheckbox(user)}
                <Typography>#{id + 1}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Typography>{t("teamPage.user")}: {user.name}</Typography>
            </Grid>
            <Grid item>
              <Typography>Email: {user.email}</Typography>
            </Grid>
          </Grid>
        </Box>
      </TableCell>
    </TableRow>
  );

  const renderDesktopRow = (user, id) => (
    <TableRow key={`user-${id}`}>
      <TableCell>{renderCheckbox(user)}</TableCell>
      <TableCell>{id + 1}</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
    </TableRow>
  );

  const renderCheckbox = (user) => {
    const isTeamMember = user.teams?.some((check) => check.id === teamId);
    
    return (
      <IconButton
        onClick={() => isTeamMember ? removeTeamUser(user.id) : addTeamUser(user.id)}
      >
        {isTeamMember ? <CheckIcon /> : <Box />}
      </IconButton>
    );
  };

  if (!team) return null;

  return (
    <Container>
      <Typography component="h1">
        Team
      </Typography>
      <Typography>
        {team.data.name}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Paper>
            <Box>
              <Button
                onClick={() => navigate("/teams")}
              >
                {t("teamPage.save")}
              </Button>
            </Box>

            <TableContainer>
              <Table>
                {!isMobile && (
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>#</TableCell>
                      <TableCell>{t("teamPage.user")}</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                )}
                <TableBody>
                  {users?.data.map((user, id) => (
                    isMobile ? 
                      renderMobileRow(user, id) : 
                      renderDesktopRow(user, id)
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper>
            <form onSubmit={(e) => {
              e.preventDefault();
              updateTeam();
            }}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography>
                    {t("teamPage.name")}
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="..."
                    value={teamName || ''}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </Grid>

                <Grid item>
                  <Typography>
                    {t("teamPage.code")}
                  </Typography>
                  <TextField
                    fullWidth
                    disabled
                    value={team.data.code}
                  />
                </Grid>

                <Grid item container justifyContent="flex-end">
                  <Button type="submit">
                    {t("teamPage.save")}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}