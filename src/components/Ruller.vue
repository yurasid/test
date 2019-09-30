<template>
  <div class="root">
    <div class="x" :style="{width: x[x.length - 1] + 'px'}">
      <div class="x-step" v-for="step in xAxis" :key="`x${step}`">{{step}}</div>
    </div>
    <div class="y" :style="{width: y[y.length - 1] + 'px'}">
      <div class="y-step" v-for="step in yAxis" :key="`y${step}`">
        <span>{{step}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ruller",
  props: ["x", "y"],
  computed: {
    xAxis() {
      return this.x.map(x => x / 100);
    },
    yAxis() {
      return this.y.map(y => y / 40);
    }
  }
};
</script>

<style lang="scss">
.x {
  display: flex;
  max-width: calc(100vw - 40px);
  overflow: hidden;
  padding-left: 80px;
}
.x-step {
  flex: 100px 0 0;
  height: 20px;
  text-align: right;
  background-color: blue;
  color: lightgrey;
}
.y {
  display: flex;
  max-width: calc(100vh - 20px);
  overflow: hidden;
  padding-left: 80px;
  transform: rotate(90deg) translate(calc(50vh + -90px), calc(50vh - 10px));
}
.y-step {
  flex: 40px 0 0;
  height: 80px;
  text-align: right;
  background-color: green;
  color: lightgrey;
  text-align: center;
  span {
    transform: rotate(-90deg);
    display: inline-block;
  }
}
</style>