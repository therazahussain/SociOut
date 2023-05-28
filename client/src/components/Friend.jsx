import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setFriends, setPost } from "state";
import DeletePost from "./DeletePost";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import { useState } from "react";
import ReportAlert from "./ReportAlert";

const Friend = ({
  friendId,
  username,
  subtitle,
  userPicturePath,
  isProfile,
  postId,
  reports,
  reportCount,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [open, setOpen] = useState(false);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isReported = Boolean(reports[loggedInUserId]);
  const isFriend = friends.find((friend) => friend._id === friendId);

  const location = useLocation();
  const currentUrl = location.pathname;

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  const reportPost = async () => {
    setOpen(true)
  };

  return (
    <>
      <ReportAlert open={open} setOpen={setOpen} postId={postId} token={token} loggedInUserId={loggedInUserId}></ReportAlert>
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImage image={userPicturePath} size="55px" />
          <Box
            onClick={() => {
              navigate(`/profile/${friendId}`);
              navigate(0);
            }}
          >
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {username}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              {subtitle}
            </Typography>
          </Box>
        </FlexBetween>
        {currentUrl === "/admin"? (
          <Box display="flex" gap={1}>
          <DeletePost postId={postId} isProfile={isProfile} />
          <Tooltip title="Report Counts">
            <IconButton sx={{ backgroundColor: "red", p: "0.6rem 0.9rem" }}>
              {reportCount}
            </IconButton>
          </Tooltip>
        </Box>
        ) : _id === friendId  ? (
          <DeletePost postId={postId} isProfile={isProfile} />
        ) : (
          <Box display="flex" gap={1}>
            <IconButton
              onClick={() => patchFriend()}
              sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
              {isFriend ? (
                <>
                  <PersonRemoveOutlined sx={{ color: primaryDark }} />
                </>
              ) : (
                <>
                  <PersonAddOutlined sx={{ color: primaryDark }} />
                </>
              )}
            </IconButton>

            {!isReported && (
              <Tooltip title="Report Post">
                <IconButton
                  onClick={() => reportPost()}
                  sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
                >
                  <ReportGmailerrorredOutlinedIcon
                    sx={{ color: primaryDark }}
                  />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
      </FlexBetween>
    </>
  );
};

export default Friend;
