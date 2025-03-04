// pages/Dashboard/TrialComponent.jsx
import Box from "components/atoms/Box";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from 'contexts/AuthContext'; // Add this import
import { 
  Grid,
  Typography,
  Button
} from '@mui/material';

const TrialComponent = () => {
  const { user } = useAuth(); // Add this hook
  const { t } = useTranslation();

  const header = (
    <Typography component="h1">
      {user.email}
    </Typography>
  );

  const body = (
    <Grid container direction="column">
      <Typography>
        {t("trialComponent.youAreOnTrial")}
      </Typography>
      <Typography>
        {t("trialComponent.trialEndsAt")}{" "}
        {moment(user.account.trialPeriodEndsAt).format("DD/MM/YYYY")}
      </Typography>
      {user.role === "admin" && (
        <Button
          component={Link}
          to="/plan"
        >
          {t("trialComponent.goToPlans")}
        </Button>
      )}
    </Grid>
  );

  return (
    <Grid container>
      <Box
        color="white"
        image={<img src="/images/articoliesocial-2.svg" alt="Trial" />}
        header={header}
        body={body}
      />
    </Grid>
  );
};

export default TrialComponent;