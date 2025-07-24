
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
import AdminDashboardLayout from "./pages/admin/AdminDashboardLayout";
import AdminDashboardHome from "./pages/admin/AdminDashboardHome";
import AdminBarOwnersList from "./pages/admin/AdminBarOwnersList";
import AdminBarOwnerForm from "./pages/admin/AdminBarOwnerForm";
import AdminBarOwnerBars from "./pages/admin/AdminBarOwnerBars";
import AdminUsersList from "./pages/admin/AdminUsersList";
import AdminUserForm from "./pages/admin/AdminUserForm";
import { DrinkMenuPage } from "./pages/DrinkMenuPage";
import { useAuth0 } from "@auth0/auth0-react";
import { FavoritesPage } from "./pages/FavoritesPage";
import CategoryPage from "./pages/CategoryPage";

function RoleDebug() {
  const { user, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    console.log("User object:", user);
    console.log("Role claim:", user?.["https://bars-app/role"]);
  }

  return null;
}

const AppRoutes = () => {
  return (
    <>
      <RoleDebug />
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
          path="/category/:category"
          element={
            <Layout showHero={false}>
              <CategoryPage />
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
          path="/bar/:barId/menu"
          element={
            <Layout>
              <DrinkMenuPage />
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
          <Route
            path="/favorites"
            element={
              <Layout>
                <FavoritesPage />
              </Layout>
            }
          />
        </Route>


               {/* Admin Routes */}
        <Route element={<ProtectedRoute roleRequired="admin" />}>
          <Route path="/admin" element={<AdminDashboardLayout />}>
            <Route index element={<AdminDashboardHome />} />
            <Route path="bar-owners" element={<AdminBarOwnersList />} />
            <Route path="bar-owners/new" element={<AdminBarOwnerForm />} />
            <Route path="bar-owners/:id/edit" element={<AdminBarOwnerForm />} />
            <Route path="bar-owners/:id/bars" element={<AdminBarOwnerBars />} />
            <Route path="users" element={<AdminUsersList />} />
            <Route path="/admin/users/new" element={<AdminUserForm />} />
            <Route path="/admin/users/:id/edit" element={<AdminUserForm />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AppRoutes;