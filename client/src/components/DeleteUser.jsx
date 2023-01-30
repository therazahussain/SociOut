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
import { useDispatch, useSelector } from 'react-redux';
import AlertBox from './AlertBox';
import FlexBetween from './FlexBetween';
import Navbar from 'scenes/navbar';
import { setAlertOpen, setPopUpContent } from 'state';


const initialValuesToDeleteUser = {
    password: "",
    confirmPassword: "",
};

const validationSchema = yup.object({
    password: yup
        .string()
        .min(5, "The Password is too Short it must Contain Atleast 5 Characters")
        .required(),
    confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: yup
                .string()
                .oneOf([yup.ref("password")], "Password does not match"),
        }),
});

const DeleteUser = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const { palette } = useTheme();
    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friendsIds = [];
    const id = user._id;

    const friendsId = () => {
        user.friends.map((friend) => 
            friendsIds.push(friend._id)
        )
    }

    const onSubmit = async (values) => {
        friendsId();
        const password = values.password;

        const deleteUserResponse = await fetch(`http://localhost:3001/users/${id}/deleteUser`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, friendsIds })
        });
        const deletedData = await deleteUserResponse.json();

        if(deleteUserResponse.status === 200){
            dispatch(setPopUpContent({
                title: "Account Deleted",
                desc: "Your Account has been deleted Successfully.",
                btn: "Done"
            }))
            dispatch(setAlertOpen(true));
        }
        if (deleteUserResponse.status === 401) {
            dispatch(setPopUpContent({
                title: "Wrong Credentials !",
                desc: "The Password you Entered is Wrong. Please try again With Right Credentials",
                btn: "Try Again"
            }))
            dispatch(setAlertOpen(true));
        }
        if (deleteUserResponse.status === 404) {
            dispatch(setPopUpContent({
                title: "Some Error Occured!",
                desc: "While deleting the use some error occured in the Database.",
                btn: "Try Again"
            }))
            dispatch(setAlertOpen(true));
        }
    }

    const formik = useFormik({
        initialValues: initialValuesToDeleteUser,
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
                        width={isNonMobileScreens ? "40%" : "93%"}
                        p="2rem"
                        m="2rem auto"
                        borderRadius="1.5rem"
                        backgroundColor={theme.palette.background.alt}
                    >
                        <Box sx={{ mb: "1.5rem", textAlign: "center" }}>
                            <Typography fontFamily="Rubik sans-serif" fontWeight="bold" fontSize="32px" color="primary">
                                Delete Account
                            </Typography>
                            <Typography fontFamily="Rubik sans-serif" fontWeight="bold" fontSize="20px" color="primary">
                                Enter The Password To delete Your Account Permanently
                            </Typography>
                        </Box>

                        <form onSubmit={formik.handleSubmit} autocomplete="false">
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
                                        autocomplete="false"
                                        label="Password"
                                        name="password"
                                        type="Password"
                                        sx={{ gridColumn: "span 4" }}
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FieldError>
                                        {formik.touched.password && formik.errors.password
                                            ? formik.errors.password
                                            : ""}
                                    </FieldError>
                                </FieldContainer>

                                <FieldContainer>
                                    <TextField
                                        label="Confirm Password"
                                        type="Password"
                                        name="confirmPassword"
                                        sx={{ gridColumn: "span 4" }}
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FieldError>
                                        {formik.touched.confirmPassword && formik.errors.confirmPassword
                                            ? formik.errors.confirmPassword
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
                                    Delete Account
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

export default DeleteUser;


