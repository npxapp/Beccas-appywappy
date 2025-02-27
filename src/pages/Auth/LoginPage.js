// pages/Auth/LoginPage.jsx
import { useAuth } from 'contexts/AuthContext'; // Add this import
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import { Login } from "api/mutations";
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
  password: yup.string().min(8).required(),
});

const LoginPage = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { refetch } = useAuth(); // Add this

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation(Login);

  const onSubmit = async (data) => {
    try {
      await mutation.mutateAsync(data);
      await refetch(); // Refetch auth state after successful login
      navigate("/dashboard");
    } catch (error) {
      ConfirmAlert.error(t("loginPage.emailPasswordInvalid"));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box>
        <Typography component="h1" gutterBottom>
          {t("loginPage.access")}
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
              <FormControl fullWidth>
                <TextField
                  type="password"
                  placeholder="Password"
                  inputProps={{ 
                    maxLength: 256,
                    'aria-describedby': 'password-helper-text'
                  }}
                  error={!!errors.password}
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <FormHelperText error id="password-helper-text">
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
                {t("loginPage.confirm")}
              </Button>
            </Grid>

            <Grid item container direction="column" alignItems="center" spacing={1}>
              <Grid item>
                <Button
                  component={Link}
                  to="/auth/register"
                >
                  {t("loginPage.register")}
                </Button>
              </Grid>
              
              <Grid item>
                <Button
                  component={Link}
                  to="/auth/forgot-password"
                >
                  {t("loginPage.forgotPassword")}
                </Button>
              </Grid>
              
              <Grid item>
                <Button
                  component={Link}
                  to="/auth/resend-activation"
                >
                  {t("loginPage.didntReceivedActivationEmail")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;