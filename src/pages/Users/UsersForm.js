// pages/Users/UsersForm.jsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Grid
} from '@mui/material';

const schema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  email: yup.string().lowercase().email().required(),
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
        <Grid item>
          <FormControl fullWidth>
            <FormLabel>{t("usersForm.name")}</FormLabel>
            <TextField
              {...register("name", { required: true })}
              error={!!errors.name}
              inputProps={{ maxLength: 256 }}
            />
            {errors.name && (
              <FormHelperText>{errors.name.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <FormLabel>{t("usersForm.surname")}</FormLabel>
            <TextField
              {...register("surname", { required: true })}
              error={!!errors.surname}
              inputProps={{ maxLength: 256 }}
            />
            {errors.surname && (
              <FormHelperText>{errors.surname.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        {showEmail && (
          <Grid item>
            <FormControl fullWidth>
              <FormLabel>{t("usersForm.email")}</FormLabel>
              <TextField
                type="email"
                {...register("email", { required: true })}
                error={!!errors.email}
                inputProps={{ maxLength: 256 }}
              />
              {errors.email && (
                <FormHelperText>{errors.email.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        )}

        <Grid item>
          <FormControl fullWidth>
            <FormLabel>{t("usersForm.language")}</FormLabel>
            <Select
              {...register("language", { required: true })}
              error={!!errors.language}
            >
              <MenuItem value="en">en</MenuItem>
              <MenuItem value="it">it</MenuItem>
            </Select>
            {errors.language && (
              <FormHelperText>{errors.language.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <FormLabel>{t("usersForm.role")}</FormLabel>
            <Select
              {...register("role", { required: true })}
              error={!!errors.role}
            >
              <MenuItem value="user">{t("usersForm.user")}</MenuItem>
              <MenuItem value="admin">{t("usersForm.admin")}</MenuItem>
            </Select>
            {errors.role && (
              <FormHelperText>{errors.role.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <Button
            type="submit"
            fullWidth
          >
            {t("usersForm.save")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UsersForm;