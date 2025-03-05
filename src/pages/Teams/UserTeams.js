// pages/Teams/UserTeams.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from 'contexts/AuthContext'; // Add this import
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';

export default function UserTeams() {
  const { user } = useAuth(); // Add this hook
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!user.teams || user.teams.length === 0) {
    return (
      <Container>
        <Typography component="h1">
          {t("teamsPage.teams")}
        </Typography>
        <Paper>
          <Box>
            <Typography component="h4">
              {t("teamsPage.userWithNoTeams")}
            </Typography>
          </Box>
        </Paper>
      </Container>
    );
  }

  const renderMobileView = () => (
    <>
      {user.teams.map((team, i) => (
        <TableRow key={`${team.code}-${i}`}>
          <TableCell>
            <Box>
              <Typography>#</Typography>
              <Typography>{i + 1}</Typography>
            </Box>
            <Box>
              <Typography>{t("teamsPage.name")}</Typography>
              <Typography>{team.name}</Typography>
            </Box>
            <Box>
              <Typography>Code</Typography>
              <Typography>{team.code}</Typography>
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  const renderDesktopView = () => (
    <>
      {user.teams.map((team, i) => (
        <TableRow key={`${team.code}-${i}`}>
          <TableCell>{i + 1}</TableCell>
          <TableCell>{team.name}</TableCell>
          <TableCell>{team.code}</TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <Container>
      <Typography component="h1">
        {t("teamsPage.teams")}
      </Typography>
      
      <Paper>
        <TableContainer>
          <Table>
            {!isMobile && (
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>{t("teamsPage.name")}</TableCell>
                  <TableCell>Code</TableCell>
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {isMobile ? renderMobileView() : renderDesktopView()}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}