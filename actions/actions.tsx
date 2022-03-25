
import { Dispatch } from 'react'
import { chartActionsTypes, chartActions } from '../constants/actions'

interface ChartInfo {
    key: string,
    values: number[]
}

const key = 'fa56b50ffb135c757990c440f199d188'


export const fetchCurrencies = (dispatch: Dispatch<chartActionsTypes>) => {
    dispatch({ type: chartActions.CURRENCIES_REQUEST_START })

    fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${key}&format=1`)
        .then(response => response.json())
        .then((response: any) => {
            dispatch({ type: chartActions.CURRENCIES_REQUEST_SUCCESS, payload: response.rates })
        })
        .catch(() => { dispatch({ type: chartActions.CURRENCIES_REQUEST_ERROR }) })
}

export const getCurrencyHistory = (dispatch: Dispatch<chartActionsTypes>, symbol: string) => {
    dispatch({ type: chartActions.GET_CURRENCY_INFO_REQUEST_START })
    let chartInfo: ChartInfo = {
        key: symbol,
        values: []
    }

    var date = new Date();

    for (let days = 0; days < 7; days++) {
        date.setDate(date.getDate() - 1);
        const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
        const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()
        const fullDate = `${date.getFullYear()}-${month}-${day}`

        fetch(`http://api.exchangeratesapi.io/v1/${fullDate}?access_key=${key}&symbols=${symbol}&format=1`)
            .then(response => response.json())
            .then((response: any) => {
                response.rates?.[symbol] && chartInfo.values.push(response.rates[symbol])
            })
    }
    dispatch({ type: chartActions.GET_CURRENCY_INFO_REQUEST_SUCCESS, payload: chartInfo })
}


