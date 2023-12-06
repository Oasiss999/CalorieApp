import React from 'react';
import { Line } from 'react-chartjs-2';
import{View} from 'react-native';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};

function CalTrack() {
  return (
    <View>
      <Line data={data} options={options} />
    </View>
  );
}

export default CalTrack;    