// pages/Auth/ResetPasswordPage.jsx
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPassword } from "api/mutations";
import ConfirmAlert from "libs/confirmAlert";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { Link, useParams } from "react-router-dom";
import * as yup from "yup";
import {
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  FormHelperText,
  Container,
  Box
} from '@mui/material';

const schema = yup.object().shape({
  password: yup.string().min(8).required("Password is required"),
});

const ResetPasswordPage = (props) => {
  const { t } = useTranslation();
  const { email } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation(ResetPassword);

  const onSubmit = async (data) => {
    try {
      const response = await mutation.mutateAsync({
        email,
        passwordResetToken: data.passwordResetToken,
        password: data.password,
      });
      
      if (response) {
        ConfirmAlert.success(t("resetPasswordPage.passwordUpdated"));
        props.history.push("/auth/login");
      }
    } catch (error) {
      ConfirmAlert.error(t("resetPasswordPage.resetPasswordFailure"));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box>
        <Typography component="h1" gutterBottom>
          {t("resetPasswordPage.changePassword")}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  type="text"
                  placeholder="Token"
                  inputProps={{ maxLength: 256 }}
                  error={!!errors.passwordResetToken}
                  {...register("passwordResetToken", { required: true })}
                />
                {errors.passwordResetToken && (
                  <FormHelperText error>
                    {errors.passwordResetToken.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="Password"
                  inputProps={{ maxLength: 256 }}
                  error={!!errors.password}
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <FormHelperText error>
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
                {t("resetPasswordPage.updatePassword")}
              </Button>
            </Grid>

            <Grid item container justifyContent="center">
              <Button
                component={Link}
                to="/auth/login"
              >
                {t("resetPasswordPage.back")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;