import React from "react";
import { AppRegistry } from "react-native";
import App from "../App";

AppRegistry.registerComponent("App", () => App);

const { getStyleElement } = AppRegistry.getApplication("App");
document.head.appendChild(getStyleElement());

const rootTag = document.getElementById("root")!;
AppRegistry.runApplication("App", {
  rootTag,
});
