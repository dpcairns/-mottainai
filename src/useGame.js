import { useState, useEffect } from 'react';
import defaultDeck from './defaultDeck.js';
import evaluateTask from './evaluateTask.js';
import { removeByIndex } from './utils.js';
import roles from './roles';

export const SELECT_TASK = 'Select Task from Hand';
export const DO_TASK = 'Do Task';
export const PREGAME = 'Pre Game';
export const WAIT_FOR_NEXT_TURN = 'Pick up cards from the waiting area.';

const NO_TASK = {};

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  
export function useGame() {
    const [gameId, changeGameId] = useState(Math.random())
    const [stage, changeStage] = useState(PREGAME);
    const [works, changeWorks] = useState([]);
    const [helpers, changeHelpers] = useState([]);
    const [craftBench, changeCraftBench] = useState([]);
    const [deck, changeDeck] = useState([]);
    const [sales, changeSales] = useState([]);
    const [actionsQueue, changeActionsQueue] = useState([]);
    const [hand, changeHand] = useState([]);
    const [task, changeTask] = useState(NO_TASK);
    const [floor, changeFloor] = useState([]);
    const [waitingArea, changeWaitingArea] = useState([]);

  useEffect(() => {
        shuffle(defaultDeck)
        changeDeck(defaultDeck)

    }, [gameId])

    function getTaskFunction() {
      return evaluateTask({
        sales,changeSales,
        cleanupAction,
        actionsQueue,
        changeActionsQueue,
        startNewTurn,
        moveTasksToFloor,
        placeTask,
        pickUpWaitingArea,
        drawCard,
        deck,
        changeDeck,
        floor,
        changeFloor,
        gameId,
        changeGameId,
        hand,
        changeHand,
        task,
        changeTask,
        waitingArea,
        changeWaitingArea,
        stage,
        changeStage,
        helpers,
        changeHelpers,
        craftBench,
        changeCraftBench,        
      })
    }

    function drawCard() {
        const newDeck = deck.slice(0, deck.length - 1);
        const newWaitingArea = [...waitingArea, deck[deck.length - 1]]
        changeWaitingArea(newWaitingArea);
        changeDeck(newDeck);

        if (stage === DO_TASK && actionsQueue.length === 0) {
          changeStage(WAIT_FOR_NEXT_TURN)
        }
      }
    
    function pickUpWaitingArea() {
        changeHand([...hand, ...waitingArea]);
    
        changeWaitingArea([]);
      }
    
    function placeTask(card) {
        const cardIndex = hand.findIndex(handCard => handCard.id === card.id);
        const handWithoutTask = removeByIndex(hand, cardIndex);
    
        changeActionsQueue([card.role, ...actionsQueue])
        changeStage(DO_TASK);
        changeTask(hand[cardIndex])
        changeHand(handWithoutTask)
      }
    
    function moveTasksToFloor() {
      if (task.role) {
          changeFloor([...floor, task])
          changeTask(NO_TASK)
      }
    }
    
    function startNewTurn() {
        changeStage(SELECT_TASK);
        pickUpWaitingArea();
        moveTasksToFloor();
    }

    function cleanupAction() {
      changeActionsQueue(actionsQueue.slice(1));
      
      if (actionsQueue.slice(1).length === 0) {
          moveTasksToFloor();
          changeStage(WAIT_FOR_NEXT_TURN);
      } 
    }

    function pray() {
      drawCard();
      cleanupAction();
    }

    function startGame() {
        changeStage(WAIT_FOR_NEXT_TURN)
        changeWaitingArea(deck.slice(0,5))
        changeDeck(deck.slice(5))
    }

    const matchesInBench = craftBench.filter(card => card.role === task.role);
    const matchesInHand = hand.filter(card => card.role === task.role);
    const role = roles[task.role];

    const canCraft = role 
      // only need number - 1, since the task itself counts as 1
      && matchesInBench.length >= (role.number - 1) 
      && matchesInHand.length > 0; 

    function craft() {
      const cardInHandToBuildIndex = hand.findIndex(card => card.role === task.role);
      // TODO: build in gallery or shop
      changeWorks([...works, hand[cardInHandToBuildIndex]]);

      const handWithoutWork = removeByIndex(hand, cardInHandToBuildIndex);

      changeHand(handWithoutWork);

      cleanupAction();
    }
    
    return {
        craft,
        canCraft,
        startGame,
        cleanupAction,
        pray,
        actionsQueue,
        changeActionsQueue,
        startNewTurn,
        moveTasksToFloor,
        placeTask,
        pickUpWaitingArea,
        drawCard,
        sales,
        changeSales,
        deck,
        changeDeck,
        floor,
        changeFloor,
        gameId,
        changeGameId,
        hand,
        changeHand,
        task,
        changeTask,
        waitingArea,
        changeWaitingArea,
        getTaskFunction,
        stage,
        changeStage,
        helpers,
        changeHelpers,
        craftBench,
        changeCraftBench,
        works,
    }
}
