// pages/Users/UsersForm.jsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

// MUI Components
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Grid,
  InputAdornment
} from '@mui/material';

// MUI Icons
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SaveIcon from '@mui/icons-material/Save';
import TranslateIcon from '@mui/icons-material/Translate';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from "@mui/icons-material/Lock";

const schema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  email: yup.string().lowercase().email().required(),
  password: yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .nullable(),
});

const UsersForm = ({ user, onSubmit, showEmail }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name,
      surname: user.surname,
      email: user.email,
      language: user.language,
      role: user.role,
    },
  });

  return (
    <form
      id="users-form"
      name="users-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container direction="column" spacing={2}>
        {/* Name Field */}
        <Grid item>
          <FormControl fullWidth>
            <FormLabel>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <PersonIcon color="action" sx={{ fontSize: 20 }} />
                </Grid>
                <Grid item>{t("usersForm.name")}</Grid>
              </Grid>
            </FormLabel>
            <TextField
              {...register("name", { required: true })}
              error={!!errors.name}
              inputProps={{ maxLength: 256 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            {errors.name && (
              <FormHelperText error>{errors.name.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        {/* Surname Field */}
        <Grid item>
          <FormControl fullWidth>
            <FormLabel>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <BadgeIcon color="action" sx={{ fontSize: 20 }} />
                </Grid>
                <Grid item>{t("usersForm.surname")}</Grid>
              </Grid>
            </FormLabel>
            <TextField
              {...register("surname", { required: true })}
              error={!!errors.surname}
              inputProps={{ maxLength: 256 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            {errors.surname && (
              <FormHelperText error>{errors.surname.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        {/* Email Field */}
        {showEmail && (
          <Grid item>
            <FormControl fullWidth>
              <FormLabel>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <EmailIcon color="action" sx={{ fontSize: 20 }} />
                  </Grid>
                  <Grid item>{t("usersForm.email")}</Grid>
                </Grid>
              </FormLabel>
              <TextField
                type="email"
                {...register("email", { required: true })}
                error={!!errors.email}
                inputProps={{ maxLength: 256 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              {errors.email && (
                <FormHelperText error>{errors.email.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        )}

        {/* Language Selection */}
        <Grid item>
          <FormControl fullWidth>
            <FormLabel>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <TranslateIcon color="action" sx={{ fontSize: 20 }} />
                </Grid>
                <Grid item>{t("usersForm.language")}</Grid>
              </Grid>
            </FormLabel>
            <Select
              {...register("language", { required: true })}
              error={!!errors.language}
              startAdornment={
                <InputAdornment position="start">
                  <LanguageIcon color="action" />
                </InputAdornment>
              }
            >
              <MenuItem value="en">
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <TranslateIcon fontSize="small" />
                  </Grid>
                  <Grid item>en</Grid>
                </Grid>
              </MenuItem>
              <MenuItem value="it">
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <TranslateIcon fontSize="small" />
                  </Grid>
                  <Grid item>it</Grid>
                </Grid>
              </MenuItem>
            </Select>
            {errors.language && (
              <FormHelperText error>{errors.language.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        {/* Role Selection */}
        <Grid item>
          <FormControl fullWidth>
            <FormLabel>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <SecurityIcon color="action" sx={{ fontSize: 20 }} />
                </Grid>
                <Grid item>{t("usersForm.role")}</Grid>
              </Grid>
            </FormLabel>
            <Select
              {...register("role", { required: true })}
              error={!!errors.role}
              startAdornment={
                <InputAdornment position="start">
                  <AdminPanelSettingsIcon color="action" />
                </InputAdornment>
              }
            >
              <MenuItem value="user">
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <PersonOutlineIcon fontSize="small" />
                  </Grid>
                  <Grid item>{t("usersForm.user")}</Grid>
                </Grid>
              </MenuItem>
              <MenuItem value="admin">
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <SupervisorAccountIcon fontSize="small" />
                  </Grid>
                  <Grid item>{t("usersForm.admin")}</Grid>
                </Grid>
              </MenuItem>
            </Select>
            {errors.role && (
              <FormHelperText error>{errors.role.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
  
<Grid item>
  <FormControl fullWidth>
    <FormLabel>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <LockIcon color="action" sx={{ fontSize: 20 }} />
        </Grid>
        <Grid item>{t("usersForm.password")}</Grid>
      </Grid>
    </FormLabel>
    <TextField
      type="password"
      {...register("password")}
      error={!!errors.password}
      inputProps={{ maxLength: 256 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon color="action" />
          </InputAdornment>
        ),
      }}
    />
    {errors.password && (
      <FormHelperText error>{errors.password.message}</FormHelperText>
    )}
  </FormControl>
</Grid>

        {/* Submit Button */}
        <Grid item>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{ mt: 2 }}
          >
            {t("usersForm.save")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UsersForm;