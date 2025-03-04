// pages/Users/EditUsersPage.jsx
import { UpdateUser } from "api/mutations";
import { User } from "api/queries";
import Box from "components/atoms/Box";
import Loader from "components/atoms/Loader";
import ConfirmAlert from "libs/confirmAlert";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from 'contexts/AuthContext';
import UsersForm from "./UsersForm";
import { 
  Grid,
  Typography
} from '@mui/material';

const EditUsersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { userId } = useParams();
  const [editedUser, setEditedUser] = useState(null);
  const queryClient = useQueryClient();

  // eslint-disable-next-line no-unused-vars
  const { isLoading, data } = useQuery(
    ["User", user.accountId],
    () => User(userId),
    {
      retry: false,
      onSuccess: (data) => {
        if (data.data.accountOwner) {
          navigate("/users");
        } else {
          setEditedUser(data.data);
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

  const onSubmit = async (data) => {
    delete data.email;
    try {
      const response = await updateUserMutate.mutateAsync({
        userId: userId,
        data: data,
      });
      if (response) {
        ConfirmAlert.success(t("updateUsersPage.userUpdated"));
        navigate("/users");
      }
    } catch (error) {
      if (error.response?.data) {
        ConfirmAlert.error(error.response.data);
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          header={
            <Typography component="h1">
              {t("updateUsersPage.updatedUser")}
            </Typography>
          }
          body={
            editedUser && <UsersForm user={editedUser} onSubmit={onSubmit} showEmail={false} />
          }
        />
      </Grid>
    </Grid>
  );
};

export default EditUsersPage;