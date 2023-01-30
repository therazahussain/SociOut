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
import FlexBetween from "components/FlexBetween";
import { FieldContainer, FieldError } from "components/FormMessage";
import { setPopUpContent, setAlertOpen, setActivePage, setUser } from "state";
import { useNavigate } from "react-router-dom";
import AlertBox from "components/AlertBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Navbar from "scenes/navbar";


const validationSchema = yup.object({
    firstName: yup
        .string()
        .min(3, "Please enter Correct First Name").required("Required!"),
    lastName: yup
        .string()
        .min(3, "Please enter your Last Name").required("Required!"),
    occupation: yup
        .string()
        .min(4, "Please enter Correct Occupation").required(" Required!"),
    location: yup
        .string()
        .min(2, "Please enter a Correct Country").required("Required!"),
    linkedin: yup
        .string()
        .min(8, "Please enter a Correct Link").required("Required!"),
    twitter: yup
        .string()
        .min(8, "Please enter a Correct Link").required("Required!"),
});



const EditProfileForm = () => {

    const { palette } = useTheme();
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const { _id } = user;

    const initialValuesUpdate = {
        firstName: user.firstName,
        lastName: user.lastName,
        occupation: user.occupation,
        location: user.location,
        twitter: user.twitter,
        linkedin: user.linkedin
    };

    const onSubmit = async (values) => {
        // we are taking all the values that we want to send to backend.
        const { ...data } = values;
        // we are taking all the values that we want to send to backend.
        const formData = new FormData();
        for (let value in data) {
            formData.append(value, data[value]);
        }

        const savedUserResponse = await fetch(
            `http://localhost:3001/${_id}/updateUser`,
            {
                method: "PATCH",
                body: formData,
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const savedUser = await savedUserResponse.json();
        // To reset the form
        formik.resetForm();

        if (savedUser) {
            if (savedUserResponse.status === 200) {
                dispatch(setPopUpContent({
                    title: "SuccessFully Updated",
                    desc: "Your Account has been Updated Successfully.",
                    btn: "OK"
                }))
                dispatch(setAlertOpen(true));
            }
            if (savedUserResponse.status === 404) {
                dispatch(setPopUpContent({
                    title: "Error !",
                    desc: "Some Error Occured While Updating the Profile, Please Try Again After Some Time.",
                    btn: "Try Again"
                }))
                dispatch(setAlertOpen(true));
            }
        }
    }

    const formik = useFormik({
        initialValues: initialValuesUpdate,
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
    });

    useEffect(() => {

    }, [user])

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
                            <Typography fontWeight="bold" fontFamily="Rubik sans-serif" fontSize="32px" color="primary"
                            >
                                Edit Profile
                            </Typography>
                            <Typography fontWeight="bold" fontFamily="Rubik sans-serif" fontSize="20px" color="primary"
                            >
                                Edit Your Dedtails here.
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
                                <FieldContainer style={{ gridColumn: "span 2" }}>
                                    <TextField
                                        label="First Name"
                                        name="firstName"
                                        sx={{ gridColumn: "span 2" }}
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FieldError>
                                        {formik.touched.firstName && formik.errors.firstName
                                            ? formik.errors.firstName
                                            : ""}
                                    </FieldError>
                                </FieldContainer>

                                <FieldContainer style={{ gridColumn: "span 2" }}>
                                    <TextField
                                        label="Last Name"
                                        name="lastName"
                                        sx={{ gridColumn: "span 2" }}
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FieldError>
                                        {formik.touched.lastName && formik.errors.lastName
                                            ? formik.errors.lastName
                                            : ""}
                                    </FieldError>
                                </FieldContainer>

                                <FieldContainer>
                                    <TextField
                                        label="Current Occupation"
                                        name="occupation"
                                        sx={{ gridColumn: "span 4" }}
                                        value={formik.values.occupation}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FieldError>
                                        {formik.touched.occupation && formik.errors.occupation
                                            ? formik.errors.occupation
                                            : ""}
                                    </FieldError>
                                </FieldContainer>

                                <FieldContainer>
                                    <TextField
                                        label="Your Country"
                                        name="location"
                                        sx={{ gridColumn: "span 4" }}
                                        value={formik.values.location}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FieldError>
                                        {formik.touched.location && formik.errors.location
                                            ? formik.errors.location
                                            : ""}
                                    </FieldError>
                                </FieldContainer>

                                <FieldContainer>
                                    <TextField
                                        label="Link to your Linkedin Account."
                                        name="linkedin"
                                        sx={{ gridColumn: "span 4" }}
                                        value={formik.values.linkedin}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FieldError>
                                        {formik.touched.linkedin && formik.errors.linkedin
                                            ? formik.errors.linkedin
                                            : ""}
                                    </FieldError>
                                </FieldContainer>

                                <FieldContainer>
                                    <TextField
                                        label="Link to your Twitter Account."
                                        name="twitter"
                                        sx={{ gridColumn: "span 4" }}
                                        value={formik.values.twitter}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <FieldError>
                                        {formik.touched.twitter && formik.errors.twitter
                                            ? formik.errors.twitter
                                            : ""}
                                    </FieldError>
                                </FieldContainer>

                            </Box>
                            <Box>
                                <FlexBetween>
                                    <Button
                                        onClick={() => navigate("/home")}
                                        sx={{
                                            width: "50%",
                                            gridColumn: "span 2",
                                            m: "1rem ",
                                            p: "1rem",
                                            backgroundColor: palette.primary.main,
                                            color: palette.background.alt,
                                            "&:hover": { color: palette.primary.main },
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        sx={{
                                            width: "50%",
                                            gridColumn: "span 2",
                                            m: "1rem ",
                                            p: "1rem",
                                            backgroundColor: palette.primary.main,
                                            color: palette.background.alt,
                                            "&:hover": { color: palette.primary.main },
                                        }}
                                    >
                                        Update
                                    </Button>
                                </FlexBetween>
                                <AlertBox />
                            </Box>
                        </form>
                    </Box>
                </FlexBetween>
            </Box>
        </>
    )
}


export default EditProfileForm