import React from "react";
import Chart from "react-apexcharts";

export function PieChart(props) {
  // console.log("props", props);
  const options = {
    chart: {
      type: "donut",
    },
    series: Object.values(props.data),
    labels: Object.keys(props.data),
    dataLabels: {
      enabled: true,
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
    fill: {
      colors: [
        "#12cf5a",
        "#1a5ebe",
        "#b11cd6",
        "#f7b11a",
        "#009688",
        "#76be43",
        "#7c4dff",
        "#d81b60",
        "#ff5722",
        "#607d8b",
        "#00e676",
        "#f06292",
        "#b388ff",
      ],
    },
    legend: {
      show: true,
      markers: {
        fillColors: [
          "#12cf5a",
          "#1a5ebe",
          "#b11cd6",
          "#f7b11a",
          "#009688",
          "#76be43",
          "#7c4dff",
          "#d81b60",
          "#ff5722",
          "#607d8b",
          "#00e676",
          "#f06292",
          "#b388ff",
        ],
      },
    },
    tooltip: {
      enabled: true,
      fillSeriesColor: true,
    },
    // chartOptions: {
    //   labels: Object.keys(props.data),
    // },
  };
  const series = [{}];

  return (
    <div className="container mx-auto flex justify-center">
      <Chart
        options={options}
        series={options.series}
        type="donut"
        labels={options.labels}
        width={480}
      />
    </div>
  );
}
