<template>
  <div>
    <canvas id="planet-chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import { onMounted, ref } from "vue";

import planetChartData from "@/chartdata.js";

export default {
  props: {
    chartdata: Object
  },
  setup() {
    const chart_data = planetChartData;
    
	const createChart = (chartId, chartData) => {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    }

	onMounted(() => {
		createChart("planet-chart", chart_data);
	})

    
  }
};
</script>

<style>
</style>