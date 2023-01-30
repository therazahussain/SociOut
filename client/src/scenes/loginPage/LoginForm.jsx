import React from 'react'
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
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActivePage, setAlertOpen, setLogin, setPopUpContent } from 'state';
import AlertBox from '../../components/AlertBox';


const initialValuesLogin = {
    email: "",
    password: "",
};

const validationSchema = yup.object({
    email: yup.string().email("Please enter a valid email address").required(),
    password: yup
        .string()
        .required()
});


const LoginForm = () => {

    const { palette } = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const onSubmit = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
            if (loggedInResponse.status === 200) {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token,
                    })
                );
                navigate("/home")
            }
            if (loggedInResponse.status === 400) {
                dispatch(setPopUpContent({
                    title: "No user Found !",
                    desc: "User Not Found! Sign Up the First and then try Signing.",
                    btn: "Sign Up"
                }))
                dispatch(setAlertOpen(true));

            }
            if (loggedInResponse.status === 401) {
                dispatch(setPopUpContent({
                    title: "Incorrect Credentials",
                    desc: "Your Email or Password is Incorrect Please Try again",
                    btn: "Try Again"
                }))
                dispatch(setAlertOpen(true));
            }
            if (loggedInResponse.status === 500) {
                dispatch(setPopUpContent({
                    title: "Internal Error",
                    desc: "Some Error Occured while Sign In please try after Sometime.",
                    btn: "Try Again"
                }))
                dispatch(setAlertOpen(true));
            }
        }
    };

    const handleClick = () => {
        dispatch(setActivePage("signUp"))
    }


    const formik = useFormik({
        initialValues: initialValuesLogin,
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
    });


    return (
        <>
            <Box sx={{ mb: "1.5rem", textAlign: "center" }}>
                <Typography fontFamily="Rubik sans-serif" fontWeight="bold" fontSize="32px" color="primary">
                    SOCIOUT
                </Typography>
                <Typography fontFamily="Rubik sans-serif" fontSize="20px" color="primary">
                    Please sign-in to continue!
                </Typography>
            </Box>

            <form onSubmit={formik.handleSubmit}>
                <Box
                    display="grid"
                    gap="30px"
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
                            label="Password"
                            type="password"
                            name="password"
                            sx={{ gridColumn: "span 4" }}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FieldError>
                            {formik.touched.password && formik.errors.password
                                ? formik.errors.password
                                : ""}
                        </FieldError>
                    </FieldContainer>

                </Box>
                <Box>
                    <Button
                        fullWidth
                        type="submit"
                        sx={{
                            m: "2rem 0",
                            p: "1rem",
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": { color: palette.primary.main },
                        }}
                    >
                        Sign In
                    </Button>
                    <AlertBox/>
                    <Typography
                        onClick={handleClick}
                        fontSize="16px"
                        sx={{
                            textDecoration: "underline",
                            color: palette.primary.main,
                            "&:hover": {
                                cursor: "pointer",
                                color: palette.primary.light,
                            },
                        }}
                    >Didn't have an Account! ? Sign Up Here .</Typography>
                </Box>
            </form>
        </>
    )
}

export default LoginForm


