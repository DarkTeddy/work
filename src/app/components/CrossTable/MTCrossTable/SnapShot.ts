import { cloneDeep } from "lodash";

export default class SnapShot<StoreType, ActionType>{
    public store: StoreType;

    public actions: Array<ActionType> = [];

    constructor(options: {store: StoreType}){
        this.store = options.store;
    }

    addSnap(action: ActionType){
        this.actions.push(action);
    }

    reset(store: StoreType){
        this.store = store;
        this.actions = [];
    }

    flush(callback: (action: ActionType, store: StoreType) => StoreType): StoreType{
        return this.actions.reduce<StoreType>((acc, action) => {
            return callback(action, acc);
        }, cloneDeep(this.store));
    }
}