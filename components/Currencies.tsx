import { useState, useEffect, useRef } from 'react'
import { UseCurrenciesContext } from '../hooks/useChartContext'
import { fetchCurrencies } from '../actions/actions'
import { MemoizedCard } from './Card'

function Currencies() {
    const [state, dispatch] = UseCurrenciesContext()
    const { currencies } = state

    useEffect(() => {
        fetchCurrencies(dispatch)
    }, [])

    return (
        <section className='w-full overflow-y-auto h-80 top-0'>
            {
                currencies !== null &&
                <div className='grid grid-cols-8 gap-4 p-5 content-center'>
                    {
                        Object.keys(currencies).map(key => <MemoizedCard name={key} value={currencies[key]} />)
                    }
                </div>
            }
        </section>
    )
}

export default Currencies
