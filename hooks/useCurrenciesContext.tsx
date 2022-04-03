import { createContext, useReducer, useContext, Dispatch } from 'react'
import { chartActionsTypes } from '../constants/actions'


interface Currency {
    [key: string]: number
}

interface Currencies {
    currencies: Currency | null,
    loading: boolean
    error: boolean
}

const currenciesInitState: Currencies = {
    currencies: null,
    loading: false,
    error: false
}

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