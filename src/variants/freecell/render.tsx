import * as L from './logic';
import { createSignal, createEffect, splitProps, onMount } from 'solid-js';
import {
  DragDropProvider,
  DragDropSensors,
  createDraggable,
  createDroppable,
  transformStyle,
} from "@thisbeyond/solid-dnd";

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
const Card = (props) => {
  const [{card}, others] = splitProps(props, ["card"]);
  return <img
		draggable="false"
    src={`/src/assets/cards/${cardToImg(card)}`}
    {...others}
    />;
};
const DraggableCard = (props) => {
  const [{last, col, ind}, others] = splitProps(props, ["last", "col", "ind"]);
	console.log(last, col, ind, others);
	const draggable = createDraggable(`${props.card.suit}${props.card.value}`, { col, ind });
  return <div
		ref={draggable.ref}
		style={transformStyle(draggable.transform)}
		class={`draggable-container ${style.dragparent}`}
	>
    <div class={last ? style.last : undefined}>
      <div class={`handle ${style.draghandle ?? ''}`} {...draggable.dragActivators} />
      <Card {...others} />
    </div>
    {props.children}
  </div>;
};

export default function() {
  const [board, setBoard] = createSignal<Board>(L.create());

  createEffect(() => {
    console.log(board());
  });

  onMount(() => {
    setBoard({...L.deal(board())});
  });

  return <DragDropProvider>
		<DragDropSensors />
    {board().columns.map((c, ci) => {
      const t = ci < 4 ? board().foundation : board().open;
      const x = t[ci%4];
      const m = L.canMove(board(), c);
			const cards = c.slice(0, m).map((x, i) =>
				<Card card={x}
					style={{
						//transform: `translate(0, ${-50*i}%)`
					}}
				/>);
			const moves = c.slice(m).reduceRight((a, x, i) => (
				<DraggableCard card={x}
					style={{
						//transform: `translate(0, ${-50*(m+i)}%)`
					}}
					class={style.moveable}
					last={m+i == c.length-1}
					col={ci} ind={m+i}
				>
					{a}
				</DraggableCard>
			), <></>);
      return <>
        <div class={style.column}>
          <img
            src={`/src/assets/cards/${
              cardToImg(x) ?? (ci < 4 ? "Back1.png" : "Back2.png")
            }`}
            class={x === undefined ? style.empty : undefined} />
          {cards}
          {moves}
        </div>
      </>;
    })}
  </DragDropProvider>;
}
