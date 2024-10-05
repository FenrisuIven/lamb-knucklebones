export function createNode(elemName, { 
    className = '', 
    id = '',
    textContent = ''
}) {
    const node = document.createElement(`${elemName}`);
    node.className = className;
    node.id = id;
    node.textContent = textContent;
    return node;
}
export function fillNode(node, children = [], clear) {
    if (clear) clearChildren(node);
    // console.log(node)
    children.forEach((elem) => node.appendChild(elem))
}

export function clearChildren(node) {
    // console.log(node)
    node.replaceChildren();
}