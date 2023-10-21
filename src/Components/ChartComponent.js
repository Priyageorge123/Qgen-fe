import React, { useEffect } from "react";
import { Chart } from "chart.js";
import "chartjs-plugin-labels";
import { ViewModuleSharp } from "@material-ui/icons";
var theHelp = Chart.helpers;

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
// Chart.plugins.register();

const colorPallete = {
  Knowledge: "#5C9F42",
  Comprehension: "#F6AE2D",
  Application: "#4285F4",
  Analysis: "#E85D75",
  Synthesis: "#99621E",
  Evaluation: "#49306B",
};

const ChartComponent = ({ data = [], modules, chartId }) => {
  const allLevels = [...new Set(data.map((el) => el.level))];
  const levelList = Object.keys(colorPallete).filter((el) =>
    allLevels.includes(el)
  );
  console.log(Object.keys(colorPallete));
  const levels = levelList.map((lev) =>
    data
      .filter((el) => el.level === lev)
      .reduce(function (a, b) {
        return a + b.mark;
      }, 0)
  );
  const total = levels.reduce(function (a, b) {
    return a + b;
  }, 0);
  data = levels.map((el) => ((el * 100) / total).toPrecision(2));
  console.log(levels, total);
  const dataGroup = {
    labels: levelList,
    datasets: [
      {
        label: "Dataset 1",
        data: data,
        backgroundColor: levelList.map((el) => colorPallete[el]),
      },
    ],
  };
  const config = {
    type: "doughnut",
    data: dataGroup,
    // plugins: [ChartDataLabels],
    options: {
      responsive: true,
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },

      legend: {
        display: true,
        position: "right",
        // generateLabels changes from chart to chart,  check the source,
        // this one is from the doughut :
        // https://github.com/chartjs/Chart.js/blob/master/src/controllers/controller.doughnut.js#L42
        labels: {
          generateLabels: function (chart) {
            var data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map(function (label, i) {
                var meta = chart.getDatasetMeta(0);
                var ds = data.datasets[0];
                var arc = meta.data[i];
                var custom = (arc && arc.custom) || {};
                var getValueAtIndexOrDefault = theHelp.getValueAtIndexOrDefault;
                var arcOpts = chart.options.elements.arc;
                var fill = custom.backgroundColor
                  ? custom.backgroundColor
                  : getValueAtIndexOrDefault(
                      ds.backgroundColor,
                      i,
                      arcOpts.backgroundColor
                    );
                var stroke = custom.borderColor
                  ? custom.borderColor
                  : getValueAtIndexOrDefault(
                      ds.borderColor,
                      i,
                      arcOpts.borderColor
                    );
                var bw = custom.borderWidth
                  ? custom.borderWidth
                  : getValueAtIndexOrDefault(
                      ds.borderWidth,
                      i,
                      arcOpts.borderWidth
                    );
                return {
                  // And finally :
                  text: ds.data[i] + "%  " + label,
                  fillStyle: fill,
                  strokeStyle: stroke,
                  lineWidth: bw,
                  hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },

      plugins: {
        title: {
          display: true,
          text: "Chart.js Pie Chart",
        },
        tooltip: {
          enabled: true,
        },
        labels: {
          render: "percentage",
          //   position: "outside",
          fontColor: function (data) {
            var rgb = hexToRgb(data.dataset.backgroundColor[data.index]);
            var threshold = 140;
            var luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
            return luminance > threshold ? "black" : "white";
          },
          precision: 1,
        },
      },
    },
  };
  useEffect(() => {
    var ctx = document.getElementById(chartId).getContext("2d");
    var chart = new Chart(ctx, config);

    return function cleanup() {
      chart.destroy();
    };
  }, []);
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full mx-auto max-w-xl flex justify-center ">
        <canvas id={chartId}></canvas>
      </div>
    </div>
  );
};

export default ChartComponent;
