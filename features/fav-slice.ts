import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Fav {
    id: number;
    product_id: number;
    user_id: number;
}

interface FavState {
    favs: Fav[];
    loading: boolean;
}

const initialState: FavState = {
    favs: [],
    loading: false,
};


export const loadFavs = createAsyncThunk('fav/load', async (id: number) => {
    try {
        const response = await fetch(`/api/fav?user_id=${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch favorites');
        }

        const favoriteData = await response.json();


        // Fetch product details for each favorite
        const productPromises = favoriteData.map((fav) =>
            fetch(`/api/shoes/${fav.product_id}`)
                .then((res) => res.json())
                .then((product) => ({
                    ...product, 
                    ...fav, 
                }))
        );

        const productsWithFavorites = await Promise.all(productPromises);
        console.log("fav data", productsWithFavorites);

        return productsWithFavorites;
    } catch (error) {
        console.error('Error loading favorites:', error);
    }
});


export const removeFav = createAsyncThunk('fav/remove', async (id: number) => {
    try {
        const response = await fetch('/api/fav', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete fav');
        }

        return id;
    } catch (error) {
        console.error('Error deleting fav:', error);
    }
})




const favSlice = createSlice({
    name: 'fav',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadFavs.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadFavs.fulfilled, (state, action) => {
                state.favs = action.payload;
                state.loading = false;
            })
            .addCase(loadFavs.rejected, (state) => {
                state.loading = false;
            })
            .addCase(removeFav.fulfilled, (state, action) => {
                state.favs = state.favs.filter((fav) => fav.id !== action.payload);
            })
    },
});



export default favSlice.reducer;