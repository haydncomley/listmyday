import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState, TypedDispatch } from '../state';

interface ITemplateNameState {
}

const initialState: ITemplateNameState = {
};

export const templateNameSlice = createSlice({
	initialState,
	name: 'templateName',
	reducers: {
		setState: (state, action: PayloadAction<ITemplateNameState>) => {
			state = action.payload;
		},
	}
});

export const { 
	setState
} = templateNameSlice.actions;

// Async Thunk
// export const loadOrganisation = (someParam: string) => async (dispatch: TypedDispatch, getState: () => RootState) => {
// 	const state = getState();
// 	dispatch(setState({} as any));
// };

// Instant Get
// export const selectState = (state: RootState) => state;

export default templateNameSlice.reducer;