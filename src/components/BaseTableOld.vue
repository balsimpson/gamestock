<template>
  <div class="table">
    <div class="uk-grid-collapse uk-child-width-expand table-header" uk-grid>
      <div class="uk-text-left">Symbol</div>
      <div class="uk-text-center">Type</div>
      <div class="uk-text-right">Shares</div>
      <div class="uk-text-right">Price</div>
      <div class="uk-text-right">%Change</div>
      <div class="uk-text-right">Type</div>
    </div>

    

    <div class="uk-grid-collapse uk-child-width-expand table-item uk-flex uk-flex-middle" uk-grid>
      <div class="uk-text-left">
        <div class="uk-text-small">GME</div>
        <div class="uk-text-left">Gamestop</div>
      </div>
      <div class="uk-text-center">
        <div class="btn uk-text-center">SELL</div>
      </div>
      <div class="uk-text-right">200</div>
      <div class="uk-text-right">42</div>
      <div class="uk-text-right"><span uk-icon="triangle-up"></span>2.6%</div>
      <div class="uk-text-right uk-text-small">21/03/2021 09:40 PM</div>
      
    </div>

    <div class="uk-grid-collapse uk-child-width-expand table-item uk-flex uk-flex-middle" uk-grid>
      <div class="uk-text-left">
        <div class="uk-text-small">GME</div>
        <div class="uk-text-left">Gamestop</div>
      </div>
      <div class="uk-text-center">
        <div class="btn uk-text-center">SELL</div>
      </div>
      <div class="uk-text-right">200</div>
      <div class="uk-text-right">42</div>
      <div class="uk-text-right"><span uk-icon="triangle-up"></span>2.6%</div>
      <div class="uk-text-right uk-text-small">21/03/2021 09:40 PM</div>
      
    </div>

    <div class="uk-grid-collapse uk-child-width-expand table-item uk-flex uk-flex-middle" uk-grid>
      <div class="uk-text-left">
        <div class="uk-text-small">GME</div>
        <div class="uk-text-left">Gamestop</div>
      </div>
      <div class="uk-text-center">
        <div class="btn uk-text-center">BUY</div>
      </div>
      <div class="uk-text-right">120</div>
      <div class="uk-text-right">142</div>
      <div class="uk-text-right"><span uk-icon="triangle-up"></span>1.6%</div>
      <div class="uk-text-right uk-text-small">21/03/2021 09:40 PM</div>
      
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.table {
  width: 90%;
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
  line-height: 1;
}
.table-item:hover {
  background: #3e5974;
  /* color: #fff; */
}
.btn {
  display: inline;
  font-size: 12px;
  padding: 4px 8px;
  background-color: transparent;
  width: 60px;
  text-align: center;
  border-radius: 6px;
  border: 1px solid;
}
</style>