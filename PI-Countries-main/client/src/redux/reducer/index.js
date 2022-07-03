import { GET_ACTIVITIES, GET_ALL_COUNTRIES, GET_DETAIL, GET_NAME_COUNTRIES, ORDER_BY_CONTINENT, ORDER_BY_NAME, ORDER_BY_POPULATION, POST_ACTIVITY, SET_DETAIL_COUNTRY} from "../actions/index";

const initialState = {
    countries: [],
    countryDetail: {},
    activities: [],
    allCountries: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            };
        case GET_DETAIL:
            return {
                ...state,
                countryDetail: action.payload
            };
        case SET_DETAIL_COUNTRY:
            return {
                ...state,
                countryDetail: {}
            }
        case ORDER_BY_NAME:
            let sortedArr = action.payload === 'asc' ?
            state.countries.sort(function (a, b) {
                if(a.name > b.name) {
                    return 1;
                }
                if(b.name > a.name) {
                    return -1;
                }
                return 0;
            }) :
            state.countries.sort(function (a, b) {
                if(a.name > b.name) {
                    return -1;
                }
                if(b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                countries: sortedArr
            };
        case ORDER_BY_POPULATION:
            let sortedPopulation = action.payload === 'asc' ?
            state.countries.sort(function (a, b) {
                if(a.population > b.population) {
                    return 1;
                }
                if(b.population > a.population) {
                    return -1;
                }
                return 0;
            }) :
            state.countries.sort(function (a, b) {
                if(a.population > b.population) {
                    return -1;
                }
                if(b.population > a.population) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                countries: sortedPopulation
            };
            case GET_NAME_COUNTRIES:
                if(action.payload.length === 0){
                    return {
                        ...state,
                        error: 'not found'
                    }
                } else {

                    return {
                        ...state,
                        countries: action.payload
                    }
                }
            case POST_ACTIVITY:
                return {
                    ...state
                }
            case GET_ACTIVITIES:
                return {
                    ...state,
                    activities: action.payload
                }
            case ORDER_BY_CONTINENT:
                let continentsFilter = action.payload === 'All' ?
                state.allCountries : 
                state.allCountries.filter(e =>
                    e.continents === action.payload
                     )
                return {
                    ...state,
                    countries: continentsFilter
                }
            // case DELETE_COUNTRY:
            //     return {
            //         ...state,
            //         countries: state.countries.filter(e => e.name !== action.payload)
            //     }
        default:
            return {...state};
    }
}

export default rootReducer;