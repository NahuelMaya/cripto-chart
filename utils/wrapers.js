
import * as React from 'react'
import {render as rtlRender} from '@testing-library/react'
import {ChartContextProvider} from '../hooks/useChartContext'
import {CurrenciesContextProvider} from '../hooks/useCurrenciesContext'



function render(ui, { ...options } = {}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const Wrapper = ({ children }) => (
        <ChartContextProvider>
         <CurrenciesContextProvider>
            {children}
          </CurrenciesContextProvider>
        </ChartContextProvider>
    );
    return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react'

export {render}