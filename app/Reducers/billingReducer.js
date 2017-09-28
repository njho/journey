export default (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_TRANSACTIONS':
            return {
                ...state,
                transactions: action.transactions
            };
    }
    return state;
};
