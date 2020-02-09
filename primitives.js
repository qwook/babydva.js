const Graph = require('./graph.js');

class Action extends Graph {
  actions = [];

  constructor(inputs, fn) {
    super();
    this.enter();
    fn(inputs);
    this.exit();
  }
  push(action) {
    this.actions.push(action);
  }
}

/**
 * Raw building block for Overwatch actions.
 */
class NativeAction {
  constructor(nativeName, inputs) {
    this.nativeName = nativeName;
    this.inputs = inputs;
  }
}

class Operation extends Graph {
  constructor(inputs) {
    super();
    this.enter();
    fn(inputs);
    this.exit();
  }
}

/**
 * Raw building block for Overwatch operations.
 */
class NativeOperation {
  constructor(nativeName, inputs) {
    this.nativeName = nativeName;
    this.inputs = inputs || [];
  }
}

class VariableName {
  constructor(name) {
    this.name = name;
  }
}

module.exports = {
  Action,
  NativeAction,
  Operation,
  NativeOperation,
  VariableName
}