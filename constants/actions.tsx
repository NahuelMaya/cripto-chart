export const chartActions = {
    CURRENCIES_REQUEST_START: 'CURRENCIES_REQUEST_START',
    CURRENCIES_REQUEST_SUCCESS: 'CURRENCIES_REQUEST_SUCCESS',
    CURRENCIES_REQUEST_ERROR: 'CURRENCIES_REQUEST_ERROR',
    SET_CURRENCY_SELECTED: 'SET_CURRENCY_SELECTED',
    GET_CURRENCY_INFO_REQUEST_START: 'GET_CURRENCY_INFO_REQUEST_START',
    GET_CURRENCY_INFO_REQUEST_SUCCESS: 'GET_CURRENCY_INFO_REQUEST_SUCCESS',
    GET_CURRENCY_INFO_REQUEST_ERROR: 'GET_CURRENCY_INFO_REQUEST_ERROR'
}

interface Currency {
    [key: string]: number
}

type currenciesRequestStart = {
    type: typeof chartActions.CURRENCIES_REQUEST_START
}

type currenciesRequestSuccess = {
    type: typeof chartActions.CURRENCIES_REQUEST_SUCCESS
    payload: Currency,
}

type currenciesRequestError = {
    type: typeof chartActions.CURRENCIES_REQUEST_ERROR
}

type setCurrencySelected = {
    type: typeof chartActions.SET_CURRENCY_SELECTED
    payload: Currency
}

type getCurrencyInfoSelectedStart = {
    type: typeof chartActions.GET_CURRENCY_INFO_REQUEST_START
}

type getCurrencyInfoSelectedSuccess = {
    type: typeof chartActions.GET_CURRENCY_INFO_REQUEST_SUCCESS
    payload: any
}

type getCurrencyInfoSelectedError = {
    type: typeof chartActions.GET_CURRENCY_INFO_REQUEST_ERROR
}

export type chartActionsTypes =
    currenciesRequestStart
    | currenciesRequestSuccess
    | currenciesRequestError
    | setCurrencySelected
    | getCurrencyInfoSelectedStart
    | getCurrencyInfoSelectedSuccess
    | getCurrencyInfoSelectedError