// ./src/layouts/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Demo from './pages/Demo';
import Dashboard from './pages/Dashboard';
import DashboardTest from './pages/DashboardTest';
import Pro from './pages/Pro';
import { AuthPage } from './pages/Auth';
import { LogoutPage } from './pages/LogoutPage';
import { PrivateRoute } from './layouts/components/PrivateRoute';
import Layout from './layouts/App';
import AppOpen from './AppOpen';
import { DarkMode } from './contexts/DarkMode';
import { DashboardDrawerProtectedProvider } from './contexts/DashboardDrawerProtectedContext';
import { DashboardDrawerProvider } from './contexts/DashboardDrawerContext';
import { DrawerProvider } from './contexts/DrawerContext';
import { TvMode } from './contexts/TvMode';
import { CmsProvider } from './contexts/CmsContext';
import { AccordionProvider } from './contexts/AccordionContext';
import { AuthProvider } from './contexts/AuthContext';
import { SlideProvider } from './contexts/SlideContext';
import './App.css';
import './Fonts.css';

const RootApp = () => {
  return (
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
                        <Layout>
                          <Routes>
                            <Route
                              path="/Auth"
                              element={
                                <AppOpen>
                                  <AuthPage />
                                </AppOpen>
                              }
                            />
                            <Route
                              path="/Logout"
                              element={
                                <AppOpen>
                                  <LogoutPage />
                                </AppOpen>
                              }
                            />
                            <Route
                              path="/Demo"
                              element={
                                <AppOpen>
                                  <Demo />
                                </AppOpen>
                              }
                            />
                            <Route
                              path="/Dashboard"
                              element={
                                <AppOpen>
                                  <Dashboard />
                                </AppOpen>
                              }
                            />
                            <Route
                              path="/DashboardTest"
                              element={
                                <AppOpen>
                                  <PrivateRoute element={DashboardTest} />
                                </AppOpen>
                              }
                            />
                            <Route
                              path="/Pro"
                              element={
                                <AppOpen>
                                  <Pro />
                                </AppOpen>
                              }
                            />
                            <Route
                              path="/"
                              element={
                                <AppOpen>
                                  <Home />
                                </AppOpen>
                              }
                            />
                          </Routes>
                        </Layout>
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
  );
};

export default RootApp;