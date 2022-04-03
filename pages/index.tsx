import type { NextPage } from 'next'
import Head from 'next/head'
import Currencies from '../components/Currencies';
import CurrencyChart from '../components/Chart';
import { ChartContextProvider } from '../hooks/useChartContext'
import { CurrenciesContextProvider } from '../hooks/useCurrenciesContext'


const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Chart Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='pl-5 mt-3'>CHOOSE YOUR CURRENCY</h1>
      <ChartContextProvider>
        <CurrenciesContextProvider >
          <Currencies />
        </CurrenciesContextProvider>
        <CurrencyChart />
      </ChartContextProvider>

    </div>
  )
}

export default Home
