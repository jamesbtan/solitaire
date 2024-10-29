type Suit = "clubs" | "hearts" | "spades" | "diamonds";
type Card = {
  suit: Suit;
  value: number;
};
type Board = {
  columns: Card[][];
  foundation: Card[];
  open: Card[];
};
