// pages/Dashboard/Box.jsx
import {
  Paper,
  Grid,
  Box as MuiBox
} from '@mui/material';

const Box = ({ header, body, color, image }) => {
  if (color) {
    return (
      <Paper>
        {image ? (
          <Grid container>
            <Grid item sm={6}>
              <MuiBox>
                <MuiBox>
                  {header}
                </MuiBox>
                <MuiBox>
                  {body}
                </MuiBox>
              </MuiBox>
            </Grid>
            <Grid item sm={6}>
              {image}
            </Grid>
          </Grid>
        ) : (
          <MuiBox>
            <MuiBox>
              {header}
            </MuiBox>
            <MuiBox>
              {body}
            </MuiBox>
          </MuiBox>
        )}
      </Paper>
    );
  }

  return (
    <Paper>
      <MuiBox>
        {header}
      </MuiBox>
      <MuiBox>
        {body}
      </MuiBox>
    </Paper>
  );
};

export default Box;