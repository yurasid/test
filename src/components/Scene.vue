<template>
  <div @scroll="scrollHandler" class="wrapper">
    <button v-if="isDirty" @click="onSave" class="save">Save</button>
    <div ref="viewport" class="container">
      <Ruller class="ruller" :x="xCoords" :y="yCoords" />
      <div v-for="x in xCoords" :key="`$row${x}`">
        <div v-for="y in yCoords" :key="`row${x}cell${y}`">
          <Cell :x="x" :y="y" :id="`row${x}cell${y}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { throttle, range } from "lodash-es";
import { mapState } from 'vuex'
import Cell from "./Cell.vue";
import Ruller from './Ruller.vue'

export default {
  components: {
    Cell,
    Ruller
  },
  created() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  },
  data: () => ({
    x: 0,
    y: 0
  }),
  computed: {
    ...mapState({
      isDirty: state => state.isDirty
    }),
    xCoords() {
      const roundedWidth = this.roundTo(100, this.width);
      const left = this.roundTo(100, this.x);
      const right = left + roundedWidth;
      return range(left, right + (right - left) * 3, 100);
    },
    yCoords() {
      const roundedHeight = this.roundTo(40, this.height);
      const top = this.roundTo(40, this.y);
      const bottom = top + roundedHeight;
      return range(top, bottom + (bottom - top) * 3, 40);
    }
  },
  methods: {
    roundTo(round, number) {
      return Math.floor(number / round) * round;
    },
    scrollHandler() {
      const metrics = this.$refs.viewport.getBoundingClientRect();
      const absX = Math.abs(metrics.x)
      const absY = Math.abs(metrics.y)

      if (this.x < (this.x + this.width * 3) || this.x === 0) {
        this.x = absX;
      }
      if (this.y < (this.y + this.height * 3) || this.y === 0) {
        this.y = absY;
    onSave() {
      }
    },
      this.$store.commit('save')
    }
  }
};
</script>

<style lang="scss">
.wrapper {
  box-sizing: border-box;
  background-color: limegreen;
  max-width: 100vw;
  max-height: 100vh;
  overflow: scroll;
}

.save {
  position: fixed;
  font-size: 28px;
  bottom: 20px;
  right: 20px;
  z-index: 1;
  background-color: lightgreen;
  border: 1px solid green;
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: lighten(lightgreen, 10%)
  }
}

.ruller {
  position: absolute;
  top: 0px;
  left: 0px;
}

.container {
  position: relative;
  width: calc(40000 * 100px);
  height: calc(40000 * 20px);
}
</style>