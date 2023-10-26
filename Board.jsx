import React from 'react';

const Board = () => {
  const [board, setBoard] = React.useState(Array(9).fill(null));
  const [player, setPlayer] = React.useState('X');
  const [winner, setWinner] = React.useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a]);
        return;
      }
    }

    setPlayer(player === 'X' ? 'O' : 'X');
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setPlayer('X');
    setWinner(null);
  };

  return (
    <div>
      <div className="board">
        {board.map((square, index) => (
          <div key={index} className="row">
            {renderSquare(index)}
          </div>
        ))}
      </div>
      {winner && (
        <div className="winner">
          <p>Winner: {winner}</p>
          <button onClick={resetBoard}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Board;
