export function getActiveCount(list) {
    return list.filter(t => !t.done).length;
}

export function filterTodos(list, filter) {
    if (filter === 'active') return list.filter(t => !t.done);
    if (filter === 'done') return list.filter(t => t.done);
    return list;
}
