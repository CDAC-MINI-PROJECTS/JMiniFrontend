import { Routes, Route, Navigate, useLocation } from "react-router"
import Layout from "./layout/Layout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import ProtectedRoute from "./layout/ProtectedRoute"

function App() {
  const location = useLocation();
  console.log();
  return (
    <Routes>
      <Route path="/" element={<Layout isExpenseSplitDashboard={location.pathname != '/dashboard'}/>}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
