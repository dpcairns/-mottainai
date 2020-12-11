const makeId = () => `${Math.random()}`.slice(4);
const deck = [
    'clerk',
    'monk',
    'tailor',
    'potter',
    'smith',
  ].map(role => [...Array(5)]
      .map(() => ({
        id: makeId(),
        role: role
    }))).flat();
    
  export default deck;