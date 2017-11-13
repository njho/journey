const defaultState = {
    subscriberSessionId: null

};

export default(state = defaultState, action) => {
    switch (action.type) {
        case 'STREAM_INFORMATION':{
            return {
                ...state,
                subscriberSessionId: action.sessionId
            };
        }
        default:
            return state;
    }
}