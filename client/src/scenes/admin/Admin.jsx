import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import React, { useEffect, useState } from "react";
import Navbar from "scenes/navbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonIcon from "@mui/icons-material/Person";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import CardOptions from "components/CardOptions";
import { useSelector } from "react-redux";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import PostsWidget from "scenes/widgets/PostsWidget";
import AlertDeleteAdmin from "components/AlertDeleteAdmin";
import AlertBlockAdmin from "components/AlertBlockAdmin";
import AlertAdmin from "components/AdminAlert";

const Admin = () => {
  const [comments, setComments] = useState(0);
  const [likes, setLikes] = useState(0);
  const [reported, setReported] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState("dashboard");
  const [open, setOpen] = useState(false);
  const [actionUser, setActionUser] = useState(null);
  const [openBlock, setOpenBlock] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [option, setOption] = useState("");
  const [adminOption, setAdminOption] = useState("");

  const token = useSelector((state) => state.token);

  const posts = useSelector((state) => state.posts);
  const { _id } = useSelector((state) => state.user);

  useEffect(() => {
    const getusers = async () => {
      const response = await fetch(`http://localhost:3001/admin/getAllUsers`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data === undefined) {
        setUsers(0);
      } else {
        setUsers(data);
      }
    };

    getusers();

    setTotalPosts(posts.length);

    posts.map((value) => {
      if (value.reports) {
        const report = Object.keys(value.reports).length;
        if (report > 0) {
          setReported((prev) => prev + 1);
        }
      }
    });

    posts.map((value) => {
      if (value.likes) {
        const likes = Object.keys(value.likes).length;
        setLikes((prev) => prev + likes);
      }
    });

    posts.map((value) => {
      if (value.comments) {
        const commentsLength = value.comments.length;
        setComments((prev) => prev + commentsLength);
      }
    });
  }, [posts]);

  const theme = useTheme();
  const alt = theme.palette.background.alt;
  const neutralLight = theme.palette.neutral.light;

  const mode = useSelector((state) => state.mode);

  const handleBlockAccount = (user) => {
    setActionUser(user);
    if (user.block) {
      setOption("unblock");
    } else {
      setOption("block");
    }
    setOpenBlock(true);
  };

  const handleDeleteAccount = (user) => {
    setActionUser(user);
    setOpen(true);
  };

  const handleAdmin = (user) => {
    setActionUser(user);
    if (user.admin) {
      setAdminOption("removeAdmin");
    } else {
      setAdminOption("makeAdmin");
    }
    setOpenAdmin(true);
  };

  return (
    <>
      <Navbar />

      <AlertAdmin
        openAdmin={openAdmin}
        setOpenAdmin={setOpenAdmin}
        adminOption={adminOption}
        user={actionUser}
        setActionUser={setActionUser}
        token={token}
        setUsers={setUsers}
      ></AlertAdmin>

      <AlertDeleteAdmin
        open={open}
        setOpen={setOpen}
        user={actionUser}
        setActionUser={setActionUser}
        token={token}
        setUsers={setUsers}
      ></AlertDeleteAdmin>

      <AlertBlockAdmin
        openBlock={openBlock}
        setOpenBlock={setOpenBlock}
        user={actionUser}
        setActionUser={setActionUser}
        token={token}
        setUsers={setUsers}
        option={option}
      ></AlertBlockAdmin>

      <Box display="flex" width="100%">
        <FlexBetween
          backgroundColor={mode === "dark" ? alt : ""}
          sx={{
            width: "25%",
            height: "85.7vh",
            flexDirection: "column",
            padding: "30px",
            alignItems: "center",
            justifyContent: "space-between",
            borderRight: "1px solid black",
            position: "sticky",
            top: "14.1vh",
            zIndex: "3",
          }}
        >
          <Box
            display="flex"
            gap={1}
            width="100%"
            backgroundColor={neutralLight}
            justifyContent="center"
            onClick={() => setShow("dashboard")}
            p={1}
            sx={{
              borderRadius: "5px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            <DashboardIcon sx={{ fontSize: "30px" }}></DashboardIcon>
            <Typography pb="5px" variant="button" sx={{ fontSize: "20px" }}>
              DASHBOARD
            </Typography>
          </Box>

          <Box
            height="80%"
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="center"
            backgroundColor={neutralLight}
            width="100%"
            gap={2}
            p={1}
            sx={{
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <Typography pb="5px" variant="button" sx={{ fontSize: "20px" }}>
              Admin Control
            </Typography>
            <Box
              display="flex"
              onClick={() => setShow("admin")}
              gap={1}
              width="100%"
              backgroundColor={mode === "dark" ? "#757474" : "#bdb9b9"}
              p={1}
              justifyContent="center"
              sx={{
                borderRadius: "5px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              <SupervisorAccountIcon></SupervisorAccountIcon>
              <Typography pb="5px" variant="button" sx={{ fontSize: "16px" }}>
                Admin Managment
              </Typography>
            </Box>
            <Box
              display="flex"
              gap={1}
              width="100%"
              onClick={() => setShow("users")}
              backgroundColor={mode === "dark" ? "#757474" : "#bdb9b9"}
              p={1}
              justifyContent="center"
              sx={{
                borderRadius: "5px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              <PersonIcon></PersonIcon>
              <Typography pb="5px" variant="button" sx={{ fontSize: "16px" }}>
                USER Managment
              </Typography>
            </Box>
            <Box
              display="flex"
              gap={1}
              width="100%"
              onClick={() => setShow("posts")}
              backgroundColor={mode === "dark" ? "#757474" : "#bdb9b9"}
              p={1}
              justifyContent="center"
              sx={{
                borderRadius: "5px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              <InsertPhotoIcon></InsertPhotoIcon>
              <Typography pb="5px" variant="button" sx={{ fontSize: "16px" }}>
                POST Managment
              </Typography>
            </Box>
          </Box>
        </FlexBetween>
        {show === "dashboard" && (
          <FlexBetween
            sx={{
              width: "75%",
              padding: "30px",
              alignItems: "start",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "50px",
            }}
          >
            <CardOptions>
              <PersonIcon sx={{ color: "red" }}></PersonIcon>
              <Typography
                pb="5px"
                variant="button"
                sx={{ fontSize: "16px", color: "red" }}
              >
                Total Users
              </Typography>
              <Typography
                pb="5px"
                variant="button"
                sx={{ fontSize: "16px", color: "red" }}
              >
                {users.length}
              </Typography>
            </CardOptions>

            <CardOptions>
              <InsertPhotoIcon sx={{ color: "green" }}></InsertPhotoIcon>
              <Typography
                pb="5px"
                variant="button"
                sx={{ fontSize: "16px", color: "green" }}
              >
                Total Posts -
              </Typography>
              <Typography
                pb="5px"
                variant="button"
                sx={{ fontSize: "16px", color: "green" }}
              >
                {totalPosts}
              </Typography>
            </CardOptions>

            <CardOptions>
              <InsertPhotoIcon sx={{ color: "orange" }}></InsertPhotoIcon>
              <Typography
                pb="5px"
                variant="button"
                sx={{ fontSize: "16px", color: "orange" }}
              >
                Total Comments -
              </Typography>
              <Typography
                pb="5px"
                variant="button"
                sx={{ fontSize: "16px", color: "orange" }}
              >
                {comments}
              </Typography>
            </CardOptions>

            <CardOptions>
              <InsertPhotoIcon sx={{ color: "teal" }}></InsertPhotoIcon>
              <Typography
                pb="5px"
                variant="button"
                sx={{ fontSize: "16px", color: "teal" }}
              >
                Total Likes -
              </Typography>
              <Typography
                pb="5px"
                variant="button"
                sx={{ fontSize: "16px", color: "teal" }}
              >
                {likes}
              </Typography>
            </CardOptions>

            <CardOptions>
              <ReportGmailerrorredOutlinedIcon
                sx={{ color: "olive" }}
              ></ReportGmailerrorredOutlinedIcon>
              <Typography
                pb="5px"
                variant="button"
                sx={{ fontSize: "16px", color: "olive" }}
              >
                Reported Posts -
              </Typography>
              <Typography
                pb="5px"
                variant="button"
                sx={{ fontSize: "16px", color: "olive" }}
              >
                {reported}
              </Typography>
            </CardOptions>
          </FlexBetween>
        )}

        {show === "posts" && (
          <Box
            width="75%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding="1rem 20%"
            gap="0.5rem"
            justifyContent="space-between"
            overflow="scroll"
          >
            <Box flexBasis={"42%"}>
              <PostsWidget userId={_id} />
            </Box>
          </Box>
        )}

        {show === "admin" && (
          <Box
            sx={{
              height: "85.7vh",
              overflow: "hidden",
              width: "75%",
              padding: "10px 20px",
            }}
          >
            {users && (
              <TableContainer sx={{ height: "85.7vh" }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          backgroundColor: neutralLight,
                          color: mode === "dark" ? "white" : "black",
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: neutralLight,
                          color: mode === "dark" ? "white" : "black",
                        }}
                      >
                        Username
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: neutralLight,
                          color: mode === "dark" ? "white" : "black",
                        }}
                      >
                        email
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: neutralLight,
                          color: mode === "dark" ? "white" : "black",
                        }}
                      >
                        Block Account
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: neutralLight,
                          color: mode === "dark" ? "white" : "black",
                        }}
                      >
                        Admin
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{`${item.firstName} ${item.lastName}`}</TableCell>
                        <TableCell>{item.userName}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>
                          {item.email === "razahussain3301@gmail.com" ? (
                            <Button>Admin</Button>
                          ) : (
                            <Button>{`${item.block}`}</Button>
                          )}
                        </TableCell>
                        <TableCell>
                          {item.email === "razahussain3301@gmail.com" ? (
                            <Button>Admin</Button>
                          ) : !item.admin ? (
                            <Button
                              variant="outlined"
                              onClick={() => handleAdmin(item)}
                            >
                              Make Admin
                            </Button>
                          ) : item._id === _id ? (
                            <Button variant="outlined">Admin</Button>
                          ) : (
                            <Button
                              sx={{ color: "red", borderColor: "red" }}
                              variant="outlined"
                              onClick={() => handleAdmin(item)}
                            >
                              Remove Admin
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}

        {show === "users" && (
          <Box
            sx={{
              height: "85.7vh",
              overflow: "hidden",
              width: "75%",
              padding: "10px 20px",
            }}
          >
            {users && (
              <TableContainer sx={{ height: "85.7vh" }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          backgroundColor: neutralLight,
                          color: mode === "dark" ? "white" : "black",
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: neutralLight,
                          color: mode === "dark" ? "white" : "black",
                        }}
                      >
                        Username
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: neutralLight,
                          color: mode === "dark" ? "white" : "black",
                        }}
                      >
                        email
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: neutralLight,
                          color: mode === "dark" ? "white" : "black",
                        }}
                      >
                        Block Account
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: neutralLight,
                          color: mode === "dark" ? "white" : "black",
                        }}
                      >
                        Delete Account
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{`${item.firstName} ${item.lastName}`}</TableCell>
                        <TableCell>{item.userName}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>
                          {item.admin ? (
                            <Button variant="outlined">Admin Account</Button>
                          ) : !item.block ? (
                            <Button
                              variant="outlined"
                              onClick={() => handleBlockAccount(item)}
                            >
                              Block Account
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              sx={{ color: "red", borderColor: "red" }}
                              onClick={() => handleBlockAccount(item)}
                            >
                              Unblock Account
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          {item.admin ? (
                            <Button variant="outlined">Admin Account</Button>
                          ) : (
                            <Button
                              variant="outlined"
                              onClick={() => handleDeleteAccount(item)}
                            >
                              Delete Account
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Admin;
