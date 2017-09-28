export default (state = {}, action) => {
    switch (action.type) {
        /*Register & Login both use an older version of middleware. Please switch to Redux-Thunk*/
        case 'LOGIN':
        case 'REGISTER':
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null,
                uid: action.uid
            };
        case 'LOGIN_PAGE_UNLOADED':
        case 'REGISTER_PAGE_UNLOADED':
            return {uid: state.uid};
        /*        case 'ASYNC_START':
         if (action.subtype === 'LOGIN' || action.subtype === 'REGISTER') {
         return {...state, inProgress: true};
         }
         break;*/
        case 'UPDATE_FIELD_AUTH':
            return {
                ...state,
                [action.key]: action.value
            };
        default:
            return {...state}
    }

    return state;
};
