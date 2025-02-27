// pages/User/AccountForm.jsx
import { useAuth } from 'contexts/AuthContext';
import { yupResolver } from "@hookform/resolvers/yup";
import { countries } from "libs/countries";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

// MUI Components
import {
  Grid,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  MenuItem,
  InputAdornment
} from '@mui/material';

// MUI Icons
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EmailIcon from '@mui/icons-material/Email';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import BadgeIcon from '@mui/icons-material/Badge';

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
            <FormLabel>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <BusinessIcon color="action" sx={{ fontSize: 20 }} />
                </Grid>
                <Grid item>{t("accountForm.companyName")}</Grid>
              </Grid>
            </FormLabel>
            <TextField
              fullWidth
              inputProps={{ maxLength: 256 }}
              {...register("companyName", { required: true })}
              error={!!errors.companyName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            {errors.companyName && (
              <FormHelperText error>{errors.companyName.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <FormLabel>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <PhoneIcon color="action" sx={{ fontSize: 20 }} />
                </Grid>
                <Grid item>{t("accountForm.phoneNumber")}</Grid>
              </Grid>
            </FormLabel>
            <TextField
              fullWidth
              inputProps={{ maxLength: 256 }}
              {...register("companyPhone", { required: true })}
              error={!!errors.companyPhone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            {errors.companyPhone && (
              <FormHelperText error>{errors.companyPhone.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <FormLabel>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <LocationOnIcon color="action" sx={{ fontSize: 20 }} />
                </Grid>
                <Grid item>{t("accountForm.billingAddress")}</Grid>
              </Grid>
            </FormLabel>
            <TextField
              fullWidth
              inputProps={{ maxLength: 256 }}
              {...register("companyBillingAddress", { required: true })}
              error={!!errors.companyBillingAddress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            {errors.companyBillingAddress && (
              <FormHelperText error>{errors.companyBillingAddress.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <FormLabel>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <PublicIcon color="action" sx={{ fontSize: 20 }} />
                </Grid>
                <Grid item>{t("accountForm.companyCountry")}</Grid>
              </Grid>
            </FormLabel>
            <Select
              {...register("companyCountry", { required: true })}
              error={!!errors.companyCountry}
              startAdornment={
                <InputAdornment position="start">
                  <PublicIcon color="action" />
                </InputAdornment>
              }
            >
              <MenuItem value="">{t("accountForm.selectOne")}</MenuItem>
              {countries.map((value, index) => (
                <MenuItem key={index} value={value.code}>
                  {value.name} {value.flag}
                </MenuItem>
              ))}
            </Select>
            {errors.companyCountry && (
              <FormHelperText error>{errors.companyCountry.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <FormLabel>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <ReceiptIcon color="action" sx={{ fontSize: 20 }} />
                </Grid>
                <Grid item>{t("accountForm.vatNumber")}</Grid>
              </Grid>
            </FormLabel>
            <TextField
              fullWidth
              inputProps={{ maxLength: 256 }}
              {...register("companyVat", { required: true })}
              error={!!errors.companyVat}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ReceiptIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            {errors.companyVat && (
              <FormHelperText error>{errors.companyVat.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <FormLabel>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <EmailIcon color="action" sx={{ fontSize: 20 }} />
                </Grid>
                <Grid item>{t("Email")}</Grid>
              </Grid>
            </FormLabel>
            <TextField
              fullWidth
              type="email"
              inputProps={{ maxLength: 256 }}
              {...register("companyEmail", { required: true })}
              error={!!errors.companyEmail}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            {errors.companyEmail && (
              <FormHelperText error>{errors.companyEmail.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <FormLabel>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <MarkEmailReadIcon color="action" sx={{ fontSize: 20 }} />
                </Grid>
                <Grid item>{t("PEC")}</Grid>
              </Grid>
            </FormLabel>
            <TextField
              fullWidth
              type="email"
              inputProps={{ maxLength: 256 }}
              {...register("companyPec")}
              error={!!errors.companyPec}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MarkEmailReadIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            {errors.companyPec && (
              <FormHelperText error>{errors.companyPec.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <FormLabel>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <BadgeIcon color="action" sx={{ fontSize: 20 }} />
                </Grid>
                <Grid item>{t("SDI")}</Grid>
              </Grid>
            </FormLabel>
            <TextField
              fullWidth
              inputProps={{ maxLength: 256 }}
              {...register("companySdi")}
              error={!!errors.companySdi}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            {errors.companySdi && (
              <FormHelperText error>{errors.companySdi.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <Button
            type="submit"
            fullWidth
            variant="contained"
          >
            {t("accountForm.update")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AccountForm;