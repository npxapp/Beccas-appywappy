// pages/Users/EditUser.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { User } from "api/queries";
import { UpdateUser } from "api/mutations";
import { useAuth } from 'contexts/AuthContext';
import ConfirmAlert from "libs/confirmAlert";
import Loader from "components/atoms/Loader";
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  Box
} from '@mui/material';

export default function EditUser() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    language: "",
    role: "",
  });

  const { userId } = useParams();
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery(
    ["User", user.accountId],
    () => User(userId),
    {
      retry: false,
      onSuccess: (data) => {
        if (data.data.accountOwner) {
          navigate("/users");
        } else {
          setUserData({
            name: data.data.name,
            surname: data.data.surname,
            language: data.data.language,
            role: data.data.role,
          });
        }
      },
    }
  );

  const updateUserMutate = useMutation(UpdateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Users", user.accountId]);
      queryClient.invalidateQueries(["User", user.accountId]);
    },
  });

  const saveUser = async () => {
    try {
      const response = await updateUserMutate.mutateAsync({
        userId: userId,
        data: userData,
      });
      if (response) {
        navigate("/users");
      }
    } catch (error) {
      if (error.response?.data) {
        ConfirmAlert.error(error.response.data);
      }
    }
  };

  const handleUserNameInput = (event) => {
    setUserData({ ...userData, name: event.target.value });
  };

  const handleUserSurnameInput = (event) => {
    setUserData({ ...userData, surname: event.target.value });
  };

  if (isLoading) {
    return <Loader />;
  }

  // eslint-disable-next-line no-unused-vars
  const userRole = (role) => role === "user" ? "User" : "Admin";

  if (!data?.data) {
    return null;
  }

  return (
    <Container>
      <Typography component="h1">
        {t("indexUsersPage.users")}
      </Typography>

      <Typography>
        {t("userEdit.user")} - {data.data.name}
      </Typography>

      <Paper>
        <Box>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography component="h2">
                {t("userEdit.editUser")}
              </Typography>
            </Grid>
            <Grid item>
              <Button onClick={saveUser}>
                {t("userEdit.save")}
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography>
                {t("userEdit.name")}
              </Typography>
              <TextField
                fullWidth
                value={userData.name}
                onChange={handleUserNameInput}
                placeholder="Write something..."
              />
            </Grid>

            <Grid item>
              <Typography>
                {t("userEdit.surname")}
              </Typography>
              <TextField
                fullWidth
                value={userData.surname}
                onChange={handleUserSurnameInput}
                placeholder="Write something..."
              />
            </Grid>

            <Grid item>
              <Typography>
                {t("userEdit.language")}
              </Typography>
              <Select
                fullWidth
                value={userData.language}
                onChange={(e) => setUserData({ ...userData, language: e.target.value })}
              >
                <MenuItem value="en">en</MenuItem>
                <MenuItem value="it">ita</MenuItem>
              </Select>
            </Grid>

            <Grid item>
              <Typography>
                {t("userEdit.role")}
              </Typography>
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
        </Box>
      </Paper>
    </Container>
  );
}