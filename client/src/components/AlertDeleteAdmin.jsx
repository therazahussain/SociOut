import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDeleteAdmin({
  open,
  setOpen,
  user,
  setActionUser,
  token,
  setUsers,
}) {
  const friendsIds = [];

  const friendsId = () => {
    user.friends.map((friend) => friendsIds.push(friend._id));
  };
  

  const handleDelete = async () => {
    friendsId();
    const deleteUserResponse = await fetch(
      `http://localhost:3001/admin/deleteUser`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user._id,  friendsIds }),
      }
    );
    const remainUser = await deleteUserResponse.json();

    setUsers(remainUser)

    setOpen(false);
    setActionUser(null);
  };

  const handleClose = () => {
    setOpen(false);
    setActionUser(null);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Permanently Delete User Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to permanently Delete this user Account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
