import { createContext, useReducer, useContext, Dispatch, useCallback, useState } from 'react'
import { chartActionsTypes } from '../constants/actions'


interface Currency {
    [key: string]: number
}

interface chartActions {
    type: string
    payload?: any
}

interface Currencies {
    currencies: Currency | null,
    loading: boolean
    error: boolean
}

interface Charts {
    data: any | null,
    loading: boolean
    error: boolean
}
const currenciesInitState: Currencies = {
    currencies: null,
    loading: false,
    error: false
}

const chartsInitState: Charts = {
    data: null,
    loading: false,
    error: false
}

const ChartContext = createContext<[Charts, Dispatch<chartActionsTypes>]>([{ ...chartsInitState }, () => { }])
const CurrenciesContext = createContext<[Currencies, Dispatch<chartActionsTypes>]>([{ ...currenciesInitState }, () => { }])

function currenciesReducer(state: Currencies, action: chartActions): Currencies {
    const { type, payload } = action
    switch (type) {
        case 'CURRENCIES_REQUEST_START': {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case 'CURRENCIES_REQUEST_SUCCESS': {
            return {
                ...state,
                currencies: payload,
                loading: false,
                error: false
            }
        }
        case 'CURRENCIES_REQUEST_ERROR': {
            return {
                ...state,
                loading: false,
                error: true
            }
        }
        default:
            return state
    }
}


function chartReducer(state: Charts, action: chartActions): Charts {
    const { type, payload } = action
    switch (type) {
        case 'GET_CURRENCY_INFO_REQUEST_START': {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case 'GET_CURRENCY_INFO_REQUEST_SUCCESS': {
            return {
                ...state,
                data: { ...payload },
                loading: false,
                error: false
            }
        }
        case 'GET_CURRENCY_INFO_REQUEST_ERROR': {
            return {
                ...state,
                loading: false,
                error: true
            }
        }
        default:
            return state
    }
}

export const ChartContextProvider = (props: any) => {
    const [state, dispatch] = useReducer(chartReducer, chartsInitState)
    return (
        <ChartContext.Provider value={[state, dispatch]} {...props} />
    )
}

export function UseChartContext() {
    const context = useContext(ChartContext)
    if (!context) {
        throw new Error('useChartContext must be used within the ChartContextProvider')
    }
    return context
}


export const CurrenciesContextProvider = (props: any) => {
    const [state, dispatch] = useReducer(currenciesReducer, currenciesInitState)
    return (
        <CurrenciesContext.Provider value={[state, dispatch]} {...props} />
    )
}

export function UseCurrenciesContext() {
    const context = useContext(CurrenciesContext)
    if (!context) {
        throw new Error('useCurrenciesContext must be used within the CurrenciesContextProvider')
    }
    return context
}

