import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React from "react";

const CardOptions = ({ children }) => {

    
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;

  return (
    <>
      <Box
        display="flex"
        gap={1}
        width="250px"
        height="150px"
        backgroundColor={neutralLight}
        p={1}
        justifyContent="center"
        alignItems="center"
        sx={{
          borderRadius: "5px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
            cursor: "pointer",
          },
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default CardOptions;
