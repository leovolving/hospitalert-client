const {API_BASE_URL} = require('./config');
const axios = require('axios');


const initialState = {
	isLoggedIn: true,
	showNewHosp: false,
	hospitalizations: [],
	friendsSearchResults: []
};

//reducers
export const hospReducer = (state=initialState, action) => {

	switch(action.type) {

		case 'DELETE_HOSPITALIZATION':
			axios.delete(`${API_BASE_URL}/hospitalizations/${action.index}`);
			const editedDb = state.hospitalizations.filter(function(item) {
				return item.id !== action.index
			})
			state = Object.assign({}, state, {
				hospitalizations: editedDb
			});
			return state;

		case 'ADD_NEW_HOSP':
			axios.post(`${API_BASE_URL}/hospitalizations`, action.hosp);

		case 'FORM_TOGGLE':
			let newFormBoolean;
			const findItemToToggle = state.hospitalizations.filter(function(item) {
				if (item.id === action.index) {
					newFormBoolean = !item.isAForm;
					item.isAForm = newFormBoolean;
				}
				return item; 
			})
			axios.put(`${API_BASE_URL}/hospitalizations/${action.index}`, {
				id: action.index,
				isAForm: newFormBoolean
			});
			state = Object.assign({}, state, {
				hospitalizations: findItemToToggle
			});
			return state;

		case 'UPDATE_ITEM':
			const objForDb = {id: action.index};
			const possibleUpdates = ['condition', 'conscious', 'latestUpdate'];
			const targetDbItem = state.hospitalizations.filter(function(obj) {
				return obj.id === action.index
			});
			possibleUpdates.forEach(field => {
				if(field in action.object) {
					targetDbItem[0][field] = action.object[field];
					objForDb[field] = action.object[field];
				}
			})
			axios.put(`${API_BASE_URL}/hospitalizations/${action.index}`, objForDb);
			const newDb = state.hospitalizations.filter(function(item) {
				if (item.id === action.index) {
					return targetDbItem;
				}
				else {
					return item;
				}
			});
			state = Object.assign({}, state, {
				hospitalizations: newDb
			})
			return state;

			case 'NEW_HOSP_TOGGLE':
				const newHospToggle = !state.showNewHosp;
				state = Object.assign({}, state, {
					showNewHosp: newHospToggle
				})
				return state;

			case 'CREATE_NEW_USER':
				axios.post(`${API_BASE_URL}/users`, action.user);
				break;

			case 'GET_HOSPITALIZATIONS':
					state = Object.assign({}, state, {
						hospitalizations: action.hosps
					})
					return state;

			case 'SEARCH_FRIENDS':
				state = Object.assign({}, state, {
					friendsSearchResults: action.results
				})
				return state;


		default:
			return state;

	}
}