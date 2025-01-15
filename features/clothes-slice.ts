'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk để gọi API lấy danh sách shoes

interface Filters {
    minPrice?: string;
    maxPrice?: string;
    brands?: string;
    size?: string;
}

export const loadClothes = createAsyncThunk('clothes/load', async (filters: Record<string, any> = {}) => {
    try {
        const params = new URLSearchParams(filters).toString();
        const response = await fetch(`/api/clothes?${params}`, {
            method: 'GET',
        })

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const clothes = await response.json();

        return {clothes, filters};
    } catch (error) {
        throw new Error('An unexpected error occurred');
    }
});


export const addClothes = createAsyncThunk('clothes/add', async (new_clothes: Clothes) => {
    try {
        const formData = new FormData();
        formData.append('name', new_clothes.name);
        formData.append('description', new_clothes.description);
        formData.append('price', new_clothes.price.toString());
        formData.append('brand', new_clothes.brand);

        // Append the file field if it exists
        if (new_clothes.main_image) {
            formData.append('main_image', new_clothes.main_image); // The file field
        }
        if (new_clothes.gallery) {
            new_clothes.gallery.forEach((file, index) => {
                formData.append(`gallery[${index}]`, file); // Append each file individually
            });
        }
        // Gọi API để thêm quan ao mới vào DB
        const response = await fetch('/api/clothes', {
            method: 'POST',
            body: formData, // Use FormData as the body
        });

        if (!response.ok) {
            throw new Error('Failed to add new new_clothes');
        }

        const added_clothes = await response.json();

        return added_clothes;
    } catch (error) {
        console.error('Error adding new clothes:', error);
    }
})


export const editClothes = createAsyncThunk('clothes/edit', async (edited_clothes: Clothes) => {
    try {
        const formDataEdit = new FormData();
        formDataEdit.append('id', edited_clothes.id.toString());
        formDataEdit.append('name', edited_clothes.name);
        formDataEdit.append('description', edited_clothes.description);
        formDataEdit.append('price', edited_clothes.price.toString());
        formDataEdit.append('brand', edited_clothes.brand);

        // Append the file field if it exists
        if (edited_clothes.main_image) {
            formDataEdit.append('main_image', edited_clothes.main_image); // The file field
        }

        // Gọi API để edit giày trong DB
        const response = await fetch('/api/clothes', {
            method: 'PUT',
            body: formDataEdit, // Use FormData as the body
        });

        if (!response.ok) {
            throw new Error('Failed to edit clothes');
        }

        const clothes = await response.json();

        return clothes;

    } catch (error) {
        console.error('Error editing clothes:', error);
    }
})


export const deleteClothes = createAsyncThunk('clothes/delete', async (id: number) => {
    try {
        const response = await fetch('/api/clothes', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete clothes');
        }

        return id;
    } catch (error) {
        console.error('Error deleting clothes:', error);
    }
})


interface Clothes {
    quantity: number;
    main_url: string | null;
    id: number;
    name: string;
    description: string;
    price: number;
    brand: string;
    createAt: string;
    updatedAt: string;
    main_image?: File;
    gallery?: File[];
}

interface ClothesState {
    items: Clothes[];
    load_filter: string;
    loading: boolean;
    page_index: number;
    page_size: number;
}

const initialState: ClothesState = {
    items: [],
    load_filter: "",
    loading: false,
    page_index: 0,
    page_size: 10,
};

const clothesSlice = createSlice({
    name: 'clothes',
    initialState,
    reducers: {
        setPageIndex: (state, action) => {
            state.page_index = action.payload; // Update the page index
        },
        setNextPage: (state) => {
            state.page_index += 1; // Go to the next page
        },
        setPrevPage: (state) => {
            state.page_index -= 1; // Go to the previous page
        },
        setPageSize: (state, action) => {
            state.page_size = action.payload; // Update the page size
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadClothes.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadClothes.fulfilled, (state, action) => {
                state.items = action.payload.clothes;
                state.load_filter = action.payload.filters;
                state.loading = false;
                state.page_index = 0;
            })
            .addCase(loadClothes.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addClothes.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })
            .addCase(editClothes.fulfilled, (state, action) => {
                if(action.payload) {
                    state.items = state.items.map((clothe) => {
                        if (clothe.id === action.payload.id) {
                            return action.payload;
                        }
                        return clothe;
                    });
                }
                
            })
            .addCase(deleteClothes.fulfilled, (state, action) => {
                state.items = state.items.filter((clothe) => clothe.id !== action.payload);
            })
    },
});

export const { setPageIndex, setNextPage, setPrevPage, setPageSize } = clothesSlice.actions;

export default clothesSlice.reducer;
