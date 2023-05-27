import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Divider,
  Tooltip,
} from "@mui/material";
import { DarkMode, LightMode, Help, Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HomeIcon from "@mui/icons-material/Home";
import SearchComponent from "components/SearchComponent";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const userId = useSelector((state) => state.user._id);
  const user = useSelector((state) => state.user);

  const theme = useTheme();
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary;
  const alt = theme.palette.background.alt;
  const userName = user.userName;

  const admin = useSelector((state) => state.admin);

  const id = useSelector((state) => state.user._id);

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          fontFamily="Rubik sans-serif"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          SociOut
        </Typography>
        {isNonMobileScreens && (
          <SearchComponent />
          // <ComboBox/>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          {/* Home page navigation */}
          <Tooltip title="Home Page">
            <IconButton onClick={() => navigate(`/home`)}>
              {theme.palette.mode === "dark" ? (
                <HomeIcon sx={{ fontSize: "25px" }} />
              ) : (
                <HomeIcon sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
          </Tooltip>

          {/* Mode changing button  */}
          <Tooltip title="Mode">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
          </Tooltip>

          {/* Profile navigation button */}
          <Tooltip title="My Profile">
            <IconButton>
              {theme.palette.mode === "dark" ? (
                <PersonIcon
                  sx={{ fontSize: "25px" }}
                  onClick={() => navigate(`/profile/${userId}`)}
                />
              ) : (
                <PersonIcon
                  sx={{ color: dark, fontSize: "25px" }}
                  onClick={() => navigate(`/profile/${userId}`)}
                />
              )}
            </IconButton>
          </Tooltip>

          {/* contact page navigation */}
          <Tooltip title="Contact Page">
            <IconButton onClick={() => navigate(`/contact`)}>
              {theme.palette.mode === "dark" ? (
                <Help sx={{ fontSize: "25px" }} />
              ) : (
                <Help sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
          </Tooltip>

          {admin && (
            <Tooltip title="Admin Page">
              <IconButton onClick={() => navigate(`/admin`)}>
                {theme.palette.mode === "dark" ? (
                  <AdminPanelSettingsIcon sx={{ fontSize: "25px" }} />
                ) : (
                  <AdminPanelSettingsIcon
                    sx={{ color: dark, fontSize: "25px" }}
                  />
                )}
              </IconButton>
            </Tooltip>
          )}

          <FormControl value={userName}>
            <Select value={userName} input={<InputBase />}>
              <Typography
                value={userName}
                style={{ display: "none", marginTop: "3rem" }}
              >
                {userName}
              </Typography>

              <FlexBetween>
                <MenuItem
                  sx={{ width: "100%" }}
                  onClick={() => navigate(`/profile/${userId}`)}
                >
                  <PersonOutlineOutlinedIcon
                    style={{ margin: "1rem 1rem 1rem 0" }}
                  />
                  My Profile
                </MenuItem>
              </FlexBetween>

              <FlexBetween>
                <MenuItem
                  sx={{ width: "100%" }}
                  onClick={() => navigate(`/${id}/updateUser`)}
                >
                  <EditOutlinedIcon style={{ margin: "1rem 1rem 1rem 0" }} />{" "}
                  Edit Profile
                </MenuItem>
              </FlexBetween>

              <FlexBetween>
                <MenuItem
                  sx={{ width: "100%" }}
                  onClick={() => navigate(`/users/${id}/deleteUser`)}
                >
                  <DeleteOutlinedIcon style={{ margin: "1rem 1rem 1rem 0" }} />{" "}
                  Delete Account
                </MenuItem>
              </FlexBetween>

              <Divider />

              <FlexBetween>
                <MenuItem
                  sx={{ width: "100%" }}
                  onClick={() => dispatch(setLogout())}
                >
                  <LogoutOutlinedIcon style={{ margin: "1rem 1rem 1rem 0" }} />{" "}
                  Log Out{" "}
                </MenuItem>
              </FlexBetween>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            {admin && (
              <IconButton onClick={() => navigate(`/admin`)}>
                {theme.palette.mode === "dark" ? (
                  <AdminPanelSettingsIcon sx={{ fontSize: "25px" }} />
                ) : (
                  <AdminPanelSettingsIcon
                    sx={{ color: dark, fontSize: "25px" }}
                  />
                )}
              </IconButton>
            )}

            <IconButton onClick={() => navigate(`/home`)}>
              {theme.palette.mode === "dark" ? (
                <HomeIcon sx={{ fontSize: "25px" }} />
              ) : (
                <HomeIcon sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>

            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
              <PersonIcon
                sx={{ fontSize: "25px" }}
                onClick={() => navigate(`/profile/${userId}`)}
              />
            </IconButton>
            <IconButton onClick={() => navigate(`/contact`)}>
              {theme.palette.mode === "dark" ? (
                <Help sx={{ fontSize: "25px" }} />
              ) : (
                <Help sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <FormControl value={userName}>
              <Select value={userName} input={<InputBase />}>
                <Typography
                  value={userName}
                  style={{ display: "none", marginTop: "3rem" }}
                >
                  {userName}
                </Typography>

                <FlexBetween>
                  <MenuItem
                    sx={{ width: "100%" }}
                    onClick={() => navigate(`/profile/${userId}`)}
                  >
                    <PersonOutlineOutlinedIcon style={{ margin: "1rem" }} />
                    My Profile
                  </MenuItem>
                </FlexBetween>

                <FlexBetween>
                  <MenuItem
                    sx={{ width: "100%" }}
                    onClick={() => navigate(`/${id}/updateUser`)}
                  >
                    <EditOutlinedIcon style={{ margin: "1rem" }} /> Edit Profile
                  </MenuItem>
                </FlexBetween>

                <FlexBetween>
                  <MenuItem
                    sx={{ width: "100%" }}
                    onClick={() => dispatch(setLogout())}
                  >
                    <LogoutOutlinedIcon style={{ margin: "1rem" }} /> Log Out{" "}
                  </MenuItem>
                </FlexBetween>

                <FlexBetween>
                  <MenuItem
                    sx={{ width: "100%" }}
                    onClick={() => navigate(`/users/${id}/deleteUser`)}
                  >
                    <DeleteOutlinedIcon style={{ margin: "1rem" }} /> Delete
                    Account
                  </MenuItem>
                </FlexBetween>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
