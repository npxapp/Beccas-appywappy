// pages/Auth/ForgotPasswordPage.jsx
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgotPassword } from "api/mutations";
import ConfirmAlert from "libs/confirmAlert";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
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
  email: yup.string().email().required(),
});

const ForgotPasswordPage = (props) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation(ForgotPassword);

  const onSubmit = async (data) => {
    try {
      const response = await mutation.mutateAsync(data);
      if (response) {
        ConfirmAlert.success(t("forgotPasswordPage.passwordEmailSent"));
        props.history.push(`/auth/reset-password/${data.email}`);
      }
    } catch (error) {
      ConfirmAlert.success(t("forgotPasswordPage.resetPasswordFailure"));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box>
        <Typography component="h1" gutterBottom>
          {t("forgotPasswordPage.passwordReset")}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <FormControl fullWidth>
                <TextField
                  type="email"
                  placeholder="Email"
                  inputProps={{ 
                    maxLength: 256,
                    'aria-describedby': 'email-helper-text'
                  }}
                  error={!!errors.email}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <FormHelperText error id="email-helper-text">
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item>
              <Button
                type="submit"
                fullWidth
              >
                {t("forgotPasswordPage.sendCode")}
              </Button>
            </Grid>

            <Grid item container justifyContent="center">
              <Button
                component={Link}
                to="/auth/login"
              >
                {t("forgotPasswordPage.back")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;