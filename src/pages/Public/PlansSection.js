// pages/Public/PlansSection.jsx
import { Plans } from "api/queries";
import Loader from "layouts/Loader";
import { useQuery } from "react-query";
import PlanComponent from "./PlanComponent";
import {
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';

const PlansSection = () => {
  const { isLoading, data } = useQuery("Plans", Plans, {
    retry: false,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box component="section" id="prezzi">
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={11} md={10} lg={8} xl={6}>
            <Box textAlign="center">
              <Typography component="h2">
                Due piani social e blog completi
              </Typography>
              <Typography>
                Il nostro servizio è semplice, efficace ed economico. Scegli tra
                due piani: quello Base è pensato per le piccole aziende, negozi
                e attività che hanno bisogno di crescere. Quello Pro è adatto
                alle medie e grandi imprese che vogliono avere una presenza
                online importante.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid 
          container 
          justifyContent="center"
          alignItems="flex-start"
        >
          {data && data.data.plans.length > 0 ? (
            data.data.plans.map((plan) => (
              <PlanComponent key={plan.id} plan={plan} />
            ))
          ) : (
            <Typography>Non ci sono piani disponibili</Typography>
          )}
          
          <Grid item xs={12}>
            <List>
              <ListItem>
                <ListItemText 
                  primary={
                    <Typography variant="body2" component="i">
                      per "sponsorizzazioni sui social" si intende la
                      sponsorizzazione diretta di post pubblicati.
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary={
                    <Typography variant="body2" component="i">
                      per ideazione linea grafica su Instagram (IG) si intende la
                      linea grafica coerente da seguire nelle varie pubblicazioni
                      (elemento base per gestire professionalmente Instagram essendo
                      un social visual)
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Grid container justifyContent="center">
          <Grid item xs={12} sm={11} md={8} lg={6} xl={5}>
            <Box textAlign="center">
              <Typography component="h4">
                Rinnovi e disdette
              </Typography>
              <Typography>
                I pacchetti sono rinnovabili mensilmente, disdici il servizio
                quando vuoi senza costi aggiuntivi.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PlansSection;