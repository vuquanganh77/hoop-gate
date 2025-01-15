import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API URL for user details
const API_URL = "/api/users";

// Async thunk to fetch user details
export const fetchUserDetails = createAsyncThunk(
    "user/fetchUserDetails",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Include cookies in the request
            });

            if (response.status === 401) {
                // If not signed in, resolve with `null`
                return null;
            }

            if (!response.ok) {
                throw new Error("Failed to fetch user details");
            }

            const data = await response.json();
            return data.user; // Return the user object
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Initial state for user slice
const initialState = {
    user: null, // To store the user object or `null` if not logged in
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null, // To store error messages
};

// User slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUserState: (state) => {
            state.user = null;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload; // `null` if not logged in
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Something went wrong";
                state.user = null; // Ensure user is set to `null` on failure
            });
    },
});

// Export actions
export const { clearUserState } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
