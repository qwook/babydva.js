const ow = require("./index.js");
const { ops } = ow;

const graph = new ow.RuleGraph(vars => {
  new ow.Rule({
    name: "Hello World!",
    event: null,
    conditions: [],
    actions: () => {
      let bigString = ops.strings.Template("|-----{}----{}------------|", [
        ops.strings.Icon("Circle"),
        ops.strings.Icon("Diamond")
      ]);

      ow.actions.SimpleHudText({
        location: ops.location.Top(),
        header: "Test"
      });

      vars.setGlobal("helloThere", 123);
      vars.setGlobal("helloThere2", 123);
      vars.setGlobal("helloThere", 455);

      ow.actions.SimpleHudText({
        location: ops.location.Top(),
        header: vars.getGlobal("helloThere2")
      });

      ow.actions.CreateHudText(
        ops.players.AllPlayers(),
        bigString,
        ops.Null(),
        ops.Null(),
        ops.location.Top(),
        1.0,
        ops.colors.Blue(),
        ops.colors.Red(),
        ops.colors.Red(),
        ops.reevaluation.VisibleToAndString(),
        ops.spectators.DefaultVisibility()
      );
    }
  });
});

console.log(graph.compile());
