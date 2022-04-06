
import { Dispatch } from 'react'
import { format, subDays } from 'date-fns'
import { chartActionsTypes, chartActions } from '../constants/actions'
type dayInfo = {
    date: string,
    value: number
}
interface ChartInfo {
    key: string,
    days: dayInfo[]
}

const key = '55278eca49a912b35b87bc4c9a4fef46'


export const fetchCurrencies = (dispatch: Dispatch<chartActionsTypes>) => {
    dispatch({ type: chartActions.CURRENCIES_REQUEST_START })

    fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${key}&format=1`)
        .then(response => response.json())
        .then((response: any) => {
            dispatch({ type: chartActions.CURRENCIES_REQUEST_SUCCESS, payload: response.rates })
        })
        .catch(() => { dispatch({ type: chartActions.CURRENCIES_REQUEST_ERROR }) })
}

export const getCurrencyHistory = async (dispatch: Dispatch<chartActionsTypes>, symbol: string) => {
    dispatch({ type: chartActions.GET_CURRENCY_INFO_REQUEST_START })
    const chartInfo: ChartInfo = {
        key: symbol,
        days: []
    }
    const toDay = new Date();

    for (let days = 0; days < 7; days++) {
        const date = subDays(toDay, days);
        const fullDate = format(date, 'yyyy-MM-dd')

        await fetch(`http://api.exchangeratesapi.io/v1/${fullDate}?access_key=${key}&symbols=${symbol}&format=1`)
            .then(response => response.json())
            .then((response: any) => {
                response?.rates?.[symbol] && chartInfo.days.push({ date: fullDate, value: response.rates[symbol] })
            })
    }
    dispatch({ type: chartActions.GET_CURRENCY_INFO_REQUEST_SUCCESS, payload: chartInfo })
}


