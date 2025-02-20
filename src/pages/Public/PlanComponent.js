// pages/Public/PlanComponent.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button
} from '@mui/material';

const PlanComponent = (props) => {
  const [plan, setPlan] = useState({});
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    setPlan(props.plan);
    setFeatures(props.plan.features);
  }, [props]);

  return (
    <Grid item xs={12} sm={10} md={4}>
      <Card>
        <CardHeader
          title={
            <Typography>
              {plan.title}
            </Typography>
          }
          subheader={
            <Typography>
              {plan.price} {plan.currency}/mese
            </Typography>
          }
        />
        
        <CardContent>
          <List>
            {features.length > 0 ? (
              features.map((feature, index) => (
                <ListItem key={index}>
                  <ListItemText primary={feature} />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="Non ci sono feature per questo piano" />
              </ListItem>
            )}
          </List>
        </CardContent>

        <CardActions>
          <Button
            component={Link}
            to="/dashboard"
            fullWidth
          >
            Acquista
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PlanComponent;