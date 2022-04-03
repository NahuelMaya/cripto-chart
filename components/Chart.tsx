import React, { useRef, useEffect, useState } from 'react';
import type { ChartData, ChartArea } from 'chart.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { UseChartContext } from '../hooks/useChartContext'
import Loading from './Loading'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

//const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const colors = [
    'red',
    'orange',
    'yellow',
    'lime',
    'green',
    'teal',
    'blue',
    'purple',
];



function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
    const colorStart = 'blue';
    const colorMid = 'red'
    const colorEnd = 'green'

    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(0.5, colorMid);
    gradient.addColorStop(1, colorEnd);

    return gradient;
}

export default function CurrencyChart() {
    const chartRef = useRef<ChartJS>(null);
    const [chartData, setChartData] = useState<ChartData<'bar'>>({
        datasets: [],
    });
    const [state] = UseChartContext()

    const { chartSelected, data, loading } = state

    useEffect(() => {
        const chart = chartRef.current;

        if (!chart) {
            return;
        }
        if (!!data && data[chartSelected].length > 0) {
            const chartData = {
                labels: data[chartSelected].map((e: { date: string; }) => e.date).reverse(),
                datasets: [
                    {
                        label: chartSelected,
                        data: data[chartSelected].map((e: { value: number; }) => e.value),
                        borderColor: createGradient(chart.ctx, chart.chartArea),
                    },
                ],
            }
            setChartData(chartData);
        };
    }, [data]);

    return loading ? <Loading /> : <Chart className='p-10 ' ref={chartRef} type='line' data={chartData} />;
}
