import { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ChatBubbleOutlineOutlined } from '@mui/icons-material';
import { Box, IconButton, InputBase, Typography, useMediaQuery } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import { useTheme } from '@emotion/react';
import { setPost } from 'state';
import { useDispatch, useSelector } from 'react-redux';
import UserImage from 'components/UserImage';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

export default function CommentWidget({ postId, description, username, comments, openLocation, postUserId, userPicturePath }) {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const { picturePath, _id } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [comment, setComment] = useState("")
    const [changeComments, setChangedComments] = useState(comments);
    const { palette } = useTheme();

    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const handleChange = (e) => {
        setComment(e.target.value);
    }

    const addComment = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/comments`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ picturePath, _id, username, comment }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setChangedComments(updatedPost.comments);
        setComment("")
    };

    const updateComment = () => {
        addComment();
    }

    return (
        <>
            {openLocation === "commentBox" ? <IconButton onClick={handleClickOpen('paper')}><ChatBubbleOutlineOutlined /></IconButton>
                :
                <Typography onClick={handleClickOpen('paper')} sx={{ "&:hover": { color: palette.primary.light, cursor: "pointer", }, }} display="inline">.....read more</Typography>
            }
            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '80%', height: "85%" } }}
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" sx={{ height: "15%" }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <FlexBetween style={{ alignItems: "start", justifyContent: "start" }}>
                        <FlexBetween style={{ gap: "0.3rem", marginBottom: ".5rem" }}
                            onClick={() => {
                                navigate(`/profile/${postUserId}`);
                                navigate(0);
                            }}
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                },
                            }}
                        >
                            <UserImage image={userPicturePath} size="50px" />
                            <Typography sx={{ p: ".5rem 0 0 0.5rem", fontWeight: "1000", fontSize: "1.2rem" }}>{username}</Typography>
                        </FlexBetween>
                    </FlexBetween>
                    <CloseIcon onClick={handleClose} style={{ cursor: "pointer", fontWeight: "bold" }} />
                </DialogTitle>

                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {/* Comment box where all the comments and the description will be shown */}
                        <FlexBetween style={{ alignItems: "start", justifyContent: "start" }}>
                            <UserImage image={userPicturePath} size="50px" />
                            <FlexBetween style={{ flexDirection: "column", alignItems: "start", gap: "0.3rem", marginBottom: ".5rem" }}>
                                <Typography sx={{
                                    pl: "1rem", fontWeight: "1000", fontSize: "1rem", "&:hover": {
                                        color: palette.primary.light,
                                        cursor: "pointer",
                                    },
                                }} onClick={() => {
                                    navigate(`/profile/${postUserId}`);
                                    navigate(0);
                                }}
                                >{username}</Typography>
                                <Typography sx={{ pl: "1rem", fontSize: ".9rem" }}>{description}</Typography>
                            </FlexBetween>
                        </FlexBetween>

                        <Box mt="1rem">
                            {changeComments.map((comment, i) => (
                                <Box key={`${username}-${i}`} marginBottom="1.5rem">

                                    <FlexBetween style={{ alignItems: "start", justifyContent: "start" }}>
                                        <UserImage image={comment.postedBy.picturePath} size="50px" />
                                        <FlexBetween style={{ flexDirection: "column", alignItems: "start", gap: "0.3rem", marginBottom: ".5rem" }}>
                                            <Typography fontWeight="1000" onClick={() => {
                                                navigate(`/profile/${comment.postedBy.userId}`);
                                                navigate(0);
                                            }}
                                                sx={{
                                                    fontSize: "1rem",
                                                    pl: "1rem",
                                                    "&:hover": {
                                                        color: palette.primary.light,
                                                        cursor: "pointer",
                                                    },
                                                }}>
                                                {comment.postedBy.username}
                                            </Typography>
                                            <Typography sx={{ pl: "1rem", fontSize: ".9rem" }}>{comment.comment}</Typography>
                                        </FlexBetween>
                                    </FlexBetween>
                                </Box>
                            ))}
                        </Box>

                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: "block" }}>
                    <FlexBetween margin="0.5rem 1rem" gap="1rem">
                        <UserImage image={picturePath} size="50px" />
                        <InputBase username="comment" width="100%" placeholder="Comment..." value={comment} onChange={handleChange}
                            // to disable the auto-complete
                            inputProps={{
                                autoComplete: 'off'
                            }} sx={{
                                height: "3rem",
                                width: "100%",
                                borderRadius: "9px",
                                backgroundColor: palette.neutral.light,
                                padding: "0.5rem 1.2rem",
                            }} />

                        <Button
                            disabled={comment.length === 0}
                            sx={{
                                height: "2.5rem",
                                color: palette.background.alt,
                                backgroundColor: palette.primary.main,
                            }} onClick={updateComment}>Post</Button>
                    </FlexBetween>
                </DialogActions>
            </Dialog>
        </>
    );
}
