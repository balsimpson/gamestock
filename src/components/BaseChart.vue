<template>
  <div>
    <canvas id="stock-chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import { onMounted, computed, ref, watchEffect } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    chart: Object,
    title: String
  },
  setup(props) {
    const store = useStore();
    const stonks = ref([]);
    const createChart = (labels, data, title) => {
      const ctx = document.getElementById("stock-chart");
      let chart = chartOptions(props.chart.labels, props.chart.data, title);
      
      const myChart = new Chart(ctx, {
        type: chart.type,
        data: props.chart.data,
        options: chart.options,
      });
    };

    watchEffect(() => {
      // stonks.value = store.state.portfolio;
      // console.log('chart', props.chart);
      // createChart(store.state.portfolio[0].chart.labels, store.state.portfolio[0].chart.data, props.title);
    });

    onMounted(() => {
      createChart(props.labels, props.data, props.title);

    });
  },
};

const chartOptions = (labels, data, title) => {
  console.log('options', labels, data, title)
  let res = {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          // one line graph
          label: "High",
          data: data,
          backgroundColor: ["blue"],
          borderColor: ["rgba(54,73,93,1)"],
          borderWidth: 5,
          pointBorderWidth: 3,
          showLine: true,
          fill: true
        },
      ],
    },

    options: {
      responsive: true,
      title: {
        display: true,
        text: title,
      },
      lineTension: 0.2,

      scales: {
        xAxes: [
          {
            gridLines: {
              display: true,
              borderDash: [2, 5],
            },
            ticks: {
              sampleSize: 20,
              padding: 0,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              sampleSize: 10,
              padding: 0,
              beginAtZero: false,
            },
          },
        ],
      },
    },
  };

  return res;
};
</script>

<style>
</style>