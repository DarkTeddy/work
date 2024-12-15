'use client'
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { addCount, computedCount, store } from './store';
import { action } from 'mobx';

function MobxCase() {
    useEffect(() => {
        const id = setInterval(action(() => {
            addCount();
        }), 1000);
    
        return () => clearInterval(id);
    }, []);

    return (
        <div>当前store{store.count}
            <hr />
            computed计算的store{computedCount.get()}
            {/* <button onClick={() => addCount()}>store+1</button> */}
        </div>
    );
}

export default observer(MobxCase);