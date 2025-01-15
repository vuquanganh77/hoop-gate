import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Comment {
    id: number;
    product_id: number;
    user_id: number;
    content: string;
    rating: number;
}

interface CommentState {
    comments: Comment[];
    loading: boolean;
}

const initialState: CommentState = {
    comments: [],
    loading: false,
};


export const loadComments = createAsyncThunk('comment/load', async (product_id: number) => {
    try {
        const response = await fetch(`/api/comments?product_id=${product_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }

        const result = await response.json();

        // Fetch user names for each order
        const updatedComments = await Promise.all(
            result.map(async (comment) => {
                const userResponse = await fetch(`/api/comments/user/${comment.user_id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!userResponse.ok) {
                    throw new Error(`Failed to fetch user details for user_id: ${comment.user_id}`);
                }

                const user = await userResponse.json();
                const user_name = user.username

                // Append user_name to the order
                return { ...comment, user_name };
            })
        );

        // console.log("fav data", result);

        return updatedComments;
    } catch (error) {
        console.error('Error loading favorites:', error);
    }
});





const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadComments.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.loading = false;
            })
            .addCase(loadComments.rejected, (state) => {
                state.loading = false;
            })

    },
});



export default commentSlice.reducer;