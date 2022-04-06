import React from 'react'

interface Props {
    name: string,
    value: number,
    onClick: any
}
function Card({ name, value, onClick }: Props) {
    return (
        <div
            className="text-sm flex items-center bg-gray-600 text-white text bold p-5 justify-center h-4"
            key={name}
            onClick={() => onClick(name)}
        >
            <p >{`${name}:`}</p>
            <div className="ml-5">{(Math.round(value * 100) / 100).toFixed(2)}</div>
        </div>
    )
}

export const MemoizedCard = React.memo(Card);