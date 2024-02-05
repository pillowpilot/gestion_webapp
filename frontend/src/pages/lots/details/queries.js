const lotsKeys = {
    all: ['lots'],
    lists: [...lotsKeys.all, 'list'],
    detail: (id) => [...lotsKeys.all, 'detail', id],
};

export { lotsKeys };