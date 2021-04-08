export function clearAll(arr) {
    arr.forEach(elem => {
        elem.remove(elem);
    });
}