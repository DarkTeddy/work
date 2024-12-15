import React, {FC} from "react";
import { observable } from "mobx";
import { observer } from "mobx-react-lite";


let index = 0;

function getStateCenterKey(){
    return index++;
}

const GLOBAL_STORE_KEY = '__global__'

const StateCenter = observable({
    [GLOBAL_STORE_KEY]: {},
})



// 传入一个组件，返回一个包裹后的组件
function ObservableCell(initalState: Object){
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