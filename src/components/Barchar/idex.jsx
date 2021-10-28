import { Doughnut, Bar,Pie,Line } from 'react-chartjs-2';
export  function Pier(props) {
    return (
        <div className="flex w-50">
            <Pie
                data={{
                    labels:props.legendas,
                      datasets: [{
                        label: 'My First Dataset',
                        data: props.dates,
                        backgroundColor: [
                          'rgb(255, 99, 132)',
                          'rgb(54, 162, 235)',
                          'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                      }]
                }}  >

            </Pie>

        </div>
    )
}


export  function Liner(props) {
    return (
        <div className="flex w-1/2 h-1/2" >
            <Line
                data={{
                    labels: props.legendas,
                    datasets: [{
                      label: 'My First Dataset',
                      data: props.dates,
                      fill: false,
                      borderColor: 'rgb(75, 192, 192)',
                      hoverOffset: 4,
                      tension: 0.1
                    }]
                }}  >

            </Line>

        </div>
    )
}


export  function Barchar(props) {
    return (
        <div className="flex w-1/2 h-1/2 ">
            <Bar
                data={{
                    labels:props.legendas,
                      datasets: [{
                        label: 'My First Dataset',
                        data: props.dates,
                        backgroundColor: [
                          'rgb(255, 99, 132)',
                          'rgb(54, 162, 235)',
                          'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                      }]
                }}  >

            </Bar>

        </div>
    )
}