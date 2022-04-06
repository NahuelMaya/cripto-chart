import { createContext, useReducer, useContext, Dispatch } from 'react'
import { chartActionsTypes } from '../constants/actions'
interface chartActions {
    type: string
    payload?: any
}
interface Charts {
    chartSelected: string,
    data: any | null,
    loading: boolean
    error: boolean
}

const chartsInitState: Charts = {
    chartSelected: '',
    data: null,
    loading: false,
    error: false
}

const ChartContext = createContext<[Charts, Dispatch<chartActionsTypes>]>([{ ...chartsInitState }, () => { }])

function chartReducer(state: Charts, action: chartActions): Charts {
    const { type, payload } = action
    switch (type) {
        case 'GET_CURRENCY_INFO_REQUEST_START': {
            console.log('entre GET_CURRENCY_INFO_REQUEST_START')

            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case 'GET_CURRENCY_INFO_REQUEST_SUCCESS': {
            console.log('entre GET_CURRENCY_INFO_REQUEST_SUCCESS')
            return {
                ...state,
                data: { ...state.data, [payload.key]: [...payload.days] },
                chartSelected: payload.key,
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
