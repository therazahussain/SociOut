import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { InputBase, Typography, useMediaQuery } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';


export default function ArticleWidget({ handlePost }) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [article, setArticle] = useState("")
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setArticle(event.target.value)
    }

    const handleSubmit = () => {
        handlePost(article)
        setOpen(false);
        setArticle("")
    }

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <>
            <ArticleOutlinedIcon onClick={handleClickOpen('paper')} sx={{ color: { color: palette.primary.main} }} /> 
            {isNonMobileScreens && <Typography color={palette.primary.main}>
            Articles
          </Typography>}
            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '100%', height: "50%" } }}
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" style={{ 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography fontWeight="bold" fontSize="clamp(1rem, 1.6rem, 2.25rem)">Write Article</Typography>
                    <CloseIcon onClick={handleClose} style={{ cursor: "pointer", fontWeight: "bold" }} />
                </DialogTitle>

                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <Typography color={main} fontWeight="bold" fontSize="clamp(1.1rem, 1.1rem, 1.5rem)" sx={{ mt: "1rem" }}>
                            {article.length === 0 ? "The minimum length of the Article must be 120" : article }
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: "block" }}>
                    <FlexBetween margin="0.5rem 1rem" gap="1rem">
                        <InputBase name="comment" width="100%" placeholder="Wrtite here..."
                            value={article} onChange={handleChange}
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

                        <Button onClick={handleSubmit}
                            disabled = {article.length < 120}
                            sx={{
                                height: "2.5rem",
                                color: palette.background.alt,
                                backgroundColor: palette.primary.main,
                            }}>Post</Button>
                    </FlexBetween>
                </DialogActions>
            </Dialog>
        </>
    );
}