import { Box, Typography, Divider, useTheme, Link } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';


const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const userDetails = useSelector((state) => state.user);
  // we are getting the friends from user stored int the data
  // const friendsCount = useSelector((state) => state.user.friends);

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };


  useEffect(() => {
    getUser();
  }, [userDetails]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    userName,
    location,
    occupation,
    viewedProfile,
    impressions,
    twitter,
    friends,
    linkedin,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
        sx={{
          "&:hover": {
            color: palette.primary.light,
            cursor: "pointer",
          },
        }}
      >
        <UserImage size="75px" image={picturePath} />
        <Box sx={{
          m: "1rem",
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
        }}>
          <Typography
            variant="h4"
            color={dark}
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {userName}
          </Typography>
        </Box>
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">

        {/* Name of the user */}
        <Box display="flex" alignItems="center" justifyContent="space-between" gap="1rem" mb="0.5rem">
          <PersonIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{firstName} {lastName}</Typography>
        </Box>

        {/* Connections of the user/ friends */}
        <Box display="flex" alignItems="center" justifyContent="space-between" gap="1rem" mb="0.5rem">
          <Diversity3OutlinedIcon fontSize="large" sx={{ color: main }} />
          {<Typography color={medium}>{friends.length} {friends.length === 1 ? "Connection" : "Connections"}</Typography>}
        </Box>

        <Box display="flex" alignItems="center" justifyContent="space-between" gap="1rem" mb="0.5rem">
          <LocationOnIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="space-between" gap="1rem">
          <WorkIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Link href={twitter} target="_blank">Twitter Account Link</Link>
            </Box>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Link href={linkedin} target="_blank">Linkedin Account Link</Link>

            </Box>
          </FlexBetween>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
