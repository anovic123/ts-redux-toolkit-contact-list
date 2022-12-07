import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { USERS_URL } from "../../../utils/constants";

export type UserItem = {
  name: string;
  username: string;
  email: string;
  avatar: string;
  id: string;
}

export interface UserState {
  data: UserItem | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  data: JSON.parse(localStorage.getItem('userData') || '{}'),
  status: 'idle',
}

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (userNameFromInput: string, { rejectWithValue }) => {
    try {
      const response = await fetch(USERS_URL);
      const usersList = await response.json() as UserItem[];
      return usersList.find(({ username }) => username === userNameFromInput )
    } catch(err) {
      return rejectWithValue(err)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload;
          localStorage.setItem('userData', JSON.stringify(action.payload))
        }
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectUserData = (state: RootState) => state.user.data;
export const selectUserStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;