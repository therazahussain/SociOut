import { Box, IconButton, InputBase, Typography } from '@mui/material'
import React from 'react'
import FlexBetween from './FlexBetween'
import {
    Search
} from "@mui/icons-material";
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserImage from './UserImage';

const SearchComponent = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const neutralLight = theme.palette.neutral.light;

    const [searchUser, setSearchUser] = useState("");
    const token = useSelector((state) => state.token);
    const [userDetails, setUserDetails] = useState([]);

    const fetchUser = async (e) => {
        setSearchUser(e.target.value)
        const searchUserResponse = await fetch(`http://localhost:3001/users/searchUser`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchUser })
        });
        const searchedData = await searchUserResponse.json();
        setUserDetails(searchedData)
    }

    const handleClick = () => {
        setSearchUser("")
    }

    return (
        <>
            <FlexBetween style={{ flexDirection: "column" }}>
                <FlexBetween
                    backgroundColor={neutralLight}
                    borderRadius="9px"
                    gap="3rem"
                    padding="0.1rem 1.5rem"
                >
                    <InputBase placeholder="Search..." onChange={fetchUser} value={searchUser} />

                    {searchUser ? <IconButton onClick={handleClick} > <ClearIcon/></IconButton> :<IconButton><Search/></IconButton>}

            </FlexBetween>
            {searchUser && <FlexBetween backgroundColor={neutralLight} style={{
                flexDirection: "column",
                minHeight: "100px", position: "absolute", top: "4rem", width: "18rem", borderRadius: "9px", maxHeight: "250px", overflowY: "scroll",
                alignItems: "start",
            }}>
                {userDetails.map((user) => (
                    <div key={user._id}
                        width="18rem"
                        onClick={() => {
                            setSearchUser("");
                            navigate(`/profile/${user._id}`);
                            navigate(0);  
                          }}
                    >
                        <FlexBetween style={{ gap: "1rem", width: "18rem", padding: "1rem", justifyContent: "start" }} sx={{
                            "&:hover": {
                                backgroundColor: theme.palette.primary.light,
                                cursor: "pointer",
                            }
                        }}>
                            <UserImage image={user.picturePath} size="40px" />
                            <Typography variant="h5">{user.userName}</Typography>
                        </FlexBetween>
                    </div>
                ))}

            </FlexBetween>}
        </FlexBetween>
        </>
    )
}

export default SearchComponent