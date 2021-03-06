export default (state = {}, action) => {
    switch (action.type) {
        /*Register & Login both use an older version of middleware. Please switch to Redux-Thunk*/
        case 'LOGIN':
        case 'REGISTER':
            return {
                ...state,
                uid: action.user.uid
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
        case 'QUOTE_UPDATE':
            return {
                ...state,
                quoteMeta: action.quoteMeta
            };
        default:
            return {...state}
    }

    return state;
};
