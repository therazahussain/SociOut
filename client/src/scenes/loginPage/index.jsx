import { Box, useTheme, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const activePage = useSelector((state)=> state.activePage);

  return (
    <Box>
      <FlexBetween>
      <Box
        width={isNonMobileScreens ? "40%" : "93%"}
        p="2rem"
        m="4rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        {/* <Form /> */}
        {activePage === "signUp" && <RegisterForm />}
        {activePage === "signIn" && <LoginForm/>}
      </Box>
      </FlexBetween>
    </Box>
  );
};

export default LoginPage;
