// ./src/ApplicationRouter.jsx
import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from 'pages/Public/HomePage';
import FeaturesPage from 'pages/Public/FeaturesPage';
import DashboardTest from 'pages/Dashboard/DashboardTest';
import ActivateAccountPage from 'pages/Auth/ActivateAccountPage';
import ForgotPasswordPage from 'pages/Auth/ForgotPasswordPage';
import LoginPage from 'pages/Auth/LoginPage';
import RegisterPage from 'pages/Auth/RegisterPage';
import ResendActivationPage from 'pages/Auth/ResendActivationPage';
import ResetPasswordPage from 'pages/Auth/ResetPasswordPage';
import DashboardSwitcher from 'pages/Dashboard/DashboardSwitcher';
import PlanPage from 'pages/Plan/PlanPage';
import SubscribePlanPage from 'pages/Plan/SubscribePlanPage';
import IndexTeamsPage from 'pages/Teams/IndexTeamsPage';
import TeamPage from 'pages/Teams/TeamPage';
import UserTeams from 'pages/Teams/UserTeams';
import CardAddPage from 'pages/User/CardAddPage';
import EditAccountPage from 'pages/User/EditAccountPage';
import EditUserPage from 'pages/User/EditUserPage';
import CreateUsersPage from 'pages/Users/CreateUsersPage';
import EditUser from 'pages/Users/EditUser';
import EditUsersPage from 'pages/Users/EditUsersPage';
import IndexUsersPage from 'pages/Users/IndexUsersPage';
import GettingStartedPage from 'pages/Public/GettingStartedPage';
import OverviewPage from 'pages/Public/OverviewPage';
import OverviewAltPage from 'pages/Public/OverviewAltPage';
import SubscriptionsPage from 'pages/Public/SubscriptionsPage';
import RoutingLibrariesPage from 'pages/Public/RoutingLibrariesPage';
import PlansPage from 'pages/Public/PlansPage';
import WebhooksUsagePage from 'pages/Public/WebhooksUsagePage';
import SubscribersPage from 'pages/Public/SubscribersPage';
import AddCardPage from 'pages/Public/AddCardPage';
import AdminPage from 'pages/Public/AdminPage';
import CallbacksPage from 'pages/Public/CallbacksPage';
import StripeSessionsPage from 'pages/Public/StripeSessionsPage';
import TemplatesPage from 'pages/Public/TemplatesPage';
import ExperimentalApisPage from 'pages/Public/ExperimentalApisPage';
import ApiEndpointsPage from 'pages/Public/ApiEndpointsPage';
import WebhooksPage from 'pages/Public/WebhooksPage';
import CardsPage from 'pages/Public/CardsPage';
import PaymentsPage from 'pages/Public/PaymentsPage';
import TrialsPage from 'pages/Public/TrialsPage';
import UsersPage from 'pages/Public/UsersPage';
import IntegrationsPage from 'pages/Public/IntegrationsPage';
import TeamsPage from 'pages/Public/TeamsPage';
import DashboardPage from 'pages/Public/DashboardPage';
import DiscoverMorePage from 'pages/Public/DiscoverMorePage';
import IndexLoginPage from 'pages/Public/IndexLoginPage';
import { PrivateRoute } from 'routes/PrivateRoute';
import { PrivateActiveRoute } from 'routes/PrivateActiveRoute';
import { OnlyPublicRoute } from 'routes/OnlyPublicRoute';
import AuthLayout from 'layouts/AuthLayout';
import PrivateLayout from 'layouts/PrivateLayout';
import PublicLayout from 'layouts/PublicLayout';
import SnackbarOpen from './SnackbarOpen';
import { DarkMode } from 'contexts/DarkMode';
import { ScrolledProvider } from 'contexts/ScrolledContext';
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
import { CollapseProvider } from 'contexts/CollapseContext';
import { YiMode } from 'contexts/YiMode';
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
        <YiMode>
          <CmsProvider>
            <AuthProvider>
              <SlideProvider>
                <AccordionProvider>
                  <CollapseProvider>
                    <ScrolledProvider>
                      <DashboardDrawerProtectedProvider>
                        <DashboardDrawerProvider>
                          <DrawerProvider>
                            <DarkMode>
                              <Router>
                                <Routes>
                                  <Route
                                    path="/"
                                    element={
                                      <HomePage />
                                    }
                                  />
                                  <Route
                                    path="/features-page"
                                    element={
                                      <RolesProvider>
                                        <PlanTypeProvider>
                                          <PublicLayout>
                                            <SnackbarOpen>
                                              <FeaturesPage />
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
                                          <AuthLayout>
                                            <SnackbarOpen>
                                              <OnlyPublicRoute element={LoginPage} />
                                            </SnackbarOpen>
                                          </AuthLayout>
                                        </PlanTypeProvider>
                                      </RolesProvider>
                                    }
                                  />
                                  <Route
                                    path="/auth/forgot-password"
                                    element={
                                      <RolesProvider>
                                        <PlanTypeProvider>
                                          <AuthLayout>
                                            <SnackbarOpen>
                                              <OnlyPublicRoute element={ForgotPasswordPage} />
                                            </SnackbarOpen>
                                          </AuthLayout>
                                        </PlanTypeProvider>
                                      </RolesProvider>
                                    }
                                  />
                                  <Route
                                    path="/auth/resend-activation"
                                    element={
                                      <RolesProvider>
                                        <PlanTypeProvider>
                                          <AuthLayout>
                                            <SnackbarOpen>
                                              <OnlyPublicRoute element={ResendActivationPage} />
                                            </SnackbarOpen>
                                          </AuthLayout>
                                        </PlanTypeProvider>
                                      </RolesProvider>
                                    }
                                  />
                                  <Route
                                    path="/auth/reset-password/:email"
                                    element={
                                      <RolesProvider>
                                        <PlanTypeProvider>
                                          <AuthLayout>
                                            <SnackbarOpen>
                                              <OnlyPublicRoute element={ResetPasswordPage} />
                                            </SnackbarOpen>
                                          </AuthLayout>
                                        </PlanTypeProvider>
                                      </RolesProvider>
                                    }
                                  />
                                  <Route
                                    path="/auth/activate/:email"
                                    element={
                                      <RolesProvider>
                                        <PlanTypeProvider>
                                          <AuthLayout>
                                            <SnackbarOpen>
                                              <OnlyPublicRoute element={ActivateAccountPage} />
                                            </SnackbarOpen>
                                          </AuthLayout>
                                        </PlanTypeProvider>
                                      </RolesProvider>
                                    }
                                  />
                                  <Route
                                    path="/auth/register"
                                    element={
                                      <RolesProvider>
                                        <PlanTypeProvider>
                                          <AuthLayout>
                                            <SnackbarOpen>
                                              <OnlyPublicRoute element={RegisterPage} />
                                            </SnackbarOpen>
                                          </AuthLayout>
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
                                              <PrivateActiveRoute element={CardAddPage} />
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
                                <Route
                                  path="/getting-started"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <GettingStartedPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/overview"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <OverviewPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/subscriptions"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <SubscriptionsPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/routing-libraries"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <RoutingLibrariesPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/plans"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <PlansPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/webhooks-usage"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <WebhooksUsagePage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/add-card"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <AddCardPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/overview-alt"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <OverviewAltPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/subscribers"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <SubscribersPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/admin"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <AdminPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/callbacks"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <CallbacksPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/stripe-sessions"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <StripeSessionsPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/templates"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <TemplatesPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/experimental-apis"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <ExperimentalApisPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/api-endpoints"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <ApiEndpointsPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/webhooks"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <WebhooksPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/cards"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <CardsPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/payments"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <PaymentsPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/trials"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <TrialsPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/users-page"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <UsersPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/integrations"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <IntegrationsPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/teams-page"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <TeamsPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/dashboard-page"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <DashboardPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/discover-more"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <DiscoverMorePage />
                                          </SnackbarOpen>
                                        </PublicLayout>
                                      </PlanTypeProvider>
                                    </RolesProvider>
                                  }
                                />
                                <Route
                                  path="/login-page"
                                  element={
                                    <RolesProvider>
                                      <PlanTypeProvider>
                                        <PublicLayout>
                                          <SnackbarOpen>
                                            <IndexLoginPage />
                                          </SnackbarOpen>
                                        </PublicLayout>
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
                    </ScrolledProvider>
                  </CollapseProvider>
                </AccordionProvider>
              </SlideProvider>
            </AuthProvider>
          </CmsProvider>
        </YiMode>
      </TvMode>
    </QueryClientProvider>
  );
};

export default ApplicationRouter;