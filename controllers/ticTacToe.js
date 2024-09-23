const calculateWinner = require('../utils/calculateWinner');
const getLocation = require('../utils/getLocation');
const getRandomIndex = require('../utils/getRandomIndex');

const handleTicTocToeTurn = async (req, res) => {
  const { history, currentStepNumber, isPlayWithComputer, i, xIsNext } =
    req.body;

  const gameHistory = history.slice(0, currentStepNumber + 1);
  const current = history[history.length - 1];
  const squares = current.squares.slice();

  let winner = calculateWinner(squares).winner;

  if (winner || squares[i]) {
    res.json({
      newHistory: [
        ...history,
        {
          squares,
          currentLocation: history[history.length - 1].currentLocation,
          stepNumber: history.length,
          winner,
        },
      ],
      currentStepNumber: gameHistory.length,
      xIsNext,
    });

    return;
  }
  squares[i] = xIsNext ? 'X' : 'O';

  winner = calculateWinner(squares);

  const currentLocation = getLocation(i);

  const userClick = [
    {
      squares,
      currentLocation,
      stepNumber: history.length,
      winner,
    },
  ];

  const isPCTurn = isPlayWithComputer && history.length < 9 && !winner.winner;

  if (isPCTurn) {
    const emptyIndexes = [];
    const squareCopy = squares.slice();

    const handleEmptyIndexes = (square, index) => {
      if (square === null) {
        emptyIndexes.push(index);
      }
    };

    squareCopy.forEach(handleEmptyIndexes);

    const randomIndex = getRandomIndex(emptyIndexes.length);
    const randomElement = emptyIndexes[randomIndex];

    squareCopy[randomElement] = !xIsNext ? 'X' : 'O';

    const winner = calculateWinner(squareCopy);

    const currentLocation = getLocation(randomElement);

    res.json({
      newHistory: [
        ...history,
        ...userClick,
        {
          squares: squareCopy,
          currentLocation,
          stepNumber: history.length + 1,
          winner,
        },
      ],
      currentStepNumber: gameHistory.length + 1,
      xIsNext,
    });
    return;
  }

  res.json({
    newHistory: [...history, ...userClick],
    currentStepNumber: gameHistory.length,
    xIsNext: !xIsNext,
  });
};

module.exports = handleTicTocToeTurn;
