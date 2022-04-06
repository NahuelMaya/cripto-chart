import { useEffect, useCallback } from 'react'
import { UseCurrenciesContext } from '../hooks/useCurrenciesContext'
import { UseChartContext } from '../hooks/useChartContext'
import { fetchCurrencies, getCurrencyHistory } from '../actions/actions'
import { MemoizedCard } from './Card'
import Error from './Error'
import Loading from './Loading'

function Currencies() {
    const [currencyState, currencyDispatch] = UseCurrenciesContext()
    const { currencies, loading, error } = currencyState


    const [chartState, chartDispatch] = UseChartContext()

    const handleCardClick = useCallback(name => {
        getCurrencyHistory(chartDispatch, name)
    }, [])

    useEffect(() => {
        fetchCurrencies(currencyDispatch)
    }, [])


    return (
        <section className={`w-full overflow-y-auto h-80 top-0 ${chartState.loading && 'pointer-events-none'}`}>
            {
                loading && !error &&
                <Loading />
            }
            {
                error && !loading &&
                <Error />
            }
            {
                currencies !== null && !loading && !error &&
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
