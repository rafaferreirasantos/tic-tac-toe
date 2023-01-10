import './styles.scss';
import { useEffect, useState } from "react";

/*
  DESAFIO TÉCNICO - JOGO DA VELHA - por fernandev

  * descrição
    desenvolva um jogo da velha (tic tac toe) funcional.
    use qualquer técnica de estilização preferida: css modules, sass, styled.

  * tasks
    ? - crie um board de 3x3
    ? - dois jogadores
    ? - ao clicar em um quadrado, preencher com a jogada
    ? - avisar quando o jogo finalizar, caso dê velha avise também
    ? - fazer um risco na sequência vencedora, caso houver
*/

function App() {
  const winCondition = [
    { indexes: [0, 3, 6], orientation: 'vertical' },
    { indexes: [1, 4, 7], orientation: 'vertical' },
    { indexes: [2, 5, 8], orientation: 'vertical' },
    { indexes: [0, 1, 2], orientation: 'horizontal' },
    { indexes: [3, 4, 5], orientation: 'horizontal' },
    { indexes: [6, 7, 8], orientation: 'horizontal' },
    { indexes: [0, 4, 8], orientation: 'diagonal-1' },
    { indexes: [6, 4, 2], orientation: 'diagonal-2' },
  ]
  const [gameData, setGameData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [turn, setTurn] = useState(1)
  const [winner, setWinner] = useState(null)
  const handleReset = () => {
    setGameData(["", "", "", "", "", "", "", "", ""])
    setTurn(1)
    setWinner(null)
  }

  useEffect(() => {
    checkWinner();
    checkGameEnded();
  }, gameData)

  const handleClick = (index) => {
    if (winner) return;
    const newGameData = [...gameData]
    if (newGameData[index] === "") { newGameData[index] = turn === 1 ? 1 : 2 }
    setGameData(newGameData)
    setTurn(turn === 1 ? 2 : 1)
  }
  const checkWinner = () => {
    winCondition.forEach(winnerCombination => {
      const result = winnerCombination.indexes.reduce((acumulador, position) => {
        return gameData[position] === acumulador ? acumulador : 0;
      }, gameData[winnerCombination.indexes[0]]);
      if (result != 0) setWinner({ player: result, condition: winnerCombination })
    });
  }
  const checkGameEnded = () => {
    if (gameData.every(value => value !== '')) {
      alert("Ixi, deu velha!")
    }
  }
  return (
    <>
      <div className="button">
        <button onClick={handleReset
        }>Reset</button>
      </div>
      <div className="board-game">
        {gameData.map((value, index) => (
          <span key={index} onClick={() => handleClick(index)}
            className={
              winner?.condition.indexes.includes(index) ? winner.condition.orientation : undefined
            }>
            <abbr title="">{index}</abbr>
            {value === 1 && '❌'}
            {value === 2 && '⭕'}
          </span>
        ))}
      </div>
      <span>Developed by ZecaLoteiro</span>
    </>
  );
}

export default App;
