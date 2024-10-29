import * as L from './logic';
import { createSignal, createEffect, onMount } from 'solid-js';

import style from './style.module.css';

const suitToId = {
  "clubs": 7,
  "hearts": 2,
  "spades": 5,
  "diamonds": 4,
};
const valToId = (v: number) => {
  switch (v) {
  case 1: return "A";
  case 11: return "J";
  case 12: return "Q";
  case 13: return "K";
  default: return v.toString();
  }
}
const cardToImg = (c: Card) => {
  return c === undefined ? undefined : `${valToId(c.value)}.${suitToId[c.suit]}.png`;
};


export default function() {
  const [board, setBoard] = createSignal<Board>(L.create());
  const [hover, setHover] = createSignal<[number, number] | undefined>(undefined);

  createEffect(() => {
    console.log(board());
  });

  onMount(() => {
    setBoard({...L.deal(board())});
  });

  return <>
    {board().columns.map((c, ci) => {
      const t = ci < 4 ? board().foundation : board().open;
      const x = t[ci%4];
      return <>
        <div class={style.column}>
          <img src={`/src/assets/cards/${cardToImg(x) ?? (ci < 4 ? "Back1.png" : "Back2.png")}`} class={x === undefined ? style.empty : undefined} />
          {c.map((x, i) => <img
            src={`/src/assets/cards/${cardToImg(x)}`}
            style={{
              transform: `translate(0, ${-50*i}%)`
            }}
            class={L.canMove(board(), c, i) ? style.moveable : undefined}
          />)}
        </div>
      </>;
    })}
  </>;
}
