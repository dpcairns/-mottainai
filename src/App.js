
import './App.css';
import Deck from './Deck.js';
import Task from './Task';
import Hand from './Hand';
import Floor from './Floor';
import Helpers from './Helpers'
import CraftBench from './CraftBench'
import Works from './Works'
import Sales from './Sales.js'
import { 
  useGame, 
  SELECT_TASK, 
  WAIT_FOR_NEXT_TURN, 
  DO_TASK,
  PREGAME
 } from './useGame.js';
import { CLERK, MONK, POTTER, SMITH, TAILOR } from './roles.js';
import roles from './roles.js';

function App() {

  const {
      deck,
      floor,
      hand,
      task,
      waitingArea,
      stage,
      helpers,
      craftBench,
      sales,
      actionsQueue,
      works,

      pray,
      startNewTurn,
      placeTask,
      changeDeck,
      changeFloor,
      startGame,
      getTaskFunction,
      canCraft,
      craft,
  } = useGame();
  
  const highlightFloor = (stage === DO_TASK && (task.role === POTTER || task.role === MONK));
  const highlightHand = stage === SELECT_TASK || (stage === DO_TASK && task.role === SMITH);
  const highlightHelpers = stage === DO_TASK && task.role === MONK;
  const highlightCraftBench = stage === DO_TASK && (task.role === POTTER || task.role === CLERK);
  const enableMoveToSales = stage === DO_TASK && task.role === CLERK;
  const tailorIsClickable = (stage === DO_TASK && task.role === TAILOR);

  return <div className="App">
      { stage === PREGAME && <div className="start">
        <button onClick={startGame}>Start Game</button>
        </div> }
      <div className={`${stage === PREGAME ? "blur" : ''} container`}>
        <h4>Stage: {stage === DO_TASK ? roles[task.role].taskInstructions : stage}</h4>
        <div className="decks border">
          <Deck
            deck={deck}
            label="deck" />
          <Deck
            deck={waitingArea}
            label="Waiting area" />
        </div>
      
        <Floor 
          floor={floor} 
          doTask={highlightFloor ? getTaskFunction() : () => {}}
          highlight={highlightFloor} />

        <div className="helpers-bench-and-sales border">
          <Helpers 
            helpers={helpers} 
            highlight={highlightHelpers} />
          <CraftBench 
            craftBench={craftBench} 
            highlight={highlightCraftBench} 
            enableMoveToSales
            moveToSales={enableMoveToSales ? getTaskFunction() : () => {}}
            />
          <Sales 
            sales={ sales }
            highlight={enableMoveToSales} />
        </div>

        <Works works={works} />

        <div className="task-and-hand border">
          <Task 
            task={ task } 
            highlight={stage === DO_TASK} 
            canCraft={canCraft}
            craft={craft}
            doTask={ tailorIsClickable ? getTaskFunction() : () => {} }
            pray={pray} />
          <Hand 
            placeTask={ placeTask } 
            hand={ hand }
            highlight={highlightHand}
            pray={pray}  />
        </div>


        <div className="button-container">
          <button disabled={ stage !== WAIT_FOR_NEXT_TURN } onClick={startNewTurn}>
            Draw Waiting Area
          </button>
            {
              floor.length === 0 && stage !== PREGAME
                && <button onClick={() => {
                  changeFloor(deck.slice(0,5))
                  changeDeck(deck.slice(6))
                }}>
                  Seed Floor
                </button>
            }      
            </div>
          <p> actions remaining: </p>
          <ul>
            { actionsQueue.map(action => <li key={Math.random()}>{action}</li>)}
          </ul>
          </div>
        </div>
     }

export default App;
