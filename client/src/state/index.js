import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: null,
  token: null,
  admin:null,
  block:null,
  posts: [],
  popUpContent: {
    title: "",
    desc: "",
    btn: "",
  },
  activePage:"signIn",
  alertOpen: false,
  alertDelete:false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUser:(state,action)=> {
      state.user = action.payload; 
    },
    setAdmin:(state,action)=> {
      state.admin = action.payload; 
    },
    setBlock:(state,action)=> {
      state.block = action.payload; 
    },
    setAlertOpen: (state,action) => {
      state.alertOpen = action.payload;
    },
    setAlertDelete: (state,action) => {
      state.alertDelete = action.payload;
    },
    setActivePage:(state,action) => {
      state.activePage = action.payload;
    },
    setPopUpContent: (state, action) => {
      state.popUpContent.title = action.payload.title;
      state.popUpContent.desc = action.payload.desc;
      state.popUpContent.btn = action.payload.btn;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setPopUpContent, setAlertOpen, setActivePage, setUser, setAlertDelete, setAdmin, setBlock } =
  authSlice.actions;
export default authSlice.reducer;
