// ./src/layouts/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Tags from './pages/Tags';
import DashboardTest from './pages/DashboardTest';
import PopPage from './pages/PopPage';
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
                                  <PopPage pageName="Demo" />
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
                                  <PopPage pageName="Pro" />
                                </AppOpen>
                              }
                            />
                            <Route
                              path="/Tags"
                              element={
                                <AppOpen>
                                  <Tags />
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