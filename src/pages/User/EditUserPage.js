// pages/User/EditUserPage.jsx
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePassword } from "api/mutations";
import Box from "pages/Dashboard/Box";
import ConfirmAlert from "libs/confirmAlert";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useNavigate } from 'react-router-dom'; // Add this
import * as yup from "yup";
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormHelperText
} from '@mui/material';

const schema = yup.object().shape({
  password: yup.string().min(8).required("editUserPage.passwordRequired"),
});

const EditUserPage = (props) => {
  const navigate = useNavigate(); // Add this
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation(ChangePassword);

  const onSubmit = async (data) => {
    const response = await mutation.mutateAsync({ 
      password: data.password 
    });
    
    if (response) {
      ConfirmAlert.success(t("editUserPage.passwordUpdated"));
      navigate("/");
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          header={
            <>
              <Typography component="h1">
                {t("editUserPage.changePassword")}
              </Typography>
              <Typography>
                {t("editUserPage.insertNewPassword")}
              </Typography>
            </>
          }
          body={
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <FormControl fullWidth>
                    <FormLabel>Password</FormLabel>
                    <TextField
                      type="password"
                      fullWidth
                      inputProps={{ maxLength: 256 }}
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <FormHelperText>
                        {errors.password.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                  >
                    {t("editUserPage.updatePassword")}
                  </Button>
                </Grid>
              </Grid>
            </form>
          }
        />
      </Grid>
    </Grid>
  );
};

export default EditUserPage;