const isBlack = (s: Suit) => s === "spades" || s === "clubs";

export function create(): Board {
  let ret: Board = {
    columns: new Array<Card[]>(8),
    foundation: new Array<Card>(4),
    open: new Array<Card>(4),
  };
  for (let i = 0; i < 8; ++i) {
    ret.columns[i] = new Array();
  }
  return ret;
}

export function deal(board: Board): Board {
  let deck: Card[] = [];
  const suits: Suit[] = ["clubs", "hearts", "spades", "diamonds"];
  for (let i = 0; i < 4; ++i) {
    for (let j = 1; j <= 13; ++j) {
      deck.push({ suit: suits[i], value: j });
    }
  }
  for (let i = 0; i < 52; ++i) {
    const x = Math.floor(Math.random() * (52-i)) + i;
    const tmp = deck[i];
    deck[i] = deck[x];
    deck[x] = tmp;
  }
  for (let i = 0; i < 52; ++i) {
    board.columns[i%8].push(deck[i]);
  }
  return board;
}

export function canMove(board: Board, column: Card[]): number {
  if (column.length === 0) return 0;
  const freeColumns = board.columns.filter(c => c.length === 0).length;
  const freeOpen = [...board.open].filter(c => c === undefined).length;
  let run = true;
  let i = column.length - 1;
  while (i) {
    const prev = column[i-1];
    const curr = column[i];
    if (isBlack(prev.suit) == isBlack(curr.suit) || prev.value != curr.value+1) break;
    i -= 1;
  }
  return i;
}

export function move(dst: Card[] | "foundation" | "open", src: Card[] | "open", i: number): boolean {
  return false;
}
