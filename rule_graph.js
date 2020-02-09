const Graph = require("./graph.js");
const VariableManager = require("./variable_manager.js");
const { Action, NativeAction, NativeOperation, VariableName } = require("./primitives.js");

class RuleGraph extends Graph {
  rules = [];

  /**
   * 
   * @param {function(VariableManager):void} fn 
   */
  constructor(fn) {
    super();
    this.variableManager = new VariableManager();
    this.enter();
    fn(this.variableManager);
    this.exit();
  }

  push(rule) {
    this.rules.push(rule);
  }

  compile() {
    let buffer = ``;
    for (let rule of this.rules) {
      buffer += this.compileRule(rule) + `\n`;
    }
    return buffer;
  }

  compileRule(rule) {
    let buffer = ``;
    if (rule.event == null || rule.event == undefined) {
      // something ongoing global.
    }
    buffer += `rule("")\n{\n`;
    buffer += `\tevent\n\t{\n`;
    buffer += `\t\tOngoing - Global;\n`;
    buffer += `\t}\n`;
    buffer += `\tactions\n\t{\n`;
    buffer += this.compileActions(rule.actions);
    buffer += `\t}\n`;
    buffer += `}\n`;
    return buffer;
  }

  compileActions(actionGraph) {
    let buffer = ``;
    for (let action of actionGraph.actions) {
      if (action instanceof NativeAction) {
        buffer += `\t\t${action.nativeName}(${this.compileOperations(
          action.inputs
        )});\n`;
      } else {
        buffer += this.compileActions(action);
      }
    }
    return buffer;
  }

  compileOperations(operations) {
    let buffer = ``;
    buffer += operations
      .map(operation => {
        if (operation instanceof NativeOperation) {
          return (
            `${operation.nativeName}` +
            (operation.inputs.length > 0
              ? `(${this.compileOperations(operation.inputs)})`
              : "")
          );
        } else if (operation instanceof VariableName) {
          return operation.name;
        } else if (typeof operation == "string" || typeof operation == "number") {
          return JSON.stringify(operation);
        } else if (typeof operation == "function") {
          console.error("Did you forget a parentheses?");
        } else {
          return this.compileOperations(operation);
        }
      })
      .join(", ");
    return buffer;
  }
}

class Rule {
  constructor(args) {
    let ruleGraph = RuleGraph.currentGraph();
    ruleGraph.push(this);
    this.name = args.name;
    this.event = args.event;
    this.conditions = args.conditions;
    this.actions = new Action([], args.actions);
  }
}

module.exports = {
  RuleGraph,
  Rule,
};
