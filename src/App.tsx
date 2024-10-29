import type { Component } from 'solid-js';
import Freecell from './variants/freecell/render';

import styles from './App.module.css';

// NOTE is there a point to splitting these?
type InGameState = {
  state: "ingame";
  variant: "klondike" | "freecell";
};
type MenuState = {
  state: "menu";
  submenu: "main" | "options" | "leaderboard";
};
type State =
  | InGameState
  | MenuState;
const defaultState: State = { state: "menu", submenu: "main" } as const;

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Freecell />
    </div>
  );
};

export default App;
