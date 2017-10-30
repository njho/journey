const defaultState = {
    isTimeInput: false,
    isRadiusInput: false,
    duration: '1H',
    radius: 70,
    communityName: 'Yoga',
    description: "Yogi's come join us here to celebrate our wonderful bodies",
    region: {
        latitude: 37.78875,
        longitude: -122.4324,
        latitudeDelta: 0.0062,
        longitudeDelta: 0.0021,
    },
    farthestBeen: 0,
    formStatus: 0,
    communities: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'COMMUNITIES_DETECTED':
            return {
                ...state,
                communities: action.communities
            };
        case 'DESCRIPTION_UPDATED':
            return {
                ...state,
                description: action.description
            };
        case 'DURATION_SELECTED':
            return {
                ...state,
                duration: action.duration
            }


        case 'NAME_UPDATED':
            return {
                ...state,
                communityName: action.communityName
            };
        case 'RADIUS_TOGGLE':
            return {
                ...state,
                isRadiusInput: action.isRadiusInput
            };
        case 'SET_DESCRIPTION': {
            return {
                ...state,
                description: action.value
            }
        }
        case 'SET_COMMUNITY_NAME': {
            return {
                ...state,
                communityName: action.value
            }
        }
        case 'SET_FORM_STATUS':
        return {
            ...state,
            formStatus: action.value
        }
        case 'SET_FARTHEST_BEEN': {
            return {
                ...state,
                farthestBeen: action.value
            }
        }
        case 'SET_LOCATION': {
            return {
                ...state,
                region: action.region
            }
        }
        case 'SET_REGION':
            return {
                ...state,
                region: action.value
            }
        case 'SET_RADIUS':
            return {
                ...state,
                radius: action.radius
            }



        case 'TIME_TOGGLE':
            return {
                ...state,
                isTimeInput: action.isTimeInput
            };



    }

    return state;
};
