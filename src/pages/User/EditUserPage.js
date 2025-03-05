// pages/User/EditUserPage.jsx
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePassword } from "api/mutations";
import Box from "components/atoms/Box";
import ConfirmAlert from "libs/confirmAlert";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";

// MUI Components
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  InputAdornment,
} from '@mui/material';

// MUI Icons
import LockIcon from '@mui/icons-material/Lock';
import LockResetIcon from '@mui/icons-material/LockReset';
import SecurityIcon from '@mui/icons-material/Security';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const schema = yup.object().shape({
  password: yup.string().min(8).required("editUserPage.passwordRequired"),
});

const EditUserPage = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

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

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          header={
            <>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <LockResetIcon color="primary" sx={{ fontSize: 32 }} />
                </Grid>
                <Grid item xs>
                  <Typography component="h1" variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SecurityIcon color="primary" sx={{ fontSize: 24 }} />
                    {t("editUserPage.changePassword")}
                  </Typography>
                  <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <KeyIcon color="action" sx={{ fontSize: 20 }} />
                    {t("editUserPage.insertNewPassword")}
                  </Typography>
                </Grid>
              </Grid>
            </>
          }
          body={
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <FormControl fullWidth>
                    <FormLabel>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                          <LockIcon color="action" sx={{ fontSize: 20 }} />
                        </Grid>
                        <Grid item>Password</Grid>
                      </Grid>
                    </FormLabel>
                    <TextField
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      inputProps={{ maxLength: 256 }}
                      {...register("password", { required: true })}
                      error={!!errors.password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              aria-label="toggle password visibility"
                              onClick={handleTogglePassword}
                              sx={{ minWidth: 'auto', p: 1 }}
                            >
                              {showPassword ? 
                                <VisibilityOffIcon color="action" /> : 
                                <VisibilityIcon color="action" />
                              }
                            </Button>
                          </InputAdornment>
                        ),
                      }}
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
                    variant="contained"
                    sx={{ mt: 2 }}
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