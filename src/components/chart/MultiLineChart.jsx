/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Number of Trash Picked Up per Month',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


export function MultiLineChart({monthlyProductData}) {

  const data = {
    labels,
    datasets: [
      {
        label: 'Premium 42,5',
        data: monthlyProductData['Premium 42,5'],
        borderColor: 'rgba(192, 92, 192, 1',
        backgroundColor: 'rgba(192, 92, 192, 0.2)',
      },
      {
        label: 'Surebuild',
        data: monthlyProductData['Surebuild'],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Surecem',
        data: monthlyProductData['Surecem'],
        borderColor: 'rgb(0, 153, 51)',
        backgroundColor: 'rgba(0, 153, 51, 0.5)',
      },
      {
        label: 'Sureroad',
        data: monthlyProductData['Sureroad'],
        borderColor: 'rgb(255, 153, 51)',
        backgroundColor: 'rgba(255, 153, 51, 0.5)',
      },
      {
        label: 'Surewall',
        data: monthlyProductData['Surewall'],
        borderColor: 'rgb(204, 0, 0)',
        backgroundColor: 'rgba(204, 0, 0, 0.5)',
      }
    ],
  };
  return <Line options={options} data={data} />;
}
