import React from "react";

import Chart from "react-apexcharts";
import ChartWrapper from "../sharedComponents/ChartWrapper";

const DashboardBarChart = ({ chartData }) => {
  const { options, series } = chartData;

  return (
    <ChartWrapper
      cardText="Tickets opened"
      iconName="bug"
      component={<Chart options={options} series={series} type="line" />}
    />
  );
};

export default DashboardBarChart;
