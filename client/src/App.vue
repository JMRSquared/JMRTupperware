<template>
  <div id="app" class="page-container">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" href="tel:0760487292">
              <md-icon>phone</md-icon>
            </md-button>
            <span class="md-title">JMR Tupperware</span>
          </div>
        </div>
  
        <div class="md-toolbar-row">
          <md-tabs  md-alignment="fixed" class="md-primary tabs">
            <md-tab class="tab" :class="{'active-tab':$route.path ==  '/'}" @click="$router.push('/')" id="tab-home" md-label="Home"></md-tab>
            <md-tab class="tab" :class="{'active-tab':$route.path ==  '/about'}" @click="$router.push('/about')" id="tab-about" md-label="About us"></md-tab>
            <md-tab class="tab md-toolbar-section-end md-alignment-right" :class="{'active-tab':$route.path ==  '/admin/home'}" @click="$router.push('/admin/home')" id="tab-login" md-label="Admin"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss">
$blueDarkColor: #0093a4;
$blueColor: #4ac4d5;
$blueLightColor: #84f7ff;

.m-y-15 {
  margin-top: 15px;
  margin-bottom: 15px;
}
.fullScreenLoading {
  position: absolute;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.white {
  background: white;
}
.red-text {
  color: #f70505;
}
.center-align {
  text-align: center;
}
.ribbon.right {
  position: absolute;
  right: -5px;
  top: -5px;
  z-index: 1;
  overflow: hidden;
  width: 150px;
  height: 150px;
  text-align: left;
}

.ribbon.right span {
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  line-height: 30px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  width: 150px;
  display: block;
  background: #79a70a;
  background: linear-gradient(#f70505 0%, #8f0808 100%);
  box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
  position: absolute;
  top: 28px;
  right: -32px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.active-tab {
  padding: 40px;
  font-weight: bold;
  color: #2c3e50;
  border-bottom: 2px solid #42b983;
}
</style>
