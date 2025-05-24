import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePages";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageBarPage from "./pages/ManageBarPage";
import SearchPage from "./pages/SearchPage";
import BarDetailPage from "./pages/BarDetailPage";
import ReservationConfirmationPage from "./pages/ReservationConfirmationPage";
import MyReservationsPage from "./pages/MyReservationsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/detail/:id"
        element={
          <Layout>
            <BarDetailPage />
          </Layout>
        }
      />
      <Route
        path="/reservation-confirmation"
        element={
          <Layout>
            <ReservationConfirmationPage />
          </Layout>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />

        <Route
          path="/manage-bar"
          element={
            <Layout>
              <ManageBarPage />
            </Layout>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <Layout>
              <BarDetailPage />
            </Layout>
          }
        />
        <Route
          path="/reservations"
          element={
            <Layout>
              <MyReservationsPage />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
