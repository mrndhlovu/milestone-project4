import React from "react";

import Chart from "react-apexcharts";
import ChartWrapper from "../sharedComponents/ChartWrapper";

const DashboardPieChart = ({ chartData }) => {
  const { options, series } = chartData;

  return (
    <ChartWrapper
      cardText="Bug and Feature tickets opened"
      iconName="chart pie"
      component={<Chart options={options} series={series} type="line" />}
    />
  );
};

export default DashboardPieChart;
