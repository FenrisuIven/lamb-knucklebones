export function createNode(elemName, { 
    className = '', 
    id ='' 
}) {
    const div = document.createElement(`${elemName}`);
    div.className = className;
    div.id = id;
    return div;
}
export function initNode(node, children = []) {
    children.forEach((elem) => node.appendChild(elem))
}
