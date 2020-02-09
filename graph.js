class Graph {
  static _graphStack = [];

  static currentGraph() {
    return Graph._graphStack[Graph._graphStack.length - 1];
  }

  enter() {
    Graph._graphStack.push(this);
  }

  exit() {
    Graph._graphStack.pop();
  }
}

module.exports = Graph;
