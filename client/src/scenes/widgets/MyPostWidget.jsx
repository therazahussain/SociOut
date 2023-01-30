import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useDropzone } from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { useLocation } from "react-router-dom";
import ArticleWidget from "./ArticleWidget";
import { useCallback } from "react";
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [imageButton, setImageButton] = useState("");
  const [extension, setExtension] = useState({
    'image/png': ['.png'],
    'image/jpeg': ['.jpeg'],
    'image/jpg': ['.jpg'],
  });

  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const medium = palette.neutral.medium;
  const location = useLocation();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");


  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0])
  });


  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: extension })


  const handleImage = () => {
    setIsImage(!isImage)
    setExtension(
      {
        'image/png': ['.png'],
        'image/jpeg': ['.jpeg'],
        'image/jpg': ['.jpg'],
      }
    )
  }

  const handleVideo = () => {
    setIsImage(!isImage)
    setExtension(
      {
        'video/mp4': ['.mp4'],
      }
    )
  }

  const handleClear = () => {
    setImage(null) 
    setIsImage(false)
  }

  const handlePost = async (article) => {
    setIsImage(false);
    const formData = new FormData();
    formData.append("userId", _id);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
      formData.append("description", post);
    } else {
      // if we dont have any the 
      formData.append("description", article);
    }

    const getUserPosts = async () => {
      const response = await fetch(
        `http://localhost:3001/posts/${_id}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    };


    const response = await fetch(`http://localhost:3001/posts/`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();

    if (location.pathname === `/profile/${_id}`) {

      // if location is profile then user images will be dipatched to the state 
      getUserPosts()
    }
    else {
      // if location is not profile then all the images will be dispatched tot eh state
      dispatch(setPosts({ posts }));
    }
    setImage(null);
    setPost("");
  };


  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <FlexBetween>
            <Box
              {...getRootProps()}
              border={`2px dashed ${palette.primary.main}`}
              p="1rem"
              width="100%"
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <input {...getInputProps()} />
              {!image ? (
                <p>Add Image Here</p>
              ) : (
                <FlexBetween>
                  <Typography>{image.name}</Typography>
                  <EditOutlined />
                </FlexBetween>
              )}
            </Box>
            {image && (
              <IconButton
                onClick={handleClear}
              >
                <DeleteOutlined sx={{ fontSize: "25px", margin:"0.5rem" }}/>
              </IconButton>
            )}
          </FlexBetween>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween disabled={true} gap="0.25rem" onClick={handleImage} sx={{ "&:hover": { cursor: "pointer", color: palette.primary.main } }}>
          <ImageOutlined sx={{ color: palette.primary.main }} />
          {isNonMobileScreens && <Typography color={palette.primary.main}>
            Image
          </Typography>}
        </FlexBetween>

        <FlexBetween gap="0.25rem" onClick={handleVideo}
          sx={{ "&:hover": { cursor: "pointer", color: palette.primary.main }}}>
          <OndemandVideoOutlinedIcon sx={{ color: palette.primary.main }} />
          {isNonMobileScreens && <Typography color={palette.primary.main}>
            Videos
          </Typography>}
        </FlexBetween>

        <FlexBetween gap="0.25rem" sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
          <ArticleWidget handlePost={handlePost}></ArticleWidget>
        </FlexBetween>

        <Button
          disabled={!image || !post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
