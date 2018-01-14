const defaultState = {
    journeyPicker: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'JOURNEY_SELECTED':
            return {
                ...state,
                journeyPicker: action.selected
            }

    }

    return state;
};
