// pages/Auth/ResendActivationPage.jsx
import { yupResolver } from "@hookform/resolvers/yup";
import { ResendActivation } from "api/mutations";
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

const ResendActivationPage = (props) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation(ResendActivation);

  const onSubmit = async (data) => {
    try {
      const response = await mutation.mutateAsync(data);
      if (response) {
        ConfirmAlert.success(t("resendActivationPage.emailSent"));
        props.history.push(`/auth/activate/${data.email}`);
      }
    } catch (error) {
      ConfirmAlert.error(t("resendActivationPage.invalidEmail"));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box>
        <Typography component="h1" gutterBottom>
          {t("resendActivationPage.resendActivationCode")}
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
                {t("resendActivationPage.confirm")}
              </Button>
            </Grid>

            <Grid item container justifyContent="center">
              <Button
                component={Link}
                to="/auth/login"
              >
                {t("resendActivationPage.back")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default ResendActivationPage;