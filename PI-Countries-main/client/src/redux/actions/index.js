import axios from 'axios';
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_DETAIL = 'GET_DETAIL';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION';
export const ORDER_BY_CONTINENT = 'ORDER_BY_CONTINENT';
export const GET_NAME_COUNTRIES = 'GET_NAME_COUNTRIES';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const POST_ACTIVITY = 'POST_ACTIVITY';
export const SET_DETAIL_COUNTRY = 'SET_DETAIL_COUNTRY';
// export const DELETE_COUNTRY = 'DELETE_COUNTRY';


// export const getCountries = () => {
//     return async function(dispatch) {
//         const res = await axios('http://localhost:3001/countries');
//         return dispatch({
//             type: GET_ALL_COUNTRIES,
//             payload: res.data
//         }); 
//     }

// }
export const getCountries = () => {
    return function (dispatch){
        return fetch('http://localhost:3001/countries')
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: GET_ALL_COUNTRIES,
                payload: data
            })
        })
    }
}

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export const orderByPopulation = (payload) => {
    return {
        type: ORDER_BY_POPULATION,
        payload
    }
}

export const orderByContinent = (continents) => {
    return {
        type: ORDER_BY_CONTINENT,
        payload: continents
    }
}

export const getNameCountries = (name) => {
    return async function(dispatch) {
        try {
            const res = await axios('http://localhost:3001/countries?name=' + name);
            return dispatch({
                type: GET_NAME_COUNTRIES,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}


export const getDetail = (id) => {
    return async function (dispatch) {
        try {
            const res = await axios('http://localhost:3001/countries/' + id);
            return dispatch({
                type: GET_DETAIL,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function setDetail() {
    return {
        type: SET_DETAIL_COUNTRY,
    }
}


export const getActivities = () => {
    return async function(dispatch) {
        const res = await axios.get('http://localhost:3001/activities');
        return dispatch({
            type: GET_ACTIVITIES,
            payload: res.data
        })
    }
}

export const postActivity = (payload) => {
    return async function() {
        const res = await axios.post('http://localhost:3001/activities', payload);
        return{
            type: POST_ACTIVITY,
            payload: res
        } 
    }
}

// export const deleteCountry = (name) => {
//     return {
//         type: DELETE_COUNTRY,
//         payload: name
//     }
// }