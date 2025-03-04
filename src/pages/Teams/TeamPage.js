// pages/Teams/TeamPage.jsx
import { AddTeamUser, RemoveTeamUser, UpdateTeam } from "api/mutations";
import { Team, Users } from "api/queries";
import confirmAlert from "libs/confirmAlert";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
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
  TextField,
  Grid,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import TagIcon from '@mui/icons-material/Tag';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

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
              <Box display="flex" alignItems="center" gap={1}>
                {renderCheckbox(user)}
                <TagIcon color="action" sx={{ fontSize: 20 }} />
                <Typography>#{id + 1}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box display="flex" alignItems="center" gap={1}>
                <PersonIcon color="action" sx={{ fontSize: 20 }} />
                <Typography>{t("teamPage.user")}: {user.name}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box display="flex" alignItems="center" gap={1}>
                <EmailIcon color="action" sx={{ fontSize: 20 }} />
                <Typography>Email: {user.email}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </TableCell>
    </TableRow>
  );

  const renderDesktopRow = (user, id) => (
    <TableRow key={`user-${id}`}>
      <TableCell>{renderCheckbox(user)}</TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" gap={1}>
          <TagIcon color="action" sx={{ fontSize: 20 }} />
          {id + 1}
        </Box>
      </TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" gap={1}>
          <PersonIcon color="action" sx={{ fontSize: 20 }} />
          {user.name}
        </Box>
      </TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" gap={1}>
          <EmailIcon color="action" sx={{ fontSize: 20 }} />
          {user.email}
        </Box>
      </TableCell>
    </TableRow>
  );

  const renderCheckbox = (user) => {
    const isTeamMember = user.teams?.some((check) => check.id === teamId);
    
    return (
      <IconButton
        onClick={() => isTeamMember ? removeTeamUser(user.id) : addTeamUser(user.id)}
        color={isTeamMember ? "primary" : "default"}
      >
        {isTeamMember ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
      </IconButton>
    );
  };

  if (!team) return null;

  return (
    <Container>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GroupsIcon color="primary" sx={{ fontSize: 32 }} />
          Team
        </Typography>
        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <PeopleAltIcon color="action" />
          {team.data.name}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Button
                onClick={() => navigate("/teams")}
                variant="outlined"
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
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <TagIcon color="action" sx={{ fontSize: 20 }} />
                          #
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <PersonIcon color="action" sx={{ fontSize: 20 }} />
                          {t("teamPage.user")}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <EmailIcon color="action" sx={{ fontSize: 20 }} />
                          Email
                        </Box>
                      </TableCell>
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
          <Paper sx={{ p: 2 }}>
            <form onSubmit={(e) => {
              e.preventDefault();
              updateTeam();
            }}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DriveFileRenameOutlineIcon color="action" />
                    {t("teamPage.name")}
                  </Typography>
                  <TextField
                    fullWidth
                    value={teamName || ''}
                    onChange={(e) => setTeamName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DriveFileRenameOutlineIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item>
                  <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <QrCodeIcon color="action" />
                    {t("teamPage.code")}
                  </Typography>
                  <TextField
                    fullWidth
                    disabled
                    value={team.data.code}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <QrCodeIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item container justifyContent="flex-end">
                  <Button 
                    type="submit"
                    variant="contained"
                  >
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