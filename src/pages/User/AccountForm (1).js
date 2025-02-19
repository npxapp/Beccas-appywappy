// pages/User/AccountForm.jsx
import { useAuth } from 'contexts/AuthContext';
import { yupResolver } from "@hookform/resolvers/yup";
import { countries } from "libs/countries";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  MenuItem
} from '@mui/material';

const schema = yup.object().shape({
  companyName: yup.string().required(),
  companyPhone: yup.string().required(),
  companyBillingAddress: yup.string().required(),
  companyCountry: yup.string().required(),
  companyVat: yup.string().required(),
  companyEmail: yup.string().lowercase().email().required(),
  companySdi: yup.string(),
  companyPec: yup.string().lowercase().email().required(),
});

const AccountForm = ({ onSubmit }) => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      companyName: user.account.companyName,
      companyPhone: user.account.companyPhone,
      companyBillingAddress: user.account.companyBillingAddress,
      companyVat: user.account.companyVat,
      companySdi: user.account.companySdi,
      companyPec: user.account.companyPec,
      companyEmail: user.account.companyEmail,
      companyCountry: user.account.companyCountry,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <FormControl fullWidth>
            <FormLabel>{t("accountForm.companyName")}</FormLabel>
            <TextField
              fullWidth
              inputProps={{ maxLength: 256 }}
              {...register("companyName", { required: true })}
              error={!!errors.companyName}
            />
            {errors.companyName && (
              <FormHelperText>{errors.companyName.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <FormLabel>{t("accountForm.phoneNumber")}</FormLabel>
            <TextField
              fullWidth
              inputProps={{ maxLength: 256 }}
              {...register("companyPhone", { required: true })}
              error={!!errors.companyPhone}
            />
            {errors.companyPhone && (
              <FormHelperText>{errors.companyPhone.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <FormLabel>{t("accountForm.billingAddress")}</FormLabel>
            <TextField
              fullWidth
              inputProps={{ maxLength: 256 }}
              {...register("companyBillingAddress", { required: true })}
              error={!!errors.companyBillingAddress}
            />
            {errors.companyBillingAddress && (
              <FormHelperText>{errors.companyBillingAddress.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <FormLabel>{t("accountForm.companyCountry")}</FormLabel>
            <Select
              {...register("companyCountry", { required: true })}
              error={!!errors.companyCountry}
            >
              <MenuItem value="">{t("accountForm.selectOne")}</MenuItem>
              {countries.map((value, index) => (
                <MenuItem key={index} value={value.code}>
                  {value.name} {value.flag}
                </MenuItem>
              ))}
            </Select>
            {errors.companyCountry && (
              <FormHelperText>{errors.companyCountry.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <FormLabel>{t("accountForm.vatNumber")}</FormLabel>
            <TextField
              fullWidth
              inputProps={{ maxLength: 256 }}
              {...register("companyVat", { required: true })}
              error={!!errors.companyVat}
            />
            {errors.companyVat && (
              <FormHelperText>{errors.companyVat.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <FormLabel>{t("Email")}</FormLabel>
            <TextField
              fullWidth
              type="email"
              inputProps={{ maxLength: 256 }}
              {...register("companyEmail", { required: true })}
              error={!!errors.companyEmail}
            />
            {errors.companyEmail && (
              <FormHelperText>{errors.companyEmail.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <FormLabel>{t("PEC")}</FormLabel>
            <TextField
              fullWidth
              type="email"
              inputProps={{ maxLength: 256 }}
              {...register("companyPec")}
              error={!!errors.companyPec}
            />
            {errors.companyPec && (
              <FormHelperText>{errors.companyPec.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <FormLabel>{t("SDI")}</FormLabel>
            <TextField
              fullWidth
              inputProps={{ maxLength: 256 }}
              {...register("companySdi")}
              error={!!errors.companySdi}
            />
            {errors.companySdi && (
              <FormHelperText>{errors.companySdi.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <Button
            type="submit"
            fullWidth
          >
            {t("accountForm.update")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AccountForm;