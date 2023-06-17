const cells = [...document.querySelectorAll('#board .cell')]
const title = document.querySelector('.title')

const winLine = document.querySelector('.win-line line')

const players = {
  x: document.querySelector('.player-x'),
  o: document.querySelector('.player-o')
}

let turnX = true

const board = {
  x: [],
  o: []
}

cells.forEach(c => c.addEventListener('click', (event) => {
  const target = event.target
  const index = cells.indexOf(target)

  if(board.x.indexOf(index) >= 0 || board.o.indexOf(index) >= 0) {
    return
  }

  const player = turnX ? 'x' : 'o'
  const playerNext = turnX ? 'o' : 'x'

  board[player].push(index)
  players[player].classList.remove('active')
  players[playerNext].classList.add('active')
  title.textContent = `Turn ${playerNext.toUpperCase()}`
  target.textContent = player.toUpperCase()

  const toCheck = board[player]

  const winCombination = checkWin(toCheck)

  if(winCombination) {
    const cellSize = target.offsetWidth

    const x1 = (winCombination[0] % 3 + 0.5) * cellSize
    const y1 = (Math.floor(winCombination[0] / 3) + 0.5) * cellSize

    const x2 = (winCombination[2] % 3 + 0.5) * cellSize
    const y2 = (Math.floor(winCombination[2] / 3) + 0.5) * cellSize


    winLine.setAttribute('x1', x1)
    winLine.setAttribute('y1', y1)
    winLine.setAttribute('x2', x2)
    winLine.setAttribute('y2', y2)

    alert(`${turnX ? 'X' : 'O'} Won`)
  }

  if(board.x.length + board.o.length === 9) {
    alert('Draw!')
  }

  turnX = turnX ? false : true
  // or
  // turnX = !turnX
}))

const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function checkWin(toCheck) {
  for(const combination of combinations) {
    
    const valid = combination.every(e => toCheck.includes(e))

    if(valid) return combination
  }
}

// если ходит Х то turnX должен стать false
// if(turnX === true) { turnX = false }


// если ходит O то turnX должен стать true
// if(turnX === false) { turnX = true }
