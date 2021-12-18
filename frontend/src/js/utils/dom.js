export default function el(nodeName, attributes, ...children) {
  if (nodeName === "fragment") return document.createDocumentFragment();
  const node = document.createElement(nodeName);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key in node) {
      node[key] = value;
    } else {
      node.setAttribute(key, value);
    }
  });

  children.forEach((childNode) => {
    if (typeof childNode === "string") {
      node.appendChild(document.createTextNode(childNode));
    } else {
      node.appendChild(childNode);
    }
  });

  return node;
}
