// pages/Users/IndexUsersPage.jsx
import { CreateUser, DeleteUser } from "api/mutations";
import { Users } from "api/queries";
import Loader from "components/atoms/Loader";
import ConfirmAlert from "libs/confirmAlert";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { useAuth } from 'contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Typography,
  Grid,
  Container
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const IndexUsersPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createUserPopup, setCreateUserPopup] = useState(false);
  const [deleteUserPopup, setDeleteUserPopup] = useState(false);
  const [userId, setUserId] = useState(undefined);
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    language: "en",
    role: "user",
  });

  const queryClient = useQueryClient();

  const deleteUserMutate = useMutation(DeleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Users", user.accountId]);
    },
  });

  const createUserMutate = useMutation(CreateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Users", user.accountId]);
    },
  });
  
const createUser = async () => {
  try {
    await createUserMutate.mutateAsync(userData);
    // Close the popup first
    setCreateUserPopup(false);
    // Reset the form data
    setUserData({
      name: "",
      surname: "",
      email: "",
      language: "en",
      role: "user",
    });
    // Show success message
    ConfirmAlert.success(t("createUsersPage.userCreated"));
  } catch (error) {
    // Handle specific error cases
    if (error.response?.data?.message) {
      ConfirmAlert.error(error.response.data.message);
    } else if (error.response?.data) {
      ConfirmAlert.error(typeof error.response.data === 'string' 
        ? error.response.data 
        : 'Error creating user');
    } else {
      ConfirmAlert.error('Error creating user');
    }
  }
};

  const { isLoading, data } = useQuery(["Users", user.accountId], Users, {
    retry: false,
  });

  const deleteUser = async () => {
    try {
      const response = await deleteUserMutate.mutate(userId);
      if (response) {
        ConfirmAlert.success("User deleted");
      }
    } catch (error) {
      if (error.response?.data) {
        ConfirmAlert.error(error.response.data);
      }
    }
  };

  // eslint-disable-next-line no-unused-vars
  const userRole = (role) => role === "user" ? "User" : "Admin";

  if (isLoading) return <Loader />;
  
// Updated Dialog with loading state and proper error handling
const renderCreateUserDialog = () => (
  <Dialog open={createUserPopup} onClose={() => setCreateUserPopup(false)}>
    <DialogContent>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography>{t("createUsersPage.name")}</Typography>
          <TextField
            fullWidth
            placeholder="..."
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            disabled={isSubmitting}
          />
        </Grid>

        <Grid item>
          <Typography>{t("createUsersPage.surname")}</Typography>
          <TextField
            fullWidth
            placeholder="..."
            value={userData.surname}
            onChange={(e) => setUserData({ ...userData, surname: e.target.value })}
            disabled={isSubmitting}
          />
        </Grid>

        <Grid item>
          <Typography>{t("createUsersPage.email")}</Typography>
          <TextField
            fullWidth
            placeholder="..."
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            disabled={isSubmitting}
          />
        </Grid>

        <Grid item>
          <Select
            fullWidth
            value={userData.language}
            onChange={(e) => setUserData({ ...userData, language: e.target.value })}
            disabled={isSubmitting}
          >
            <MenuItem value="en">en</MenuItem>
            <MenuItem value="it">it</MenuItem>
          </Select>
        </Grid>

        <Grid item>
          <Select
            fullWidth
            value={userData.role}
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
            disabled={isSubmitting}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => {
          if (!isSubmitting) {
            setCreateUserPopup(false);
            setUserData({
              name: "",
              surname: "",
              email: "",
              language: "en",
              role: "user",
            });
          }
        }}
        disabled={isSubmitting}
      >
        {t("createUsersPage.cancel")}
      </Button>
      <Button
        onClick={createUser}
        disabled={isSubmitting}
        variant="contained"
        color="primary"
      >
        {isSubmitting ? 'Creating...' : t("createUsersPage.save")}
      </Button>
    </DialogActions>
  </Dialog>
);

  const renderDeleteUserDialog = () => (
    <Dialog open={deleteUserPopup} onClose={() => setDeleteUserPopup(false)}>
      <DialogContent>
        <Typography align="center">
          {t("indexUsersPage.deleteUser")}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setDeleteUserPopup(false);
            deleteUser(userId);
            setUserId("");
          }}
        >
          {t("indexUsersPage.yes")}
        </Button>
        <Button
          onClick={() => {
            setDeleteUserPopup(false);
            setUserId("");
          }}
        >
          {t("indexUsersPage.no")}
        </Button>
      </DialogActions>
    </Dialog>
  );

