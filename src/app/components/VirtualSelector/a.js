const store = {
    a: 10,
};

function inc(){
    store.a += 1;
}

const all = {
    store,
    inc
}

export default all