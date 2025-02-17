// ./src/ApplicationRouter.jsx
import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from 'pages/Public/Home';
import DashboardTest from 'pages/Dashboard/DashboardTest';
import ActivateAccountPage from 'pages/Authentication/ActivateAccountPage';
import ForgotPasswordPage from 'pages/Authentication/ForgotPasswordPage';
import LoginPage from 'pages/Authentication/LoginPage';
import RegisterPage from 'pages/Authentication/RegisterPage';
import ResendActivationPage from 'pages/Authentication/ResendActivationPage';
import ResetPasswordPage from 'pages/Authentication/ResetPasswordPage';
import DashboardSwitcher from 'pages/Dashboard/DashboardSwitcher';
import PlanPage from 'pages/Plan/PlanPage';
import SubscribePlanPage from 'pages/Plan/SubscribePlanPage';
import IndexPage from 'pages/Public/IndexPage';
import IndexTeamsPage from 'pages/Teams/IndexTeamsPage';
import TeamPage from 'pages/Teams/TeamPage';
import UserTeams from 'pages/Teams/UserTeams';
import AddCardPage from 'pages/User/AddCardPage';
import EditAccountPage from 'pages/User/EditAccountPage';
import EditUserPage from 'pages/User/EditUserPage';
import CreateUsersPage from 'pages/Users/CreateUsersPage';
import EditUser from 'pages/Users/EditUser';
import EditUsersPage from 'pages/Users/EditUsersPage';
import IndexUsersPage from 'pages/Users/IndexUsersPage';
import { PrivateRoute } from 'components/PrivateRoute';
import { PrivateActiveRoute } from 'components/PrivateActiveRoute';
import { OnlyPublicRoute } from 'components/OnlyPublicRoute';
import AuthenticationLayout from 'layouts/Authentication/AuthenticationLayout';
import PrivateLayout from 'layouts/Private/PrivateLayout';
import PublicLayout from 'layouts/Public/PublicLayout';
import SnackbarOpen from './SnackbarOpen';
import { DarkMode } from 'contexts/DarkMode';
import { DashboardDrawerProtectedProvider } from 'contexts/DashboardDrawerProtectedContext';
import { DashboardDrawerProvider } from 'contexts/DashboardDrawerContext';
import { DrawerProvider } from 'contexts/DrawerContext';
import { TvMode } from 'contexts/TvMode';
import { CmsProvider } from 'contexts/CmsContext';
import { AccordionProvider } from 'contexts/AccordionContext';
import { AuthProvider } from 'contexts/AuthContext';
import { SlideProvider } from 'contexts/SlideContext';
import { RolesProvider } from 'contexts/RolesContext';
import { PlanTypeProvider } from 'contexts/PlanTypeContext';
import './App.css';
import './Fonts.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const ApplicationRouter = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <TvMode>
          <CmsProvider>
            <AuthProvider>
              <SlideProvider>
                <AccordionProvider>
                  <DashboardDrawerProtectedProvider>
                    <DashboardDrawerProvider>
                      <DrawerProvider>
                        <DarkMode>
                          <Router>
                            <Routes>
                              <Route
                                path="/"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <PublicLayout>
                                        <SnackbarOpen>
                                          <Home />
                                        </SnackbarOpen>
                                      </PublicLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/IndexPage"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <PublicLayout>
                                        <SnackbarOpen>
                                          <IndexPage />
                                        </SnackbarOpen>
                                      </PublicLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/DashboardTest"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <PublicLayout>
                                        <SnackbarOpen>
                                          <DashboardTest />
                                        </SnackbarOpen>
                                      </PublicLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/auth/login"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <AuthenticationLayout>
                                        <SnackbarOpen>
                                          <OnlyPublicRoute element={LoginPage} />
                                        </SnackbarOpen>
                                      </AuthenticationLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/auth/forgot-password"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <AuthenticationLayout>
                                        <SnackbarOpen>
                                          <OnlyPublicRoute element={ForgotPasswordPage} />
                                        </SnackbarOpen>
                                      </AuthenticationLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/auth/resend-activation"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <AuthenticationLayout>
                                        <SnackbarOpen>
                                          <OnlyPublicRoute element={ResendActivationPage} />
                                        </SnackbarOpen>
                                      </AuthenticationLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/auth/reset-password/:email"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <AuthenticationLayout>
                                        <SnackbarOpen>
                                          <OnlyPublicRoute element={ResetPasswordPage} />
                                        </SnackbarOpen>
                                      </AuthenticationLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/auth/activate/:email"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <AuthenticationLayout>
                                        <SnackbarOpen>
                                          <OnlyPublicRoute element={ActivateAccountPage} />
                                        </SnackbarOpen>
                                      </AuthenticationLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/auth/register"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <AuthenticationLayout>
                                        <SnackbarOpen>
                                          <OnlyPublicRoute element={RegisterPage} />
                                        </SnackbarOpen>
                                      </AuthenticationLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/dashboard"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <PrivateLayout>
                                        <SnackbarOpen>
                                          <PrivateActiveRoute element={DashboardSwitcher} />
                                        </SnackbarOpen>
                                      </PrivateLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/teams"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <PrivateLayout>
                                        <SnackbarOpen>
                                          <PrivateActiveRoute element={IndexTeamsPage} />
                                        </SnackbarOpen>
                                      </PrivateLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/teams/:teamId"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <PrivateLayout>
                                        <SnackbarOpen>
                                          <PrivateActiveRoute element={TeamPage} />
                                        </SnackbarOpen>
                                      </PrivateLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/user-teams"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <PrivateLayout>
                                        <SnackbarOpen>
                                          <PrivateActiveRoute element={UserTeams} />
                                        </SnackbarOpen>
                                      </PrivateLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/card/add"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <PrivateLayout>
                                        <SnackbarOpen>
                                          <PrivateActiveRoute element={AddCardPage} />
                                        </SnackbarOpen>
                                      </PrivateLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/plan/:planId/subscribe"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <PrivateLayout>
                                        <SnackbarOpen>
                                          <PrivateRoute element={SubscribePlanPage} />
                                        </SnackbarOpen>
                                      </PrivateLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/plan"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <PrivateLayout>
                                        <SnackbarOpen>
                                          <PrivateRoute element={PlanPage} />
                                        </SnackbarOpen>
                                      </PrivateLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/user/edit"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <PrivateLayout>
                                        <SnackbarOpen>
                                          <PrivateRoute element={EditUserPage} />
                                        </SnackbarOpen>
                                      </PrivateLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/account/edit"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <PrivateLayout>
                                        <SnackbarOpen>
                                          <PrivateRoute element={EditAccountPage} />
                                        </SnackbarOpen>
                                      </PrivateLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/users"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <PrivateLayout>
                                        <SnackbarOpen>
                                          <PrivateRoute element={IndexUsersPage} />
                                        </SnackbarOpen>
                                      </PrivateLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/create-user"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <PrivateLayout>
                                        <SnackbarOpen>
                                          <PrivateRoute element={CreateUsersPage} />
                                        </SnackbarOpen>
                                      </PrivateLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/edit-user/:userId"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <PrivateLayout>
                                        <SnackbarOpen>
                                          <PrivateRoute element={EditUsersPage} />
                                        </SnackbarOpen>
                                      </PrivateLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                              <Route
                                path="/user/:userId"
                                element={
                                  <RolesProvider>
                                    <PlanTypeProvider>
                                      <PrivateLayout>
                                        <SnackbarOpen>
                                          <PrivateRoute element={EditUser} />
                                        </SnackbarOpen>
                                      </PrivateLayout>
                                    </PlanTypeProvider>
                                  </RolesProvider>
                                }
                              />
                            </Routes>
                          </Router>
                        </DarkMode>
                      </DrawerProvider>
                    </DashboardDrawerProvider>
                  </DashboardDrawerProtectedProvider>
                </AccordionProvider>
              </SlideProvider>
            </AuthProvider>
          </CmsProvider>
        </TvMode>
      </QueryClientProvider>
  );
};

export default ApplicationRouter;