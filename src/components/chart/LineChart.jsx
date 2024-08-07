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


export function LineChart({monthlyOrders}) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: monthlyOrders,
        borderColor: 'rgba(192, 92, 192, 1',
        backgroundColor: 'rgba(192, 92, 192, 0.2)',
      }
    ],
  };
  return <Line options={options} data={data} />;
}
