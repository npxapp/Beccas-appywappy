// pages/Auth/RegisterPage.jsx
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import { Register } from "api/mutations";
import { SIGNUP_WITH_ACTIVATE } from "config";
import ConfirmAlert from "libs/confirmAlert";
import i18next from "libs/i18n";
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
  Box,
  Checkbox,
  FormControlLabel,
  Link as MuiLink
} from '@mui/material';

const RegisterPage = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const mutation = useMutation(Register);

  const schema = yup.object().shape({
    subdomain: yup
      .string()
      .matches(/^[a-z0-9](-?[a-z0-9])*$/, {
        excludeEmptyString: false,
        message: t("registerPage.invalidSubdomain"),
      })
      .lowercase()
      .required(),
    email: yup.string().lowercase().email().required(),
    password: yup.string().min(8).required(),
    privacyAccepted: yup
      .boolean()
      .required(t("registerPage.termsAccepted"))
      .oneOf([true], t("registerPage.termsAccepted")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const slugify = (value) => {
    const slug = value
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "");
    setValue("subdomain", slug);
  };

const onSubmit = async (data) => {
  try {
    data.language = i18next.language;
    const response = await mutation.mutateAsync(data);
    if (response) {
      if (SIGNUP_WITH_ACTIVATE) {
        navigate("/dashboard");
      } else {
        ConfirmAlert.success(t("registerPage.confirmEmailSent"));
        navigate(`/auth/activate/${data.email}`);
      }
    }
  } catch (error) {
    // Display the ConfirmAlert error
    ConfirmAlert.error(error.response?.data?.message || t("registerPage.emailPasswordInvalid"));
    
    // Display the full error in a plain alert after stringifying the error
    //alert(JSON.stringify(error, null, 2));
  }
};

  return (
    <Container maxWidth="sm">
      <Box>
        <Typography component="h1" gutterBottom>
          {t("registerPage.register")}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <FormControl fullWidth>
                <TextField
                  type="text"
                  placeholder={t("registerPage.subdomain")}
                  inputProps={{ 
                    maxLength: 256,
                    'aria-describedby': 'subdomain-helper-text'
                  }}
                  error={!!errors.subdomain}
                  {...register("subdomain", { required: true })}
                  onChange={(e) => slugify(e.target.value)}
                />
                {errors.subdomain && (
                  <FormHelperText error id="subdomain-helper-text">
                    {errors.subdomain.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

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
              <FormControl error={!!errors.privacyAccepted}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("privacyAccepted", { required: true })}
                    />
                  }
                  label={
                    <Typography>
                      {t("registerPage.registerConsent")}
                    </Typography>
                  }
                />
                {errors.privacyAccepted && (
                  <FormHelperText error>
                    {errors.privacyAccepted.message}
                  </FormHelperText>
                )}
                <Grid container direction="column">
                  <MuiLink href="/" target="_blank">
                    {t("registerPage.terms")}
                  </MuiLink>
                  <MuiLink href="/" target="_blank">
                    {t("registerPage.privacy")}
                  </MuiLink>
                </Grid>
              </FormControl>
            </Grid>

            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("marketingAccepted")}
                  />
                }
                label={
                  <Typography>
                    {t("registerPage.marketingConsent")}
                  </Typography>
                }
              />
            </Grid>

            <Grid item>
              <Button
                type="submit"
                fullWidth
              >
                {t("registerPage.confirm")}
              </Button>
            </Grid>

            <Grid item container direction="column" alignItems="center" spacing={1}>
              <Grid item>
                <Button
                  component={Link}
                  to="/auth/login"
                >
                  {t("registerPage.alreadyRegistered")}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  component={Link}
                  to="/auth/resend-activation"
                >
                  {t("registerPage.didntReceivedActivationEmail")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;