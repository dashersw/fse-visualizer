const realW = 300
const realH = 450
const gameW = 680
const gameH = 1050

export default function transpose (x, y) {
  return [Math.floor(gameW * x / realW) / 20, Math.floor(gameH * y / realH) / 20]
}
