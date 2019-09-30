import Vue from "vue";
import Vuex from "vuex";
import { isUndefined } from "lodash-es";

let changesId = 0;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDirty: false,
    cells: new Map(),
    changes: new Map()
  },
  mutations: {
    set(state, cell) {
      state.isDirty = true;
      changesId++;

      const oldCell = state.cells.get(cell.id);

      state.cells.set(cell.id, cell);

      let changes;

      const isFieldChanged = (newObj, oldObj, value) =>
        (isUndefined(oldObj) && newObj[value]) ||
        (!isUndefined(oldObj) && oldObj[value] !== newObj[value]);

      if (isFieldChanged(cell, oldCell, "checkbox")) {
        changes = { checkbox: cell.checkbox };
      }
      if (isFieldChanged(cell, oldCell, "value")) {
        changes = { value: cell.value };
      }
      state.changes.set(changesId, {
        ...changes,
        ...{ id: cell.id, time: new Date().toISOString() }
      });
    },
    save(state) {
      state.isDirty = false;
      console.table(
        Array.from(state.changes).reduce(
          (acc, [key, value]) => ({
            ...acc,
            ...{ [key]: value }
          }),
          {}
        )
      );
      state.changes.clear();
    }
  },
  actions: {},
  getters: {
    get: state => id => {
      return state.cells.get(id);
    }
  }
});
