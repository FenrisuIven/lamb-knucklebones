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
export function fillNode(node, children = []) {
    console.log(children)
    children.forEach((elem) => node.appendChild(elem))
}

export function clearChildren(node) {
    node.replaceChildren();
}