import { FILTER_ACTIVITY, GET_ACTIVITIES, GET_ALL_COUNTRIES, GET_DETAIL, GET_NAME_COUNTRIES, ORDER_BY_CONTINENT, ORDER_BY_NAME, ORDER_BY_POPULATION, POST_ACTIVITY, SET_DETAIL_COUNTRY} from "../actions/index";

const initialState = {
    countries: [],
    allCountries: [],
    setCountry: [],
    countryDetail: {},
    activities: [],
    stateActivity: [],
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
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()) {
                    return -1;
                }
                return 0;
            }) :
            state.countries.sort(function (a, b) {
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()) {
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
            case GET_ACTIVITIES:
                    return {
                        ...state,
                        stateActivity: action.payload
                    }
            case FILTER_ACTIVITY: 
              const allCountries = state.allCountries
              const typeActivity = action.payload === 'All' ? allCountries :
              allCountries.filter(e => e.activities && e.activities.map(e => e.name).includes(action.payload))
              console.log(typeActivity)
              console.log(action.payload, 'Payload')
              return{
                ...state,
                countries: typeActivity
              }

            // case ORDER_BY_UNDER_POPULATION: 
            // let population = action.payload === 'All' ?
            // state.allCountries :
            // state.allCountries.filter(e => 
            //     e.population < 2000000
            // )
            //     return{
            //         ...state,
            //         countries: population
            //     }
        default:
            return {...state};
    }
}

export default rootReducer;