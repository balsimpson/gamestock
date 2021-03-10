<template>
  <div>
    <!-- <div id="nav"> -->
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    <!-- </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
$accent-main: #e10081;
$cloud-off-white: #f7f8fb;
$cloud-shadow-gray: rgba(15, 25, 35, 0.05);
$cloud-shadow-main: rgba(239, 0, 115, 0.15);
$cloud-silver: #f1f3f4;
$cloud-gray: #dcdde1;
$cloud-light-gray: #eeeff1;
$cloud-dark-gray: #828488;
$cloud-black: #141d29;
$cloud-mid-gray: #bbbcbe;
$cloud-key: #0f1923;
$cloud-premium-black: #0a131c;
$cloud-navy-1: #202a35;
$cloud-navy-2: #2d3c4e;
$cloud-navy-0: #181e28;
$cloud-navy-3: #4b5a6c;
$cloud-navy-4: #738294;
$cloud-navy-5: #a3b2c3;
$cloud-neon-green: #18d26f;
$cloud-pale-green: #cff7e6;
$cloud-palest-green: #edfbf5;
$cloud-gray-green: #c6e5d840;
$cloud-yellow: #ffe158;
$cloud-pale-yellow: #fff792;
$cloud-pale-blue: #e7ebf4;
$cloud-green: #0cb56f;
$cloud-palest-blue: #f7f8fb;
$cloud-sky-blue: #f3f7fa;
$cloud-light-blue: #22d0ff;
$cloud-blue: #4862ff;
$cloud-purple-blue: #4862ff;
$cloud-dark-blue: #2f3fef;
$cloud-plum: #1f1c78;
$cloud-purple: #734cf2;
$cloud-pale-purple: #f3e8ff;
$cloud-pale-red: #ffc7c0;
$cloud-palest-red: #fff2f0;
$cloud-pink: #ec7f84;
$cloud-dark-pink: #e14f6c;
$cloud-pale-pink: #fcceca;
$cloud-orange: #ffa25c;
$cloud-pale-orange: #ffebdb;
$cloud-red: #fb5960;
$cloud-card-radius: 5px;
$cloud-border-radius: 5px;
$cloud-border-radius-sm: 3px;
$cloud-letter-spacing: -0.0125em;
$cloud-container-width: 74rem;
$cloud-container-sm-width: 64rem;
$cloud-container-lg-width: 100rem;
$cloud-border-light: rgba(15, 25, 35, 0.075);
$cloud-card-border-color: #dcdde1;
$cloud-cubic-bezier: cubic-bezier(0.16, 1.01, 0.93, 0.99);
$cloud-bg-skew: -5deg;
$cloud-bg-skew-left: 11deg;
$cloud-sandbox-color: var(--cloud-purple);
$cloud-code-bg: #36393c;
$cloud-sidebar-width: 228px;
$cloud-padding: 24px;
$cloud-account-header-top-height: 48px;
$cloud-console-sidebar-bg: var(--cloud-navy-1);
$cloud-console-bg: var(--cloud-palest-blue);
$cloud-console-header-bg: #fff;
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: $cloud-key;
  min-height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
