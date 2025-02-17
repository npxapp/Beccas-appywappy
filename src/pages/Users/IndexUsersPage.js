// pages/Users/IndexUsersPage.jsx
import { CreateUser, DeleteUser } from "api/mutations";
import { Users } from "api/queries";
import Loader from "layouts/Loader";
import ConfirmAlert from "libs/confirmAlert";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { useAuth } from 'contexts/AuthContext';
import {
  Dialog,
  DialogTitle,
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

const IndexUsersPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
// Add this to your state declarations at the top of your component
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

  /*const createUser = async () => {
    try {
      const response = await createUserMutate.mutateAsync(userData);
      if (response) {
        ConfirmAlert.success(t("createUsersPage.userCreated"));
      }
    } catch (error) {
      if (error.response?.data) {
        ConfirmAlert.error(error.response.data);
      }
    }
  };*/
  
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

  const userRole = (role) => role === "user" ? "User" : "Admin";

  if (isLoading) return <Loader />;

  /*const renderCreateUserDialog = () => (
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
            />
          </Grid>

          <Grid item>
            <Typography>{t("createUsersPage.surname")}</Typography>
            <TextField
              fullWidth
              placeholder="..."
              value={userData.surname}
              onChange={(e) => setUserData({ ...userData, surname: e.target.value })}
            />
          </Grid>

          <Grid item>
            <Typography>{t("createUsersPage.email")}</Typography>
            <TextField
              fullWidth
              placeholder="..."
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          </Grid>

          <Grid item>
            <Select
              fullWidth
              value={userData.language}
              onChange={(e) => setUserData({ ...userData, language: e.target.value })}
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
            setCreateUserPopup(false);
            setUserData({
              name: "",
              surname: "",
              email: "",
              language: "en",
              role: "user",
            });
          }}
        >
          {t("createUsersPage.cancel")}
        </Button>
        <Button
          onClick={() => {
            setCreateUserPopup(false);
            createUser();
          }}
        >
          {t("createUsersPage.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );*/
  
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
        <TableHead>
          <TableRow>
            <TableCell>{t("indexUsersPage.name")}</TableCell>
            <TableCell>{t("indexUsersPage.surname")}</TableCell>
            <TableCell>{t("indexUsersPage.email")}</TableCell>
            <TableCell>{t("indexUsersPage.role")}</TableCell>
            <TableCell>{t("indexUsersPage.actions")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((element, i) => (
            <TableRow key={`element.name-${i}`}>
              <TableCell>{element.name}</TableCell>
              <TableCell>{element.surname}</TableCell>
              <TableCell>{element.email}</TableCell>
              <TableCell>{element.role}</TableCell>
              <TableCell>
                <Grid container spacing={1}>
                  <Grid item>
                    <Button
                      component={Link}
                      to={user.name !== element.name ? `/edit-user/${element.id}` : '/user/edit'}
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
                      >
                        {t("buttonUsers.delete")}
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </TableCell>
            </TableRow>
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