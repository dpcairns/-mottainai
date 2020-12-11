import { 
    CLERK, 
    MONK, 
    TAILOR, 
    SMITH, 
    POTTER,
 } from './roles.js';
import { removeByIndex } from './utils.js';
import roles from './roles.js';

export default function evaluateTask({
        helpers, changeHelpers,
        changeCraftBench, craftBench,
        startNewTurn,moveTasksToFloor, placeTask, 
        pickUpWaitingArea, drawCard, deck, changeDeck, 
        floor, changeFloor, gameId, changeGameId, sales, changeSales,
        changeStage, changeActionsQueue, actionsQueue,
        hand, changeHand, task, changeTask, cleanupAction,
        waitingArea, changeWaitingArea } ) {
            const taskMap = {

                [CLERK]: (card) => {
                    const cardIndex = craftBench.findIndex(benchCard => benchCard.id === card.id)
                    const newBench = removeByIndex(craftBench, cardIndex);

                    changeCraftBench(newBench);
                    changeSales([...sales, craftBench[cardIndex]]);
                },
                [MONK]: (card) => {
                    const cardIndex = floor.findIndex(floorCard => floorCard.id === card.id)
                    const newFloor = removeByIndex(floor, cardIndex);
                    changeFloor(newFloor);
                    changeHelpers([...helpers, card])
                },
                [TAILOR]: () => {
                    const cardsToDraw = 5 - hand.length;
                    const newCards = deck.slice(0, cardsToDraw);
                    const newDeck = deck.slice(cardsToDraw);

                    changeWaitingArea(newCards)
                    changeDeck(newDeck);
                },
                [SMITH]: () => {
                    console.log(roles[SMITH].taskInstructions)
                },
                [POTTER]: (card) => {
                    const cardIndex = floor.findIndex(floorCard => floorCard.id === card.id)
                    const newFloor = removeByIndex(floor, cardIndex);
                    changeFloor(newFloor);
                    changeCraftBench([...craftBench, card])
                },
              }
            
            return (card) => {
                taskMap[task.role](card);
                cleanupAction();
            }
        }

    