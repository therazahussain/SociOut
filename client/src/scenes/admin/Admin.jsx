import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import React from "react";
import Navbar from "scenes/navbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonIcon from '@mui/icons-material/Person';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const Admin = () => {
  const theme = useTheme();
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary;
  const alt = theme.palette.background.alt;
  const neutralLight = theme.palette.neutral.light;

  return (
    <>
      <Navbar />
      <Box display="flex" width="100%">
        <FlexBetween
          backgroundColor={alt}
          sx={{
            width: "25%",
            height: "85.7vh",
            flexDirection: "column",
            padding: "30px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            display="flex"
            gap={1}
            width="100%"
            backgroundColor={neutralLight}
            justifyContent="center"
            p={1}
            sx={{
              borderRadius: "5px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            <DashboardIcon sx={{ fontSize: "30px" }}></DashboardIcon>
            <Typography pb="5px" variant="button" sx={{ fontSize: "20px" }}>
              DASHBOARD
            </Typography>
          </Box>

          <Box
            height="80%"
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="center"
            backgroundColor={neutralLight}
            width="100%"
            gap={2}
            p={1}
            sx={{
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <Typography pb="5px" variant="button" sx={{ fontSize: "20px" }}>
              Admin Control
            </Typography>
            <Box
              display="flex"
              gap={1}
              width="100%"
              backgroundColor="#757474"
              p={1}
              justifyContent="center"
              sx={{
                borderRadius: "5px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              <SupervisorAccountIcon></SupervisorAccountIcon>
              <Typography pb="5px" variant="button" sx={{ fontSize: "16px" }}>
                Admin Managment
              </Typography>
            </Box>
            <Box
              display="flex"
              gap={1}
              width="100%"
              backgroundColor="#757474"
              p={1}
              justifyContent="center"
              sx={{
                borderRadius: "5px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              <PersonIcon></PersonIcon>
              <Typography pb="5px" variant="button" sx={{ fontSize: "16px" }}>
                USER Managment
              </Typography>
            </Box>
            <Box
              display="flex"
              gap={1}
              width="100%"
              backgroundColor="#757474"
              p={1}
              justifyContent="center"
              sx={{
                borderRadius: "5px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              <InsertPhotoIcon></InsertPhotoIcon>
              <Typography pb="5px" variant="button" sx={{ fontSize: "16px" }}>
                POST Managment
              </Typography>
            </Box>
          </Box>
        </FlexBetween>
        <FlexBetween sx={{ width: "75%" }}>hello</FlexBetween>
      </Box>
    </>
  );
};

export default Admin;
