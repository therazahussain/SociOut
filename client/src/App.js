import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import EditProfileForm from "scenes/widgets/EditProfileForm";
import DeleteUser from "components/DeleteUser";
import Contact from "scenes/contactPage";
import Admin from "scenes/admin/Admin";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const admin = useSelector((state)=> state.admin);
  const block = useSelector((state)=> state.block);

  console.log(block)

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* This route will insure that if the user is logged in and closed the tab he will not be sent to sign in or sign up page for authentication he will directly sent to the home page */}
            <Route
              path="/"
              element={!isAuth ? <LoginPage /> : <Navigate to="/home" />}
            />
            <Route
              path="/admin"
              element={(isAuth && admin) ?(isAuth && block) ? <Contact/> :  <Admin /> : <Navigate to="/home" />}
            />
            <Route
              path="/home"
              element={isAuth ? (isAuth && block) ? <Contact/> : <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/contact"
              element={isAuth ? (isAuth && block) ? <Contact/> : <Contact /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? (isAuth && block) ? <Contact/> : <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/:id/updateUser"
              element={isAuth ? (isAuth && block) ? <Contact/> : <EditProfileForm /> : <Navigate to="/" />}
            />
            <Route
              path="/users/:id/deleteUser"
              element={isAuth ? (isAuth && block) ? <Contact/> :<DeleteUser /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
