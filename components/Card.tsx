import React from 'react'
import { getCurrencyHistory } from '../actions/actions'
import { UseChartContext } from '../hooks/useChartContext'

interface Props {
    name: string,
    value: number
}
function Card({ name, value }: Props) {
    const [, dispatch] = UseChartContext()
    const handleCardClick = () => {
        getCurrencyHistory(dispatch, name)
    }

    return (
        <div
            className="text-sm flex items-center bg-gray-600 text-white text bold p-5 justify-center h-4"
            key={name}
            onClick={handleCardClick}
        >
            <p >{`${name}:`}</p>
            <div className="ml-5">{value}</div>
        </div>
    )
}

export const MemoizedCard = React.memo(Card);