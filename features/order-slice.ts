import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Order {
    id: number;
    user_id: number;
    is_payment_online: number;
    total_price: number;
    createAt: string;
    updatedAt: string;
    status: number;
}

interface OrdersState {
    orders: Order[];
    loading: boolean;
}

const initialState: OrdersState = {
    orders: [],
    loading: false,
};


export const loadOrders = createAsyncThunk('order/load', async () => {
    try {
        const response = await fetch('/api/order/all', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }

        const { orders } = await response.json();
        console.log("result", orders);
        // setOrders(orders);


        // Fetch user names for each order
        const updatedOrders = await Promise.all(
            orders.map(async (order) => {
                const userResponse = await fetch(`/api/order/user/${order.user_id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!userResponse.ok) {
                    throw new Error(`Failed to fetch user details for user_id: ${order.user_id}`);
                }

                const user = await userResponse.json();
                const user_name = user.username

                // Append user_name to the order
                return { ...order, user_name };
            })
        );

        // console.log("day roi", updatedOrders);
        // setOrders(updatedOrders)

        // Reverse the array order
        const reversedOrders = updatedOrders.reverse();

        return reversedOrders;

    } catch (error) {
        console.error(error)
    }
});


export const updateOrder = createAsyncThunk(
    'order/update',
    async ({ id, status }: { id: number; status: number }, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/order/status', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status, id }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            const updatedOrder = await response.json();

            console.log("updatedOrder", status);
            

            if (status > 2) {
                console.log("vao day");
                
                const result = await fetch('/api/order/quantity', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id }),
                });

                console.log("sau khi cap nhat quantity", result);
                
            }

            const userResponse = await fetch(`/api/order/user/${updatedOrder.user_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!userResponse.ok) {
                throw new Error(`Failed to fetch user details for user_id: ${updatedOrder.user_id}`);
            }

            const user = await userResponse.json();
            const user_name = user.username

            return { ...updatedOrder, user_name };

        } catch (error: any) {
            console.error(error);
            return rejectWithValue(error.message || 'An error occurred');
        }
    }
);


const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.loading = false;
            })
            .addCase(loadOrders.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                const updatedOrder = action.payload;
                const index = state.orders.findIndex((order) => order.id === updatedOrder.id);
                if (index !== -1) {
                    state.orders[index] = updatedOrder;
                }
            });
    },
});



export default orderSlice.reducer;