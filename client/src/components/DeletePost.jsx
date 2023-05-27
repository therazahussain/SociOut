import { useState } from "react";
import { setPosts } from "state";
import { IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DeletePost = ({ isProfile, postId }) => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/${_id}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const deletePost = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setOpen(false);
    const posts = await response.json();
    if (isProfile) {
      getUserPosts();
    } else {
      dispatch(setPosts({ posts }));
    }
  };

  return (
    <>
      <Tooltip title={"Delete Post"}>
        <IconButton
          onClick={() => handleClickOpen()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          <DeleteOutlineIcon sx={{ color: primaryDark }} />
        </IconButton>
      </Tooltip>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "70%", height: "40%" } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography fontWeight="bold" fontSize="clamp(1rem, 1.5rem, 2.2rem)">
            Delete Post.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography fontSize="clamp(.8rem, 1rem, 1.25rem)">
              {" "}
              Do you Want to Delete This Post ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deletePost} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeletePost;
