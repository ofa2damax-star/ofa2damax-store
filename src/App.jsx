import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import BottomNav from '@/components/BottomNav';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ProtectedRoute from '@/components/ProtectedRoute';
import Home from '@/pages/Home';
import HygieneProducts from '@/pages/HygieneProducts';
import ClothesProducts from '@/pages/ClothesProducts';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import MyProfile from '@/pages/MyProfile';
import FeminineHygiene from '@/pages/FeminineHygiene';
import SchoolClothes from '@/pages/SchoolClothes';
import CommandCenter from '@/pages/CommandCenter';
import SportsGear from '@/pages/SportsGear';

// Tracks which "root" tab each path belongs to for slide direction
const TAB_ROOTS = ["/", "/my-info", "/command-center"];

function getTabIndex(pathname) {
  if (pathname.startsWith("/command-center")) return 2;
  if (pathname.startsWith("/my-info")) return 1;
  return 0;
}

const AnimatedRoutes = ({ children }) => {
  const location = useLocation();
  const tabIdx = getTabIndex(location.pathname);
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeInOut" }}
        style={{ position: "relative", width: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <>
      <AnimatedRoutes>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
            <Route path="/" element={<Home />} />
            <Route path="/hygiene" element={<HygieneProducts />} />
            <Route path="/clothes" element={<ClothesProducts />} />
            <Route path="/feminine-hygiene" element={<FeminineHygiene />} />
            <Route path="/school-clothes" element={<SchoolClothes />} />
            <Route path="/sports-gear" element={<SportsGear />} />
            <Route path="/my-info" element={<MyProfile />} />
            <Route path="/command-center" element={<CommandCenter />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AnimatedRoutes>
      <BottomNav />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App