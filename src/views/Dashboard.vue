<template>
  <div class="uk-container">
    <div class="uk-flex uk-flex-between stock-overview">
      <div class="uk-text-left">
        <div class="uk-text-small uk-text-uppercase">Current Portfolio</div>
        <div class="uk-text-large uk-text-bold uk-flex uk-flex-middle">
          $5482.10
          <span class="stock-change"
            ><span uk-icon="triangle-up"></span> 1.65%</span
          >
        </div>
      </div>
      <div class="uk-text-right">
        <div class="uk-text-small uk-text-uppercase">Wallet</div>
        <div class="uk-text-large uk-text-bold uk-flex uk-flex-middle">
          $5482.10
        </div>
      </div>
    </div>

    <div class="uk-grid-collapse uk-child-width-expand table-header" uk-grid>
      <div class="uk-text-left">Symbol</div>
      <div class="uk-text-left">Name</div>
      <div class="uk-text-right">Shares</div>
      <div class="uk-text-right">Buying Price</div>
      <div class="uk-text-right">Current Price</div>
      <div class="uk-text-right">Value</div>
      <div class="uk-text-right">%Change</div>
    </div>

    <div class="uk-grid-collapse uk-child-width-expand table-item" uk-grid>
      <div class="uk-text-left">GME</div>
      <div class="uk-text-left">Gamestop</div>
      <div class="uk-text-right">200</div>
      <div class="uk-text-right">42</div>
      <div class="uk-text-right">48</div>
      <div class="uk-text-right">4,318</div>
      <div class="uk-text-right"><span uk-icon="triangle-up"></span>2.6%</div>
    </div>

    <div class="uk-grid-collapse uk-child-width-expand table-item" uk-grid>
      <div class="uk-text-left">GME</div>
      <div class="uk-text-left">Gamestop</div>
      <div class="uk-text-right">200</div>
      <div class="uk-text-right">42</div>
      <div class="uk-text-right">48</div>
      <div class="uk-text-right">4,318</div>
      <div class="uk-text-right"><span uk-icon="triangle-down"></span>2.6%</div>
    </div>

    <div class="uk-grid-collapse uk-child-width-expand table-item" uk-grid>
      <div class="uk-text-left">GME</div>
      <div class="uk-text-left">Gamestop</div>
      <div class="uk-text-right">200</div>
      <div class="uk-text-right">42</div>
      <div class="uk-text-right">48</div>
      <div class="uk-text-right">4,318</div>
      <div class="uk-text-right"><span uk-icon="triangle-up"></span>2.6%</div>
    </div>
  <BaseChart />
  </div>

  <!-- <canvas id="planet-chart"></canvas> -->
</template>

<script>
import Chart from "chart.js";
import planetChartData from "@/chartdata.js";
import BaseChart from "@/components/BaseChart.vue";
export default {
  components: {
    BaseChart,
  }
};
</script>

<style>
.stock-overview {
  color: #b8c8dc;
  padding-bottom: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #2c3e50;
}
.table-header {
  color: #b8c8dc;
  text-transform: uppercase;
  font-size: 0.8em;
  margin-bottom: 6px;
  padding: 0 10px;
}
.table-item {
  background: #2c3e50;
  color: #b8c8dc;
  padding: 10px;
  margin-bottom: 6px;
  border-radius: 8px;
  transition: background 0.3s ease-out;
}
.table-item:hover {
  background: #3e5974;
  /* color: #fff; */
}
.stock-change {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  font-size: 12px;
  border: 1px solid #3e5974;
  color: #3e5974;
  padding: 2px 6px;
}
</style>