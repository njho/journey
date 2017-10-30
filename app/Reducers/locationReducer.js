const defaultState = {
    tab: 'transactions'
};

export default(state = defaultState, action) => {
    switch (action.type) {
        case 'CHANGE_TAB':{
            return {
                ...state,
                tab: action.tab
            };
        }
        default:
            return state;
    }
}