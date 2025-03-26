import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserApi } from "../api/userApi";


const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData, { rejectWithValue }) => {

    const { id, ...updatedUserData } = userData; 
    if (!id) {
      return rejectWithValue("ID пользователя не найден"); 
    }

    try {
      const updatedUser = await updateUserApi(id, updatedUserData); 
      return updatedUser; 
    } catch (error) {
      console.error("Ошибка при обновлении пользователя:", error);
      return rejectWithValue(error.message); 
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      const existingIds = new Set(state.map((user) => user.id)); 
      const newUsers = action.payload.filter(user => !existingIds.has(user.id)); 
      state.push(...newUsers); 
    },
    updateUserInList: (state, action) => {
      const updatedUser = action.payload;
      const index = state.findIndex((user) => user._id === updatedUser._id);
      if (index !== -1) {
        state[index] = updatedUser; 
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const index = state.findIndex((user) => user._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload; 
      }
    });
  },
});

export { updateUser };
export const { setUsers, updateUserInList } = userSlice.actions;
export default userSlice.reducer;
