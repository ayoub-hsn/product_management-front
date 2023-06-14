window.onload = function(){
    function showChart(labels,data1,data2){
        const data = {
            labels: labels,
            datasets: [
                {
                label: 'Done Tasks',
                data: data1,
                borderColor: [
                    '#4dc9f6',
                    '#f67019',
                    '#f53794',
                    '#537bc4',
                    '#acc236',
                    '#166a8f',
                    '#00a950',
                    '#58595b',
                    '#8549ba'
                    ],
                backgroundColor: [
                    '#4dc9f6',
                    '#f67019',
                    '#f53794',
                    '#537bc4',
                    '#acc236',
                    '#166a8f',
                    '#00a950',
                    '#58595b',
                    '#8549ba'
                    ],
                yAxisID: 'y',
                },
                {
                label: 'Reported Tasks',
                data: data2,
                borderColor: [
                    '#4dc9f6',
                    '#f67019',
                    '#f53794',
                    '#537bc4',
                    '#acc236',
                    '#166a8f',
                    '#00a950',
                    '#58595b',
                    '#8549ba'
                    ],
                backgroundColor: [
                    '#4dc9f6',
                    '#f67019',
                    '#f53794',
                    '#537bc4',
                    '#acc236',
                    '#166a8f',
                    '#00a950',
                    '#58595b',
                    '#8549ba'
                    ],
                yAxisID: 'y1',
                }
            ]
            };

          const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                interaction: {
                mode: 'index',
                intersect: false,
                },
                stacked: false,
                plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Line Chart - Multi Axis'
                }
                },
                scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',

                    // grid line settings
                    grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                },
                }
             },
            };

          const myChart = new Chart(
            document.getElementById('myChart'),
            config
          );
    }
}
