import ChartJsImage from 'chartjs-to-image';

export default function generateChart(datasets, labels) {
  const myChart = new ChartJsImage();
  myChart.setConfig({
    type: 'line',
    data: {
      labels,
      datasets,
    },
    options: {
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: false,
          },
        }],
      },
    },
  });

  myChart.setWidth(500).setHeight(300).setBackgroundColor('#1F1F1F');
  return myChart.getShortUrl();
}
