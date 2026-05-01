import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const SingleBlog = lazy(() => import('./pages/SingleBlog'));
const Calculator = lazy(() => import('./pages/Calculator'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

const Login = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Posts = lazy(() => import('./pages/admin/Posts'));
const PostEditor = lazy(() => import('./pages/admin/PostEditor'));
const Leads = lazy(() => import('./pages/admin/Leads'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-solar-200 border-t-solar-600 rounded-full animate-spin" />
  </div>
);

const PublicLayout = ({ children }) => {
  const { pathname } = useLocation();
  // Hide Navbar/Footer on admin pages
  if (pathname.startsWith('/admin')) return children;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

const App = () => (
  <AuthProvider>
    <Suspense fallback={<PageLoader />}>
      <PublicLayout>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<SingleBlog />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
          <Route path="/admin/posts/new" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
          <Route path="/admin/posts/edit/:id" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
          <Route path="/admin/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <span className="text-6xl">☀</span>
                <h1 className="font-heading font-bold text-3xl text-dark-800">Page Not Found</h1>
                <a href="/" className="btn-primary">Back to Home</a>
              </div>
            }
          />
        </Routes>
      </PublicLayout>
    </Suspense>
  </AuthProvider>
);

export default App;
