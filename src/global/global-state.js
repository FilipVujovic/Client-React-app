import {createSlice, configureStore} from '@reduxjs/toolkit';
const initialAuthState = {isAuth : false, isAdmin : false, user : null}

const authSlice = createSlice({
    name: 'auth-slice',
    initialState : initialAuthState,
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

const initialFlightState = {flightId : 0};

const flightSlice = createSlice({
    name: 'flight-slice',
    initialState : initialFlightState,
    reducers : {
        setFlightState(state , action) {
             state.flightId = action.payload.flightId;   
             console.log(state.flightId);
        },
    },
});

const initialPackageState = {pack : ""}

const packageSlice = createSlice({
    name : 'package-slice',
    initialState : initialPackageState ,
    reducers : {
        setPackageState(state, action) {
            state.pack = action.payload.pack;
            console.log(action.payload.pack);
        }
    }
})

const store = configureStore({
    reducer: {auth : authSlice.reducer, flight: flightSlice.reducer, package: packageSlice.reducer},
});

export const packageActions = packageSlice.actions;
export const authActions = authSlice.actions;
export const flightActions = flightSlice.actions;
export default store;