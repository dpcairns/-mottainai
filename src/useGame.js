import { useState, useEffect } from 'react';
import defaultDeck from './defaultDeck.js';
import { removeByIndex } from './utils.js';
import roles from './roles';
import useEvaluateTask from './evaluateTask.js';

export const SELECT_TASK = 'Select Task from Hand';
export const DO_TASK = 'Do Task';
export const PREGAME = 'Pre Game';
export const WAIT_FOR_NEXT_TURN = 'Pick up cards from the waiting area.';

export const GALLERY = 'gallery';
export const WORKSHOP = 'workshop';

const NO_TASK = {};

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  
export function useGame() {
    const [gameId, changeGameId] = useState(Math.random())
    const [stage, changeStage] = useState(PREGAME);
    const [works, changeWorks] = useState({
      [GALLERY]: [],
      [WORKSHOP]: [],
    });
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

    // only need role.number - 1, since the task itself counts as 1
    const canCraft = role 
      && matchesInBench.length >= (role.number - 1) 
      && matchesInHand.length > 0; 

    // you can smith if the number of cards of a given role in your hand is less than or equal to that role's number
    function getCardsOfTypeInHand(roleToEvaluate) {
      const matchesInHand = hand.filter(card => card.role === roleToEvaluate);

      return matchesInHand.length; 
    }

    function getCanSmithForRole(roleToEvaluate) {
      const cardsOfTypeInHand = getCardsOfTypeInHand(roleToEvaluate);
      
      return cardsOfTypeInHand >= roles[roleToEvaluate].number
    }

    const canSmithMap = Object.keys(roles).reduce((acc, role) => {
      acc[role] = getCanSmithForRole(role);

      return acc;
    }, {})

    const canSmith = Object.values(canSmithMap).some(val => val);

    function craftOrSmith(smithingCardInHand) {
      const roleOfCardToBuild = smithingCardInHand.role || task.role;
      const cardInHandToBuildIndex = hand.findIndex(card => card.role === roleOfCardToBuild);

      const confirmGallery = confirm('Build in Gallery to cover sales?'); // eslint-disable-line
      
      const whereToBuild = confirmGallery ? GALLERY : WORKSHOP;
      const currentWorksInThatWing = works[whereToBuild];
      const newWorksInThatWing = [...currentWorksInThatWing, hand[cardInHandToBuildIndex]];
      changeWorks({
        ...works,
        [whereToBuild]: newWorksInThatWing
      });

      const handWithoutWork = removeByIndex(hand, cardInHandToBuildIndex);

      changeHand(handWithoutWork);

      // TODO: remove redundant cleanup on smithing. incorporate craft into evaluateTask, where all tasks are wrapped like this?
      cleanupAction();
    }

    // TODO: make helpers covered map
    const coveredMap = works.gallery.reduce((acc, work) => {
      if (acc[work.role]) {
        acc[work.role] += work.number
      } else {
        acc[work.role] = work.number
      }

      return acc;
    }, {});

    function getNumberOfSalesOfThisType(role) {
      return sales.filter(sale => sale.role === role).length;
    }

    const salesScore = Object.keys(coveredMap)
      .reduce((acc, coveredRole) => {
        const salesOfType = getNumberOfSalesOfThisType(coveredRole);

        if (salesOfType <= coveredMap[coveredRole]) {
          return acc + (salesOfType * roles[coveredRole].number)
        }

        return acc;
    }, 0)

    const scoreWorksInWing = (wing) => works[wing].reduce((acc, work) => acc + work.number, 0)
    const worksScore = scoreWorksInWing(GALLERY) + scoreWorksInWing(WORKSHOP);
    
    const taskFunction = useEvaluateTask({ 
      helpers,
      changeHelpers,
      changeCraftBench,
      craftBench,
      deck,
      changeDeck,
      floor,
      changeFloor,
      sales,
      changeSales,
      hand,
      task,
      cleanupAction,
      changeWaitingArea,
      craftOrSmith 
    });

    return {
        canSmithMap,
        taskFunction,
        craftOrSmith,
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
        stage,
        changeStage,
        helpers,
        changeHelpers,
        craftBench,
        changeCraftBench,
        works,
        canSmith,
        salesScore,
        worksScore,
        coveredMap
    }
}
