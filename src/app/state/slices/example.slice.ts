import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState, TypedDispatch } from '../state';

interface IExampleState {
	count: number
}

const initialState: IExampleState = {
	count: 0
};

export const exampleSlice = createSlice({
	initialState,
	name: 'example',
	reducers: {
		setState: (state, action: PayloadAction<number>) => {
			state.count = action.payload;
		},
	}
});

export const { 
	setState
} = exampleSlice.actions;

// Async Thunk
// export const loadOrganisation = (someParam: string) => async (dispatch: TypedDispatch, getState: () => RootState) => {
// 	const state = getState();
// 	dispatch(setState({} as any));
// };

// Instant Get
// export const selectState = (state: RootState) => state;

export default exampleSlice.reducer;