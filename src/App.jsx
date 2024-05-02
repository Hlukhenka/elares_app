import { Route, Routes } from 'react-router-dom';
import SharedLayout from 'components/SharedLayout/SharedLayout';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { AppWrapper } from './App.styled';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUser } from './Redux/Auth/authThunks';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { useAuth } from './components/hooks/useAuth';
import { Dashboard } from './pages/Dasboard/Dashboard';

function App() {
  const { isRefreshing } = useAuth();
  const dispath = useDispatch();

  useEffect(() => {
    dispath(getCurrentUser());
  }, [dispath]);

  return (
    <AppWrapper>
      {isRefreshing ? (
        <p>loading...</p>
      ) : (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  redirectTo="/dashboard"
                  component={<RegisterPage />}
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  redirectTo="/dashboard"
                  component={<LoginPage />}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute redirectTo="/login" component={<Dashboard />} />
              }
            />

            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      )}

      {/* <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
            <Route path="dashboard" element={<DashboardList />} />
          </Route>

          
        </Route>
      </Routes> */}
    </AppWrapper>
  );
}
export default App;