const renderUsersTable = () => (
  <TableContainer component={Paper}>
    <Table>
      {/* Desktop header - hidden on mobile */}
      <TableHead sx={{ display: { xs: 'none', md: 'table-header-group' } }}>
        <TableRow>
          <TableCell>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <PersonIcon color="action" sx={{ fontSize: 20 }} />
              </Grid>
              <Grid item>{t("indexUsersPage.name")}</Grid>
            </Grid>
          </TableCell>
          <TableCell>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <BadgeIcon color="action" sx={{ fontSize: 20 }} />
              </Grid>
              <Grid item>{t("indexUsersPage.surname")}</Grid>
            </Grid>
          </TableCell>
          <TableCell>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <EmailIcon color="action" sx={{ fontSize: 20 }} />
              </Grid>
              <Grid item>{t("indexUsersPage.email")}</Grid>
            </Grid>
          </TableCell>
          <TableCell>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <AdminPanelSettingsIcon color="action" sx={{ fontSize: 20 }} />
              </Grid>
              <Grid item>{t("indexUsersPage.role")}</Grid>
            </Grid>
          </TableCell>
          <TableCell>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <SettingsIcon color="action" sx={{ fontSize: 20 }} />
              </Grid>
              <Grid item>{t("indexUsersPage.actions")}</Grid>
            </Grid>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.data.map((element, i) => (
          <>
            {/* Mobile view (xs, sm) */}
            <TableRow 
              key={`mobile-${element.name}-${i}`}
              sx={{ 
                display: { xs: 'grid', md: 'none' },
                gridTemplateColumns: '1fr',
                gap: 1,
                '& > td': {
                  border: 0,
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: 0.5,
                  padding: 1
                }
              }}
            >
              <TableCell>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <PersonIcon color="action" sx={{ fontSize: 20 }} />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="caption" color="text.secondary">
                      {t("indexUsersPage.name")}
                    </Typography>
                    <Typography>{element.name}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <BadgeIcon color="action" sx={{ fontSize: 20 }} />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="caption" color="text.secondary">
                      {t("indexUsersPage.surname")}
                    </Typography>
                    <Typography>{element.surname}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <EmailIcon color="action" sx={{ fontSize: 20 }} />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="caption" color="text.secondary">
                      {t("indexUsersPage.email")}
                    </Typography>
                    <Typography>{element.email}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    {element.role === 'admin' ? 
                      <SupervisorAccountIcon color="primary" sx={{ fontSize: 20 }} /> : 
                      <PersonOutlineIcon color="action" sx={{ fontSize: 20 }} />
                    }
                  </Grid>
                  <Grid item xs>
                    <Typography variant="caption" color="text.secondary">
                      {t("indexUsersPage.role")}
                    </Typography>
                    <Typography>{element.role}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell sx={{ mt: 1 }}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Button
                      component={Link}
                      to={user.name !== element.name ? `/edit-user/${element.id}` : '/user/edit'}
                      fullWidth
                      variant="outlined"
                    >
                      {t("buttonUsers.edit")}
                    </Button>
                  </Grid>
                  {user.accountOwner && user.name !== element.name && (
                    <Grid item xs={12}>
                      <Button
                        onClick={() => {
                          setDeleteUserPopup(true);
                          setUserId(element.id);
                        }}
                        fullWidth
                        variant="outlined"
                        color="error"
                      >
                        {t("buttonUsers.delete")}
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </TableCell>
            </TableRow>

            {/* Desktop view (md and up) */}
            <TableRow 
              key={`desktop-${element.name}-${i}`}
              sx={{ display: { xs: 'none', md: 'table-row' } }}
            >
              <TableCell>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <PersonIcon color="action" sx={{ fontSize: 20 }} />
                  </Grid>
                  <Grid item>{element.name}</Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <BadgeIcon color="action" sx={{ fontSize: 20 }} />
                  </Grid>
                  <Grid item>{element.surname}</Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <EmailIcon color="action" sx={{ fontSize: 20 }} />
                  </Grid>
                  <Grid item>{element.email}</Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    {element.role === 'admin' ? 
                      <SupervisorAccountIcon color="primary" sx={{ fontSize: 20 }} /> : 
                      <PersonOutlineIcon color="action" sx={{ fontSize: 20 }} />
                    }
                  </Grid>
                  <Grid item>{element.role}</Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={1}>
                  <Grid item>
                    <Button
                      component={Link}
                      to={user.name !== element.name ? `/edit-user/${element.id}` : '/user/edit'}
                      variant="outlined"
                    >
                      {t("buttonUsers.edit")}
                    </Button>
                  </Grid>
                  {user.accountOwner && user.name !== element.name && (
                    <Grid item>
                      <Button
                        onClick={() => {
                          setDeleteUserPopup(true);
                          setUserId(element.id);
                        }}
                        variant="outlined"
                        color="error"
                      >
                        {t("buttonUsers.delete")}
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

  return (
    <Container>
      <Typography component="h1" gutterBottom>
        {t("indexUsersPage.users")}
      </Typography>

      <Paper>
        <Grid container justifyContent="flex-end" padding={2}>
          <Button
            onClick={() => setCreateUserPopup(true)}
          >
            {t("buttonUsers.createUser")}
          </Button>
        </Grid>

        {renderUsersTable()}
      </Paper>

      {renderCreateUserDialog()}
      {renderDeleteUserDialog()}
    </Container>
  );
};

export default IndexUsersPage;