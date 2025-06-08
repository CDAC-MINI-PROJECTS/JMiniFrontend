import { Suspense, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Home from "./pages/home";
import Explore from "./pages/explore";
import PostViewer from "./pages/post-viewer";
import Profile from "./pages/profile";
import Settings from "./components/settings";
import ProtectedRoute from "./layout/ProtectedRoute";
import AdminPanel from "./pages/admin-panel";
import NotFoundError from "./pages/404";
import { Loader, Loader2 } from "lucide-react";
import { useCurrentLoggedInUser } from "./hooks/useCurrentLoggedInUser";

function App() {
  const { user, isLoading } = useCurrentLoggedInUser();

  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4 h-[80vh]">
        <Loader className="animate-spin w-40 h-40" />
      </div>
    );
  }
  console.log("App component rendered", user);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        {/* public routes */}
        <Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        {/* Private only for admin role */}
        {/* {user?.role === "ROLE_ADMIN &&" && ( */}
        <Route>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
        {/* )} */}

        {/* private routes */}
        <Route>
          <Route
            index
            path="/"
            element={
              <ProtectedRoute>
                <Home user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />

          <Route
            path="/post/:id"
            element={
              <ProtectedRoute>
                <PostViewer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/:page"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundError />} />
          {/* <Route path='/search/:query' element={<Search/>}/> */}
          {/* <Route path='/favorites' element={<Favorite/>}/> */}
          {/* <Route path='/hashtag/:tag' element={<HashTag/>}/> */}
          {/* <Route path='/bookmarks' element={<Bookmarks/>}/> */}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
