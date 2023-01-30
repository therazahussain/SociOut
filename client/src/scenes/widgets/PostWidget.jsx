import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import CommentWidget from "./CommentWidget";

const PostWidget = ({
  isProfile,
  postId,
  postUserId,
  username,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  let updatedDescription = description.slice(0, 220);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        isProfile={isProfile}
        postId={postId}
        friendId={postUserId}
        username={username}
        subtitle={location}
        userPicturePath={userPicturePath}
      />

      <div style={{ margin: "1.5rem 0" }}>
        <Typography color={main} fontWeight="bold" fontSize="clamp(1.1rem, 1.1rem, 1.5rem)" display="inline">
          {updatedDescription}
          {description.length > 345 && <CommentWidget postId={postId} postUserId={postUserId} comments={comments} description={description} username={username} openLocation="description" />}
        </Typography>
      </div>

      {picturePath &&
        ((picturePath.split('.').pop() === "mp4") ?
          <video controls width="100%">
            <source src={`http://localhost:3001/assets/${picturePath}`} type="video/webm" />
          </video>
          :
          (
            <img
              width="100%"
              height="auto"
              alt="post"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              src={`http://localhost:3001/assets/${picturePath}`}
            />
          ))
      }
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <CommentWidget postId={postId} postUserId={postUserId} comments={comments} description={description} username={username} Path={picturePath} userPicturePath={userPicturePath} openLocation="commentBox" />
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default PostWidget;
