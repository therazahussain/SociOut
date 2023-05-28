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
  openBlock,
  setOpenBlock,
  user,
  setActionUser,
  token,
  setUsers,
  option,
}) {

  const handleBlock = async () => {
    const blockUserResponse = await fetch(
      `http://localhost:3001/admin/blockAccount`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user._id }),
      }
    );
    const updatedUser = await blockUserResponse.json();

    setUsers(updatedUser);

    setOpenBlock(false);
    setActionUser(null);
  };

  const handleUnblock = async () => {
    const blockUserResponse = await fetch(
      `http://localhost:3001/admin/unblockAccount`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user._id }),
      }
    );
    const updatedUser = await blockUserResponse.json();

    setUsers(updatedUser);

    setOpenBlock(false);
    setActionUser(null);
  };

  const handleClose = () => {
    setOpenBlock(false);
    setActionUser(null);
  };

  return (
    <div>
      <Dialog
        open={openBlock}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{option === "block" ? "Block User Account" : "Unblock User Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {option === "block"
              ? "Are you sure you want to Block this user Account."
              : "Are you sure you want to Unblock this user Account."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={option === "block" ? handleBlock : handleUnblock}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
