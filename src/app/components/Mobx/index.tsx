'use client'
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { addCount, computedCount, isFive, store } from './store';
import { action } from 'mobx';

function MobxCase() {
    // useEffect(() => {
    //     const id = setInterval(action(() => {
    //         addCount();
    //     }), 1000);
    
    //     return () => clearInterval(id);
    // }, []);

    const [a, setA] = useState<number>();
    useEffect(() => {
        setA(store.count);
    },[])

    useEffect(() => {
        console.log('store.count发生变化了', store.count, isFive.get(), );
        
    },[store.count])
    return (
        <div>当前store{store.count}
            <hr />
            computed计算的store{computedCount.get()}
            <button onClick={() => addCount()}>store+1</button>
        </div>
    );
}

export default observer(MobxCase);