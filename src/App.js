
import './App.css';
import { useEffect, useState } from 'react';


function App() {

  

  const [valuesAtBoxes, setValuesAtBoxes] = useState([['\u00A0', '\u00A0', '\u00A0'],['\u00A0', '\u00A0', '\u00A0'],['\u00A0', '\u00A0', '\u00A0']]);
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [gameStatus, setGameStatus] = useState(false);
  const [gameHistory, setGameHistory] = useState([valuesAtBoxes]);
  const [changeGameMovement, setChangeGameMovement] = useState([false,-1]);

  useEffect(()=>{},[valuesAtBoxes])

  // console.log(gameHistory)

  function checkWinner() {
    function checkLine  (a, b, c)  {
      return a !== '\u00A0' && a === b && b === c ;
    };
    for (let i = 0; i < 3; i++) {
      if (checkLine(valuesAtBoxes[i][0], valuesAtBoxes[i][1], valuesAtBoxes[i][2])) {
        // console.log("win");
        return true;
      }
      if (checkLine(valuesAtBoxes[0][i], valuesAtBoxes[1][i], valuesAtBoxes[2][i])) {
        // console.log("win");
        return true;
      }
    }
    if (checkLine(valuesAtBoxes[0][0], valuesAtBoxes[1][1], valuesAtBoxes[2][2]) ||
        checkLine(valuesAtBoxes[0][2], valuesAtBoxes[1][1], valuesAtBoxes[2][0])) {
      // console.log("win");
      return true;
    }
    return false;
  }
  
  
  function handleChangeValues(firstIndex,secondIndex){
    
    if(valuesAtBoxes[firstIndex][secondIndex]==="\u00A0"){
      // console.log(firstIndex,secondIndex);
      if(changeGameMovement[0]){
        setGameHistory(gameHistory.splice(changeGameMovement[1]+1))
        setChangeGameMovement([false,-1]);
      }
      const deepCopiedGameHistory = JSON.parse(JSON.stringify(gameHistory));
      
      const changesAtBoxes=[...valuesAtBoxes];
      changesAtBoxes[firstIndex][secondIndex]=currentPlayer;
      setValuesAtBoxes(changesAtBoxes);
      setGameHistory([...deepCopiedGameHistory, changesAtBoxes]);

      // console.log(gameHistory)
      if(checkWinner()){
        setGameStatus(true)
        return;
      }
      setCurrentPlayer(currentPlayer === "O" ? "X" : "O");
    }
  }

  function toggleToParticularStep(index){
    // console.log(index);
    // if(index!=gameHistory.length-1){
    setValuesAtBoxes(gameHistory[index]);
    setGameStatus(false);
    if(!checkWinner())
    setChangeGameMovement([true,index]);
    // }

  }

  

  return (
  <div className='main'>
    <div className="App">
      {valuesAtBoxes.map((valueAtRow,firstIndex)=> 
      <div className='rowContainer'  key={firstIndex}>
        {valueAtRow.map((value,secondIndex)=>(
        <button  key={secondIndex} disabled={gameStatus} className='boxbutton' onClick={ ()=> handleChangeValues(firstIndex,secondIndex)} >{value }</button>
        ))}
      </div>
      )}
        
      {gameStatus===true ? 
        <h1>Winner : {currentPlayer}</h1>
        :
        <h1>Player : {currentPlayer}</h1>
      }  
      {/* <button className='square'>
        X {a}
      </button> */}
    </div>
    <div className='toggleButton' >
      {gameHistory.map((game,index)=> 
      <button className='buttonIndex' onClick={()=>toggleToParticularStep(index)} key={index}>{"Go To "+index}</button>
      )}
    </div>
  </div>
  );
}

export default App;
