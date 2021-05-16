import {createSlice, configureStore} from '@reduxjs/toolkit';

const initialState = {isAuth : false, isAdmin : false, user : null}

const authSlice = createSlice({
    name: 'auth-slice',
    initialState,
    reducers : {
        login(state, action) {
            state.isAuth = action.payload.isAuth;
            state.isAdmin = action.payload.isAdmin;
            state.user = action.payload.user;
            console.log(state.user);
        },
        logout(state) {
            state.isAuth = false;
            state.isAdmin = false;
            state.user = null;
            console.log(state.isAuth);
        }
    }
});

const store = configureStore({
    reducer: authSlice.reducer
});

export const authActions = authSlice.actions;

export default store;