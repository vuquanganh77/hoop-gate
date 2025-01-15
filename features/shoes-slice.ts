'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk để gọi API lấy danh sách shoes

interface Filters {
    minPrice?: string;
    maxPrice?: string;
    brands?: string;
    size?: string;
}

export const loadShoes = createAsyncThunk('shoes/load', async (filters: Record<string, any> = {}) => {
    try {
        const params = new URLSearchParams(filters).toString();

        const response = await fetch(`/api/shoes?${params}`, {
            method: 'GET',
        })

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const shoes = await response.json();

        return {shoes, filters};
    } catch (error) {
        throw new Error('An unexpected error occurred');
    }
});


export const addShoes = createAsyncThunk('shoes/add', async (new_shoes: Shoes) => {
    try {
        const formData = new FormData();
        formData.append('name', new_shoes.name);
        formData.append('description', new_shoes.description);
        formData.append('price', new_shoes.price.toString());
        formData.append('brand', new_shoes.brand);

        // Append the file field if it exists
        if (new_shoes.main_image) {
            formData.append('main_image', new_shoes.main_image); // The file field
        }
        if (new_shoes.gallery) {
            new_shoes.gallery.forEach((file, index) => {
                formData.append(`gallery[${index}]`, file); // Append each file individually
            });
        }
        // Gọi API để thêm giày mới vào DB
        const response = await fetch('/api/shoes', {
            method: 'POST',
            body: formData, // Use FormData as the body
        });

        if (!response.ok) {
            throw new Error('Failed to add new shoes');
        }

        const added_shoes = await response.json();

        return added_shoes;
    } catch (error) {
        console.error('Error adding new shoes:', error);
    }
})


export const editShoes = createAsyncThunk('shoes/edit', async (edited_shoes: Shoes) => {
    try {
        const formDataEdit = new FormData();
        formDataEdit.append('id', edited_shoes.id.toString());
        formDataEdit.append('name', edited_shoes.name);
        formDataEdit.append('description', edited_shoes.description);
        formDataEdit.append('price', edited_shoes.price.toString());
        formDataEdit.append('brand', edited_shoes.brand);

        // Append the file field if it exists
        if (edited_shoes.main_image) {
            formDataEdit.append('main_image', edited_shoes.main_image); // The file field
        }
        if (edited_shoes.gallery) {
            edited_shoes.gallery.forEach((file, index) => {
                formDataEdit.append(`gallery[${index}]`, file); // Append each file individually
            });
        }

        // Gọi API để edit giày trong DB
        const response = await fetch('/api/shoes', {
            method: 'PUT',
            body: formDataEdit, // Use FormData as the body
        });

        if (!response.ok) {
            throw new Error('Failed to edit shoes');
        }

        const shoes = await response.json();

        return shoes;

    } catch (error) {
        console.error('Error editing shoes:', error);
    }
})


export const deleteShoes = createAsyncThunk('shoes/delete', async (id: number) => {
    try {
        const response = await fetch('/api/shoes', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete shoes');
        }

        return id;
    } catch (error) {
        console.error('Error deleting shoes:', error);
    }
})


interface Shoes {
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

interface ShoesState {
    items: Shoes[];
    load_filter: string;
    loading: boolean;
    page_index: number;
    page_size: number;
}

const initialState: ShoesState = {
    items: [],
    load_filter: "",
    loading: false,
    page_index: 0,
    page_size: 10,
};

const shoesSlice = createSlice({
    name: 'shoes',
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
            .addCase(loadShoes.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadShoes.fulfilled, (state, action) => {
                state.items = action.payload.shoes;
                state.load_filter = action.payload.filters;
                state.loading = false;
                state.page_index = 0;
            })
            .addCase(loadShoes.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addShoes.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })
            .addCase(editShoes.fulfilled, (state, action) => {
                if(action.payload) {
                    state.items = state.items.map((shoe) => {
                        if (shoe.id === action.payload.id) {
                            return action.payload;
                        }
                        return shoe;
                    });
                }
                
            })
            .addCase(deleteShoes.fulfilled, (state, action) => {
                state.items = state.items.filter((shoe) => shoe.id !== action.payload);
            })
    },
});

export const { setPageIndex, setNextPage, setPrevPage, setPageSize } = shoesSlice.actions;

export default shoesSlice.reducer;
