// pages/Users/CreateUsersPage.jsx
import { CreateUser } from "api/mutations";
import Box from "components/atoms/Box";
import ConfirmAlert from "libs/confirmAlert";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from 'react-router-dom'; // Add this
import { useAuth } from 'contexts/AuthContext'; // Add this
import UsersForm from "./UsersForm";
import {
  Grid,
  Typography
} from '@mui/material';

const CreateUsersPage = () => {
  const { user } = useAuth(); // Add this hook
  const navigate = useNavigate(); // Add this hook
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const createUserMutate = useMutation(CreateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Users", user.accountId]);
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createUserMutate.mutateAsync(data);
      if (response) {
        ConfirmAlert.success(t("createUsersPage.userCreated"));
        navigate("/users");
      }
    } catch (error) {
      if (error.response?.data) {
        ConfirmAlert.error(error.response.data);
      }
    }
  };

  const newUserDefaults = {
    name: "",
    surname: "",
    email: "",
    language: "en",
    role: "user",
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          header={
            <Typography component="h1">
              {t("createUsersPage.createUser")}
            </Typography>
          }
          body={
            <UsersForm user={newUserDefaults} onSubmit={onSubmit} showEmail />
          }
        />
      </Grid>
    </Grid>
  );
};

export default CreateUsersPage;