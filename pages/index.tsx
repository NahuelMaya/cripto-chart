import type { NextPage } from 'next'
import Head from 'next/head'
import Currencies from '../components/Currencies';
import { CurrenciesContextProvider, ChartContextProvider } from '../hooks/useChartContext'


const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Chart Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>CHOOSE YOUR CURRENCY</h1>
      <CurrenciesContextProvider >
        <Currencies />
      </CurrenciesContextProvider>
      <ChartContextProvider>
        <p>Chart</p>
      </ChartContextProvider>

    </div>
  )
}

export default Home


// const key = 'fa56b50ffb135c757990c440f199d188'
// const url = 'http://api.exchangeratesapi.io/v1/timeseries?access_key='
// const currencies = 'http://api.exchangeratesapi.io/v1/latest?access_key=fa56b50ffb135c757990c440f199d188&format=1'
