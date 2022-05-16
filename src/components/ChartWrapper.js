import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const optionsComparative = {
  indexAxis: "y",
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
};

export function BarChartComparative({
  data,
  labelProperty,
  mainConfig,
  secondConfig,
}) {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const mappedLabels = [...data].map((item) => item[labelProperty]);
    setLabels(mappedLabels);
  }, [data]);

  const dataObject = {
    labels,
    datasets: [
      {
        label: mainConfig.legend,
        data: labels.map((item, key) => {
          const mainValue =
            (data[key] && data[key][mainConfig.valueProperty]) || 0;
          return mainValue;
        }),
        backgroundColor: mainConfig.backgroundColor,
      },
      {
        label: secondConfig.legend,
        data: labels.map((item, key) => {
          const secondValue =
            (data[key] && data[key][secondConfig.valueProperty]) || 0;
          return secondValue;
        }),
        backgroundColor: secondConfig.backgroundColor,
      },
    ],
  };

  return (
    <Grid>
      <Bar
        options={optionsComparative}
        data={dataObject}
        width={400}
        height={400}
      />
    </Grid>
  );
}
