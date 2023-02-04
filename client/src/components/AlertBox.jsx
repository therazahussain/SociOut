import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector,useDispatch } from 'react-redux';
import { setActivePage, setAlertOpen, setLogout } from 'state';
import { useNavigate } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertBox() {
  const {title, desc, btn,} = useSelector((state) => state.popUpContent);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = useSelector((state)=> state.alertOpen)

  const handleClose = () => {
    dispatch(setAlertOpen(false));
    if(btn ==="OK" ){
      navigate("/home")
    }
    if(btn=== "Sign In"){
      dispatch(setActivePage("signIn"));
    }
    if(btn=== "Sign Up"){
      dispatch(setActivePage("signUp"));
    }
    if(btn=== "Done"){
      dispatch(setLogout(null));
    }
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
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{btn}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
