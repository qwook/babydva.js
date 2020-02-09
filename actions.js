const ops = require("./ops.js");
const { NativeAction, VariableName, Action } = require("./primitives.js");

let variables = {
  SetGlobal: function(name, value) {
    let graph = Action.currentGraph();
    graph.push(
      new NativeAction("Set Global Variable", [new VariableName(name), value])
    );
  },
  SetGlobalAtIndex: function(name, index, value) {
    let graph = Action.currentGraph();
    graph.push(
      new NativeAction("Set Global Variable At Index", [
        new VariableName(name),
        index,
        value
      ])
    );
  }
};

function CreateHudText(
  visibleTo,
  header,
  subHeader,
  text,
  location,
  sortOrder,
  headerColor,
  subHeaderColor,
  textColor,
  reevaluation,
  spectators
) {
  let graph = Action.currentGraph();
  graph.push(
    new NativeAction("Create Hud Text", [
      visibleTo,
      header,
      subHeader,
      text,
      location,
      sortOrder,
      headerColor,
      subHeaderColor,
      textColor,
      reevaluation,
      spectators
    ])
  );
}

/**
 * SimpleHudTextArgs
 * @typedef {Object} SimpleHudTextArgs
 * @property {any} visibleTo - Indicates whether the Courage component is present.
 * @property {any} header - Indicates whether the Power component is present.
 * @property {any} subHeader - Indicates whether the Wisdom component is present.
 * @property {any} text - Indicates whether the Wisdom component is present.
 * @property {any} subHeader - Indicates whether the Wisdom component is present.
 * @property {any} location - Indicates whether the Wisdom component is present.
 * @property {any} sortOrder - Indicates whether the Wisdom component is present.
 * @property {any} headerColor - Indicates whether the Wisdom component is present.
 * @property {any} subHeaderColor - Indicates whether the Wisdom component is present.
 * @property {any} textColor - Indicates whether the Wisdom component is present.
 * @property {any} reevaluation - Indicates whether the Wisdom component is present.
 * @property {any} spectators - Indicates whether the Wisdom component is present.
 */
/**
 * Utility function to create Hud texts using only options that are needed.
 * @param {SimpleHudTextArgs} argsObj
 */
function SimpleHudText(argsObj) {
  let header = argsObj.header;
  if (typeof header == "string") {
    header = ops.strings.Custom(header);
  }
  let subHeader = argsObj.subHeader;
  if (typeof subHeader == "string") {
    subHeader = ops.strings.Custom(subHeader);
  }
  let text = argsObj.text;
  if (typeof text == "string") {
    text = ops.strings.Custom(text);
  }
  CreateHudText(
    argsObj.visibleTo != undefined
      ? argsObj.visibleTo
      : ops.players.AllPlayers(),
    header != undefined ? header : ops.Null(),
    header != undefined ? header : ops.Null(),
    text != undefined ? text : ops.Null(),
    argsObj.location != undefined ? argsObj.location : ops.location.Top(),
    argsObj.sortOrder != undefined ? argsObj.sortOrder : 1.0,
    argsObj.headerColor != undefined ? argsObj.headerColor : ops.colors.Blue(),
    argsObj.subHeaderColor != undefined
      ? argsObj.subHeaderColor
      : ops.colors.Red(),
    argsObj.textColor != undefined ? argsObj.textColor : ops.colors.Red(),
    argsObj.reevaluation != undefined
      ? argsObj.reevaluation
      : ops.reevaluation.VisibleToAndString(),
    argsObj.spectators != undefined
      ? argsObj.spectators
      : ops.spectators.DefaultVisibility()
  );
}

module.exports = {
  variables,
  Kill: function(players) {
    let graph = Action.currentGraph();
    graph.push(new NativeAction("Kill", [players]));
  },
  CreateHudText,
  SimpleHudText
};
