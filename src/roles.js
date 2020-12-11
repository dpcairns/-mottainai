export const CLERK = 'clerk';
export const MONK = 'monk';
export const TAILOR = 'tailor';
export const POTTER = 'potter';
export const SMITH = 'smith';

const roles = {
    [CLERK]: {
        color: 'pink',
        number: 1,
        material: 'paper',
        taskInstructions: 'pick a card from your craft bench and move it to your sales'
    },
    [MONK]: {
        color: 'green',
        number: 2,
        material: 'stone',
        taskInstructions:'pick a card from the floor and move it to your helpers'

    },
    [TAILOR]: {
        color: 'grey',
        number: 2,
        material: 'cloth',
        taskInstructions: 'pick cards from your hand. discard and draw that many cards'
    },
    [POTTER]: {
        color: 'orange',
        number: 3,
        material: 'clay',
        taskInstructions: 'pick a card from the floor and move it to your craft bench'
    },
    [SMITH]: {
        color: 'blue',
        number: 3,
        material: 'metal',
        taskInstructions: 'pick a card from your hand. pick cards from your hand to bulild that card. move card to works'
    },
}

export default roles;