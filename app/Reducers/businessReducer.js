import moment from 'moment';
const defaultState = {
    editGifty: {
        name: null,
        description: null,
        how_to_redeem: null,
        price: null,
        gst: null,
        gst_percent: null,
        dollars: null,
        emojis: []
    }
};

export default(state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_GIFTY':
            return {
                ...state,
                editGiftyKey: action.key,
                editGifty: action.editGifty
            };
        default:
            return state;

    }

}