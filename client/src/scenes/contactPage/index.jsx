import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { FieldContainer, FieldError } from 'components/FormMessage';
import FlexBetween from "components/FlexBetween";
import Navbar from 'scenes/navbar';
import { useDispatch } from 'react-redux';
import { setAlertOpen, setPopUpContent } from 'state';
import AlertBox from 'components/AlertBox';

const initialValuesLogin = {
    name: "",
    email: "",
    message: "",
};

const validationSchema = yup.object({
    name: yup
        .string()
        .min(3, "Name must be of minimum 3 Characters.")
        .required(),
    email: yup.string().email("Please enter a valid email address").required(),
    message: yup
        .string()
        .min(10, "Message is too Short!")
        .required(),
});

const Contact = () => {
    const form = useRef();
    const dispatch = useDispatch()
    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();

    const onSubmit = () => {
        emailjs.sendForm(process.env.REACT_APP_YOUR_SERVICE_ID, process.env.REACT_APP_YOUR_TEMPLATE_ID, form.current, process.env.REACT_APP_YOUR_PUBLIC_KEY)
            .then(() => {
                dispatch(setPopUpContent({
                    title: "Success",
                    desc: "Your Query has been sent Successfully",
                    btn: "Ok"
                }))
                dispatch(setAlertOpen(true));
                formik.resetForm();
            }, (error) => {
                dispatch(setPopUpContent({
                    title: "Error",
                    desc: error.message,
                    btn: "Try Again"
                }))
                dispatch(setAlertOpen(true));
            });
    };


    const formik = useFormik({
        initialValues: initialValuesLogin,
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
    });

    return (
        <>
            <Navbar />
            <Box>
                <FlexBetween>
                    <Box
                        width={isNonMobileScreens ? "40%" : "80%"}
                        p="2rem"
                        m="2rem auto"
                        borderRadius="1.5rem"
                        backgroundColor={theme.palette.background.alt}
                    >
                        <Box sx={{ mb: "1.5rem", }}>
                            <Typography fontFamily="Rubik sans-serif" fontWeight="bold" fontSize="32px" color="primary">
                                Contact Us
                            </Typography>
                            <Typography fontFamily="Rubik sans-serif" fontSize="12px" color="primary">
                                Write Down your Query we will get back to you Soon!
                            </Typography>
                        </Box>

                        <form ref={form} onSubmit={formik.handleSubmit}>
                            <Box
                                display="grid"
                                gap="0.5rem"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                            >
                                <FieldContainer>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        sx={{ gridColumn: "span 4" }}
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FieldError>
                                        {formik.touched.email && formik.errors.email
                                            ? formik.errors.email
                                            : ""}
                                    </FieldError>
                                </FieldContainer>

                                <FieldContainer>
                                    <TextField
                                        label="Name"
                                        name="name"
                                        sx={{ gridColumn: "span 4" }}
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FieldError>
                                        {formik.touched.name && formik.errors.name
                                            ? formik.errors.name
                                            : ""}
                                    </FieldError>
                                </FieldContainer>

                                <FieldContainer>
                                    <TextField
                                        label="Enter your Message here"
                                        name="message"
                                        sx={{ gridColumn: "span 4" }}
                                        value={formik.values.message}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        multiline
                                        rows={5}
                                    />
                                    <FieldError>
                                        {formik.touched.message && formik.errors.message
                                            ? formik.errors.message
                                            : ""}
                                    </FieldError>
                                </FieldContainer>
                            </Box>
                            <Box>
                                <Button
                                    type="submit"
                                    sx={{
                                        float: "right",
                                        m: "0",
                                        p: "1rem",
                                        backgroundColor: palette.primary.main,
                                        color: palette.background.alt,
                                        "&:hover": { color: palette.primary.main },
                                    }}
                                >
                                    Contact Me
                                </Button>
                                <AlertBox />
                            </Box>
                        </form>
                    </Box>
                </FlexBetween>
            </Box>
        </>
    )
}

export default Contact