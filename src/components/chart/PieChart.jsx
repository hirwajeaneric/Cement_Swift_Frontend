/* eslint-disable react/prop-types */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({data: stats}) {
  const data = {
    labels: ['Shipped', 'Paid'],
    datasets: [
      {
        label: '# of Votes',
        data: stats,
        backgroundColor: [
          'rgba(54, 62, 35, 0.2)',
          'rgba(192, 92, 192, 0.2)',
        ],
        borderColor: [
          'rgba(54, 62, 35, 1)',
          'rgba(192, 92, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}
