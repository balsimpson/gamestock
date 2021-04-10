<template>
  <div v-if="messages.length" class="ticker">Bal Simpson bought 50 shares of GME@145.07</div>
</template>

<script>
export default {
  name: "BaseTicker",
  setup() {
	  const messages = [];

	  return {messages}
  }
};
</script>

<style lang="scss" scoped>
.ticker {
  font-family: "Courier New", Courier, monospace;
  font-weight: 600;
  background: #666;
  color: white;
  padding: 10px;
  box-shadow: inset 0 0 4px 1px #ddbb24bd;
  border-radius: 10px;
}
</style>