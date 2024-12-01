import React, { FC } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';

let index = 0;

function getStateCenterKey(){
  return index++;
}

const GLOBAL_STORE_KEY = '__global__';

const StateCenter = observable({
  [GLOBAL_STORE_KEY]: {}
})

function ObservableCell(initalState: object){
  const localStateKey = getStateCenterKey();
  StateCenter[localStateKey] = initalState;

  return (component: React.FC) => {
    return (props) => {
      const ObserverComp = observer(component);

      return (
        <ObserverComp 
          {...props}
          global = {StateCenter[GLOBAL_STORE_KEY]}
          state = {StateCenter[localStateKey]}
        />
      )
    }
  }
}
export default ObservableCell

// const App = observableCell({
//   count: 0,
// })(({ state, global, ...props }) => {
//   return (
//     <div>
//       <h1>{state.count}</h1>
//     </div>
//   );
// });