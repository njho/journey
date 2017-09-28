import moment from 'moment';

let SelectedStartDate = moment().subtract(7, 'days');
var SelectedEndDate = moment();

const defaultState = {
    aggregateStats: {
        gross: 0,
        redeemed: 0,
        new: 0,
        total: 0,
        percentChange: {
            value: 'N/A',
            description: 'No change data available!'
        }
    },
    currentDate: SelectedEndDate,
    dateFilter: 1,

    startDate: SelectedStartDate,
    endDate: SelectedEndDate,
    modal_toggle: {
        value: 'close',
        child: null
    },
    sidebarOpen: false,
    "links": {
        defaultLink: null
    },
    loaderDisplay: true,
    campaignMeta: {
        default_email_gift: ''
    },
    chartData: {},
    campaignSearch: {},
    campaignSearchValue: '',
    stats: {},
    consoleData: {
        "active_campaigns": {
            campaign: null
        },
        "agreements": {
            "-KmMclctWZDKexyM_9Xo": {
                "active": true,
                "owner": "console_1"
            }
        },
        "name": "Console One",
        "campaigns": {
            campaign: 'default'
        },
        "giftys": {
            "": {
                "city": "",
                "keyword": "",
                "lang": {
                    "gift": "",
                    "gift_from": "",
                    "gift_short": "",
                    "how_to_redeem": ""
                },
                description: "",
                "price": {
                    "display": "",
                    "stripe": {
                        "all_fees_pct": null,
                        "application_fee": null,
                        "cents": null,
                        "currency": null,
                        "stripe_fee": null
                    }
                },
                "vendor": "gravity_yyc"
            }
        },
        "notifications": {
            "uid": {
                message: null
            }
        },
        "payment": {
            "balance": {
                "cad": {
                    "cents": null
                }
            }
        },
        "console_id": "console_1"
    }
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