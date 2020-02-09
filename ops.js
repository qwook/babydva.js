const { NativeOperation, VariableName } = require("./primitives.js");

function Null() {
  return new NativeOperation("Null");
}

let colors = {
  White: function() {
    return new NativeOperation("White");
  },
  Yellow: function() {
    return new NativeOperation("Yellow");
  },
  Green: function() {
    return new NativeOperation("Green");
  },
  Purple: function() {
    return new NativeOperation("Purple");
  },
  Red: function() {
    return new NativeOperation("Red");
  },
  Blue: function() {
    return new NativeOperation("Blue");
  },
  Team1: function() {
    return new NativeOperation("Team 1");
  },
  Team2: function() {
    return new NativeOperation("Team 2");
  },
  Aqua: function() {
    return new NativeOperation("Aqua");
  },
  Orange: function() {
    return new NativeOperation("Orange");
  },
  SkyBlue: function() {
    return new NativeOperation("Sky Blue");
  },
  Turquoise: function() {
    return new NativeOperation("Turquoise");
  },
  LimeGreen: function() {
    return new NativeOperation("Lime Green");
  }
};

let teams = {
  All: function() {
    return new NativeOperation("All Teams");
  },
  Team1: function() {
    return new NativeOperation("Team 1");
  },
  Team2: function() {
    return new NativeOperation("Team 2");
  }
};

let players = {
  EventPlayer: function() {
    return new NativeOperation("Event Player");
  },
  AllPlayers: function(team) {
    return new NativeOperation("All Players", [team ? team : teams.All()]);
  }
};

function compositeHelper(pieces, lastPiece, inputs) {
  let ops = [""];
  if (pieces.length > 0) {
    let top = pieces.splice(0, 1);
    ops[0] += top + "{0}";
    ops.push(inputs.splice(0, 1));
  }
  if (pieces.length > 0) {
    let top = pieces.splice(0, 1);
    ops[0] += top + "{1}";
    ops.push(inputs.splice(0, 1));
  }
  if (pieces.length > 0) {
    if (pieces.length > 1) {
      ops[0] += "{2}" + lastPiece;
      ops.push(compositeHelper(pieces, "", inputs));
    } else {
      let top = pieces.splice(0, 1);
      ops[0] += top + "{2}" + lastPiece;
      ops.push(inputs.splice(0, 1));
    }
  }
  for (let i = ops.length; i < 4; i++) {
    ops.push(Null());
  }
  return new NativeOperation("Custom String", ops);
}

let strings = {
  Custom: function(str, arg1 = Null(), arg2 = Null(), arg3 = Null()) {
    return new NativeOperation("Custom String", [str, arg1, arg2, arg3]);
  },
  Template: function(str, inputs) {
    const re = /{}/g;
    let start = 0;
    let parsed = [];
    while ((match = re.exec(str)) != null) {
      parsed.push(str.substr(start, match.index - start));
      start = match.index + match[0].length;
    }
    if (parsed.length != inputs.length) {
      throw "Inputs do not match amount of inline variables.";
    }
    lastPiece = str.substr(start);
    return compositeHelper(parsed, lastPiece, inputs.slice());
  },
  Icon: function(name) {
    return new NativeOperation("Icon String", [new VariableName(name)]);
  }
};

let location = {
  Top: function(str) {
    return new NativeOperation("Left");
  },
  Left: function() {
    return new NativeOperation("Left");
  },
  Right: function() {
    return new NativeOperation("Right");
  }
};

let reevaluation = {
  VisibleToAndString: function() {
    return new NativeOperation("Visible To and String");
  }
};

let spectators = {
  DefaultVisibility: function() {
    return new NativeOperation("Default Visibility");
  }
};

let variables = {
  GetGlobal: function(name) {
    return new NativeOperation("Global Variable", [new VariableName(name)]);
  },
  GetGlobalAtIndex: function(name, index) {
    return arrays.ValueAt(variables.GetGlobal(name), index);
  },
};

let arrays = {
  ValueAt: function(array, index) {
    return new NativeOperation("Value In Array", [array, index]);
  },
  IndexOf: function(array, value) {
    return new NativeOperation("Index Of Array Value", [array, value]);
  },
  RandomValue: function(array) {
    return new NativeOperation("Random Value In Array", [array]);
  }
}

module.exports = {
  EventPlayer: players.EventPlayer,
  Null,
  strings,
  colors,
  teams,
  players,
  location,
  reevaluation,
  spectators,
  variables,
  arrays
};
