import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { FieldContainer, FieldError } from "components/FormMessage";
import AlertBox from "../../components/AlertBox.jsx";
// import UpdateBox from "./UpdateBox"
import { useDispatch } from "react-redux";
import { setPopUpContent, setAlertOpen, setActivePage } from "state";


const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']

const validationSchema = yup.object({
    email: yup.string().email("Please enter a valid email address").required(),
    firstName: yup
        .string()
        .min(3, "First Name must be of minimum 3 Characters.")
        .required(),
    lastName: yup
        .string()
        .min(3, "Last Name must be of minimum 3 Characters.")
        .required("Last name is required!"),
    userName: yup
        .string()
        .min(4, "User Name must be of minimum 4 Characters.")
        .required("User Name is required!"),
    occupation: yup
        .string()
        .min(4, "This field must contain minimum 4 Characters.")
        .required(),
    location: yup
        .string()
        .min(4, "This field must contain minimum 4 Characters.")
        .required(),
    picture: yup.mixed()
        .nullable()
        .required()
        .test("FILE_FORMAT", "Uploaded Picture has unsupported format.",
            value => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
    linkedin: yup
        .string()
        .min(4, "This field must contain minimum 8 Characters.")
        .required("Link is required!"),
    twitter: yup
        .string()
        .min(4, "This field must contain minimum 8 Characters.")
        .required("Link is required!"),
    password: yup
        .string()
        .required("Password is Required!"),
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


const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    occupation: "",
    twitter: "",
    linkedin: "",
    password: "",
    confirmPassword: "",
    picture: "",
    userName: "",
};


const RegisterForm = () => {

    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch = useDispatch();

    const onSubmit = async (values, onSubmitProps) => {
        const { confirmPassword, ...data } = values;
        // we are taking all the values that we want to send to backend.
        const formData = new FormData();
        for (let value in data) {
            formData.append(value, data[value]);
        }
        formData.append("picturePath", values.picture.name);

        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();

        if (savedUser) {
            if (savedUserResponse.status === 201) {
                dispatch(setPopUpContent({
                    title: "Thanks For Signing Up",
                    desc: "Your Account has been created Successfully. Sign in with Your Credentials",
                    btn: "Sign In"
                }))
                dispatch(setAlertOpen(true));
                // To reset the form
                onSubmitProps.resetForm();
            }
            if (savedUserResponse.status === 409) {
                dispatch(setPopUpContent({
                    title: "User Existed",
                    desc: "User with same Credentials Already Exists, Try Again with Diffrent Credentials.",
                    btn: "Try Again",
                }))
                dispatch(setAlertOpen(true));
            }
            if (savedUserResponse.status === 500) {
                dispatch(setPopUpContent({
                    title: "Error !",
                    desc: "Some Error Occured While Signing Up the User Try Again After Some Time ",
                    btn: "Try Again"
                }))
                dispatch(setAlertOpen(true));
                // To reset the form
                onSubmitProps.resetForm();
            }
        }
    }

    const handleClick = () => {
        formik.resetForm();
        dispatch(setActivePage("signIn"))
    }

    const formik = useFormik({
        initialValues: initialValuesRegister,
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
    });

    return (
        <>
            <Box sx={{ mb: "1.5rem", textAlign: "center" }}>
                <Typography fontWeight="bold" fontFamily="Rubik sans-serif" fontSize="32px" color="primary"
                >
                    SOCIOUT
                </Typography>
                <Typography fontWeight="500" fontSize="20px" fontFamily="Rubik sans-serif" color="primary">
                    Please sign-up to continue!
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
                            autoComplete="new-password"
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
                            autoComplete="new-password"
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

                    <FieldContainer style={{ gridColumn: "span 4" }}>
                        <TextField
                            label="Username"
                            name="userName"
                            autoComplete="new-password"
                            sx={{ gridColumn: "span 4" }}
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FieldError>
                            {formik.touched.userName && formik.errors.userName
                                ? formik.errors.userName
                                : ""}
                        </FieldError>
                    </FieldContainer>

                    <FieldContainer>
                        <TextField
                            label="Email"
                            name="email"
                            autoComplete="new-password"
                            type="email"
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

                    <FieldContainer style={{ gridColumn: "span 2" }}>
                        <TextField
                            label="Occupaation"
                            name="occupation"
                            autoComplete="new-password"
                            sx={{ gridColumn: "span 2" }}
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

                    <FieldContainer style={{ gridColumn: "span 2" }}>
                        <TextField
                            label="Location"
                            name="location"
                            autoComplete="new-password"
                            sx={{ gridColumn: "span 2" }}
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
                        <Box
                            gridColumn="span 4"
                            border={`1px solid ${palette.neutral.medium}`}
                            borderRadius="5px"
                            p="1rem"
                        >
                            <Dropzone
                                acceptedFiles=".jpg,.jpeg,.png"
                                name="picture"
                                value={formik.values.picture}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                multiple={false}
                                onDrop={(acceptedFiles) =>
                                    formik.setFieldValue("picture", acceptedFiles[0])
                                }
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <Box
                                        {...getRootProps()}
                                        border={`2px dashed ${palette.primary.main}`}
                                        p="1rem"
                                        sx={{ "&:hover": { cursor: "pointer" } }}
                                    >
                                        <input {...getInputProps()} />
                                        {!formik.values.picture ? (
                                            <p>Add Picture Here</p>
                                        ) : (
                                            <FlexBetween>
                                                <Typography>{formik.values.picture.name}</Typography>
                                                <EditOutlinedIcon />
                                            </FlexBetween>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                        </Box>
                        <FieldError>
                            {formik.touched.picture
                                && formik.errors.picture
                                ? formik.errors.picture
                                : ""}
                        </FieldError>
                    </FieldContainer>

                    <FieldContainer style={{ gridColumn: "span 2" }}>
                        <TextField
                            label="Linkedin Profile"
                            name="linkedin"
                            autoComplete="new-password"
                            sx={{ gridColumn: "span 2" }}
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

                    <FieldContainer style={{ gridColumn: "span 2" }}>
                        <TextField
                            label="Twitter Profile"
                            name="twitter"
                            autoComplete="new-password"
                            sx={{ gridColumn: "span 2" }}
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

                    <FieldContainer>
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="new-password"
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

                    <FieldContainer>
                        <TextField
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            autoComplete="new-password"
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
                        Sign Up
                    </Button>
                    <AlertBox />
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
                    >Already have an account ? Sign In here.</Typography>
                </Box>
            </form>
        </>
    )
}


export default RegisterForm