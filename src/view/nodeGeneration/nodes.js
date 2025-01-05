export function createNode(elemName, { 
    className = '', 
    id = '',
    textContent = '',
    children = []
}) {
    const node = document.createElement(`${elemName}`);
    node.className = className;
    node.id = id;
    node.textContent = textContent;
    if (children.length !== 0) fillNode(node, children)
    return node;
}

export function fillNode(node, children = [], clear) {
    if (clear) clearChildren(node);
    children.forEach((elem) => {
        if (elem) node.appendChild(elem)
    })
}

export function clearChildren(node) {
    node.replaceChildren();
}