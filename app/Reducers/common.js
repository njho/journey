import moment from 'moment';

let SelectedStartDate = moment().subtract(7, 'days');
var SelectedEndDate = moment();

const defaultState = {
};

export default(state = defaultState, action) => {
    switch (action.type) {
        case 'REDIRECT':
            return {...state, redirectTo: null};
        case 'LOGIN':
        case 'REGISTER':
            return {
                ...state,
                redirectTo: action.error ? null : '/home',
                register: action.register ? true : null
                /*
                 token: action.error ? null : action.payload.user.token,
                 currentUser: action.error ? null : action.payload.user*/
            };
        case 'LOGOUT':
            return {...state, redirectTo: '/', token: null, currentUser: null};
   /*     case'DATE_FILTER':
            console.log('DATE_FILTER')
            return {
                ...state,
                dateFilter: action.filter,
                startDate: action.startDate,
                endDate: action.endDate
            };*/
        case 'CAMPAIGN_META':
            return {
                ...state,
                campaignMeta: {
                    ...state.campaignMeta,
                    [action.campaign]: action.campaignMeta
                }
            }
        case 'CONSOLE_DATA':
            return {
                ...state,
                consoleData: action.consoleData
            }
        case 'CHART_DATA':
            return {
                ...state,
                chartData: {
                    ...state.chartData,
                    [action.campaign]: action.chartData
                },

                //TODO Update stats. Stats is going to have to be split so it contains campaign specific and global stats

                stats: {
                    ...state.stats,
                    [action.campaign]: {
                        gross: action.gross,
                        redeemed: action.redeemed,
                        new: action.newCustomers,
                        total: action.total,
                        percentChange: action.percentChange
                    }
                },
                loaderDisplay: false
            };
        case 'UPDATE_CHART_DATA':
            return {
                ...state,
                chartData: {
                    ...state.chartData,
                    [action.campaign]: action.chartData
                },
                dateFilter: action.filter,
                startDate: action.startDate,
                endDate: action.endDate,
                stats: {
                    ...state.stats,
                    [action.campaign]: {
                        gross: action.gross,
                        redeemed: action.redeemed,
                        new: action.newCustomers,
                        total: action.total,
                        percentChange: action.percentChange
                    }
                }

            };
        case 'AGGREGATE_CHART_DATA':
            return {
                ...state,
                aggregateChartData: action.aggregateChartData,
                aggregateStats: {
                    gross: action.gross,
                    redeemed: action.redeemed,
                    new: action.newCustomers,
                    total: action.total,
                    percentChange: action.percentChange
                },
                loaderDisplay: false

            }
        case 'LINK':
            return {
                ...state,
                links: {
                    [action.key]: action.link
                }

            }
        case 'MODAL_TOGGLE':
            return {
                ...state,
                modal_toggle: {
                    value: action.value,
                    child: action.child
                }
            }
        case 'DESKTOP':
            /*
             console.log(action.value);
             */
            return {
                ...state,
                desktop: action.value
            }
        case 'SIDEBAR_OPEN':
            /*    console.log('SIDEBAR_OPEN');
             console.log(action.value);*/
            return {
                ...state,
                sidebarOpen: action.value
            }
        case 'CAMPAIGN_SEARCH':
            return {
                ...state,
                campaignSearch: {
                    [action.campaign]: action.searchResult
                    /*  [action.key]: action.searchResult*/
                }
            }
        case 'CAMPAIGN_SEARCH_VALUE':
            return {
                ...state,
                campaignSearchValue: {
                    [action.campaign]: action.value
                }
            }
        default:
            return state;
    }
}