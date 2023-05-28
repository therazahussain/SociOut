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

export default function AlertAdmin({
  openAdmin,
  setOpenAdmin,
  user,
  setActionUser,
  token,
  setUsers,
  adminOption,
}) {

  const handleBlock = async () => {
    const blockUserResponse = await fetch(
      `http://localhost:3001/admin/makeAdmin`,
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

    setOpenAdmin(false);
    setActionUser(null);
  };

  const handleUnblock = async () => {
    const blockUserResponse = await fetch(
      `http://localhost:3001/admin/removeAdmin`,
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

    setOpenAdmin(false);
    setActionUser(null);
  };

  const handleClose = () => {
    setOpenAdmin(false);
    setActionUser(null);
  };

  console.log(adminOption)

  return (
    <div>
      <Dialog
        open={openAdmin}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{adminOption === "makeAdmin" ? "Admin Account" : "Remove Admin Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {adminOption === "makeAdmin"
              ? "Are you sure you want to Make this Account a Admin Account."
              : "Are you sure you want to Remove this user from Admin."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={adminOption === "makeAdmin" ? handleBlock : handleUnblock}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
