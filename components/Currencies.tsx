import { useEffect, useCallback } from 'react'
import { UseCurrenciesContext } from '../hooks/useCurrenciesContext'
import { UseChartContext } from '../hooks/useChartContext'
import { fetchCurrencies, getCurrencyHistory } from '../actions/actions'
import { MemoizedCard } from './Card'

function Currencies() {
    const [currencyState, currencyDispatch] = UseCurrenciesContext()
    const { currencies } = currencyState

    useEffect(() => {
        fetchCurrencies(currencyDispatch)
    }, [])

    const [chartState, chartDispatch] = UseChartContext()

    const handleCardClick = useCallback(name => {
        getCurrencyHistory(chartDispatch, name)
    }, [])

    return (
        <section className='w-full overflow-y-auto h-80 top-0'>
            {
                currencies !== null &&
                <div className='grid grid-cols-8 gap-4 p-5 content-center'>
                    {
                        Object.keys(currencies).map(key => <MemoizedCard name={key} value={currencies[key]} key={key} onClick={handleCardClick} />)
                    }
                </div>
            }
        </section>
    )
}

export default Currencies
