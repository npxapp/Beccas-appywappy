// pages/User/EditAccountPage.jsx
import { useAuth } from 'contexts/AuthContext';
import { UpdateAccount } from "api/mutations";
import Box from "components/atoms/Box";
import AccountForm from "pages/User/AccountForm";
import ConfirmAlert from "libs/confirmAlert";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import {
  Grid,
  Typography
} from '@mui/material';

const EditAccountPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const mutation = useMutation(UpdateAccount);

  const onSubmit = async (data) => {
    try {
      const response = await mutation.mutateAsync({
        accountId: user.accountId,
        data: data,
      });
      if (response) {
        ConfirmAlert.success(t("editAccountPage.detailsUpdated"));
      }
    } catch (error) {
      // Error handling if needed
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          header={
            <Typography component="h1">
              {t("editAccountPage.details")}
            </Typography>
          }
          body={
            <AccountForm user={user} onSubmit={onSubmit} />
          }
        />
      </Grid>
    </Grid>
  );
};

export default EditAccountPage;