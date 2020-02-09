const ops = require('./ops.js');
const actions = require('./actions.js');

module.exports = class VariableManager {
  constructor() {
    this.variableMap = {};
    this.variableCount = 0;
  }

  idByName(name) {
    if (this.variableMap[name] == undefined) {
      this.variableMap[name] = this.variableCount;
      this.variableCount++;
    }
    return this.variableMap[name];
  }

  setGlobal(name, value) {
    let id = this.idByName(name);
    actions.variables.SetGlobalAtIndex("A", id, value);
  }

  getGlobal(name) {
    let id = this.idByName(name);
    return ops.variables.GetGlobalAtIndex("A", id);
  }
}