export const todoReducer = (state = [], action) => {
  let clonedstate = state.map(a => {return {...a}})
  switch (action.type) {
    case 'add':
      return [...state, action.payload];

    case 'toggle':
      clonedstate[action.payload.index].done = !clonedstate[action.payload.index].done;
      return clonedstate;

    default:
      clonedstate.splice(action.payload.index,1);
      return clonedstate;
  }
};
