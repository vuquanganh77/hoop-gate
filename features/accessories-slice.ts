'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk để gọi API lấy danh sách accessories

interface Filters {
    minPrice?: string;
    maxPrice?: string;
    brands?: string;
    size?: string;
}

export const loadAccessories = createAsyncThunk('accessories/load', async (filters: Record<string, any> = {}) => {
    try {
        const params = new URLSearchParams(filters).toString();
        const response = await fetch(`/api/accessories?${params}`, {
            method: 'GET',
        })

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const accessories = await response.json();

        return {accessories, filters};
    } catch (error) {
        throw new Error('An unexpected error occurred');
    }
});


export const addAccessories = createAsyncThunk('accessories/add', async (new_accessories: Accessories) => {
    try {
        const formData = new FormData();
        formData.append('name', new_accessories.name);
        formData.append('description', new_accessories.description);
        formData.append('price', new_accessories.price.toString());
        formData.append('brand', new_accessories.brand);

        // Append the file field if it exists
        if (new_accessories.main_image) {
            formData.append('main_image', new_accessories.main_image); // The file field
        }
        if (new_accessories.gallery) {
            new_accessories.gallery.forEach((file, index) => {
                formData.append(`gallery[${index}]`, file); // Append each file individually
            });
        }
        // Gọi API để thêm giày mới vào DB
        const response = await fetch('/api/accessories', {
            method: 'POST',
            body: formData, // Use FormData as the body
        });

        if (!response.ok) {
            throw new Error('Failed to add new accessories');
        }

        const added_accessories = await response.json();

        return added_accessories;
    } catch (error) {
        console.error('Error adding new accessories:', error);
    }
})


export const editAccessories = createAsyncThunk('accessories/edit', async (edited_accessories: Accessories) => {
    try {
        const formDataEdit = new FormData();
        formDataEdit.append('id', edited_accessories.id.toString());
        formDataEdit.append('name', edited_accessories.name);
        formDataEdit.append('description', edited_accessories.description);
        formDataEdit.append('price', edited_accessories.price.toString());
        formDataEdit.append('brand', edited_accessories.brand);

        // Append the file field if it exists
        if (edited_accessories.main_image) {
            formDataEdit.append('main_image', edited_accessories.main_image); // The file field
        }

        // Gọi API để edit giày trong DB
        const response = await fetch('/api/accessories', {
            method: 'PUT',
            body: formDataEdit, // Use FormData as the body
        });

        if (!response.ok) {
            throw new Error('Failed to edit accessories');
        }

        const accessories = await response.json();

        return accessories;

    } catch (error) {
        console.error('Error editing accessories:', error);
    }
})


export const deleteAccessories = createAsyncThunk('accessories/delete', async (id: number) => {
    try {
        const response = await fetch('/api/accessories', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete accessories');
        }

        return id;
    } catch (error) {
        console.error('Error deleting accessories:', error);
    }
})


interface Accessories {
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

interface AccessoriesState {
    items: Accessories[];
    load_filter: string;
    loading: boolean;
    page_index: number;
    page_size: number;
}

const initialState: AccessoriesState = {
    items: [],
    load_filter: "",
    loading: false,
    page_index: 0,
    page_size: 10,
};

const accessoriesSlice = createSlice({
    name: 'accessories',
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
            .addCase(loadAccessories.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadAccessories.fulfilled, (state, action) => {
                state.items = action.payload.accessories;
                state.load_filter = action.payload.filters;
                state.loading = false;
                state.page_index = 0;
            })
            .addCase(loadAccessories.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addAccessories.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })
            .addCase(editAccessories.fulfilled, (state, action) => {
                if(action.payload) {
                    state.items = state.items.map((accessorie) => {
                        if (accessorie.id === action.payload.id) {
                            return action.payload;
                        }
                        return accessorie;
                    });
                }
                
            })
            .addCase(deleteAccessories.fulfilled, (state, action) => {
                state.items = state.items.filter((accessorie) => accessorie.id !== action.payload);
            })
    },
});

export const { setPageIndex, setNextPage, setPrevPage, setPageSize } = accessoriesSlice.actions;

export default accessoriesSlice.reducer;
