import { Typography } from "@mui/material";
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>{(posts.length) === 0 ?

      <WidgetWrapper m="2rem 0" height="60%">
        <div style={{ margin: "1.5rem 0", display: "flex", justifyContent: "center", alignItems: "center", height: "100%", flexDirection: "column" }}>
          <NoPhotographyOutlinedIcon sx={{ fontSize: "8rem" }}/>
          <Typography fontWeight="bold" fontSize="clamp(2.2rem, 1.9rem, 2.1rem)" display="inline">
            No posts Yet...
          </Typography>
        </div>
      </WidgetWrapper>
      :
      posts.map(
        ({
          _id,
          userId,
          userName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
          reports
        }) => (
          <PostWidget
            key={_id}
            isProfile={isProfile}
            postId={_id}
            postUserId={userId}
            username={userName}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            reports={reports}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
