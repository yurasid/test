<template>
  <div class="cell" ref="cell" :style="{left: x + 'px', top: y + 'px'}">
    <label :class="{disabled: checkbox}">
      <input v-model="checkbox" type="checkbox" name="cell" />
    </label>
    <input v-model="input" :disabled="checkbox" type="number" name="number" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "Cell",

  props: ["x", "y", "id"],

  watch: {
    input(value, oldValue) {
      this.commitChange({ value });
    },
    checkbox(value, oldValue) {
      this.commitChange({ checkbox: value });
    }
  },

  computed: {
    ...mapGetters({ getValue: "get" })
  },

  created() {
    const cell = this.getValue(this.id);

    if (cell) {
      this.input = cell.value;
      this.checkbox = cell.checkbox;
    }
  },

  data: () => ({
    checkbox: undefined,
    input: null
  }),

  methods: {
    commitChange({ value = this.input, checkbox = this.checkbox }) {
      this.$store.commit("set", {
        value,
        checkbox,
        id: this.id
      });
    }
  }
};
</script>

<style scoped>
.cell {
  position: absolute;
  display: flex;
  width: 100px;
  padding: 10px 5px 10px 10px;
  height: 40px;
  box-sizing: border-box;
}

input[type="number"] {
  width: 100%;
}

label {
  background-color: yellow;
}

.disabled {
  background-color: lightgray;
}
</style>