// pages/Auth/ActivateAccountPage.jsx
import { yupResolver } from "@hookform/resolvers/yup";
import { Activate } from "api/mutations";
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
  token: yup.string().min(6).required("Token is required"),
});

const ActivateAccountPage = (props) => {
  const { t } = useTranslation();
  const { email } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation(Activate);

  const onSubmit = async (data) => {
    try {
      const response = await mutation.mutateAsync({
        email,
        token: data.token
      });
      
      if (response) {
        ConfirmAlert.success(t("activateAccountPage.accountActivated"));
        props.history.push("/auth/login");
      }
    } catch (error) {
      ConfirmAlert.error("activateAccountPage.activationFailure");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box>
        <Typography component="h1" gutterBottom>
          {t("activateAccountPage.activateAccount")}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <FormControl fullWidth>
                <TextField
                  type="text"
                  placeholder={t("Token")}
                  inputProps={{ 
                    maxLength: 256,
                    'aria-describedby': 'token-helper-text'
                  }}
                  error={!!errors.token}
                  {...register("token", { required: true })}
                />
                {errors.token && (
                  <FormHelperText error id="token-helper-text">
                    {errors.token.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item>
              <Button
                type="submit"
                fullWidth
              >
                {t("activateAccountPage.activate")}
              </Button>
            </Grid>

            <Grid item container justifyContent="center">
              <Button
                component={Link}
                to="/auth/login"
              >
                {t("activateAccountPage.back")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default ActivateAccountPage;