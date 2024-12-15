import { computed, observable } from "mobx";

export const store = observable({
    count: 0
})

export const addCount = () => {
    store.count++;
}

export const computedCount = computed(() => {
    if(store.count === 10){
        return store.count * 10
    }else{
        return store.count + 10
    }
})