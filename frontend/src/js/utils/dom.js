export default function el(nodeName, attributes, ...children) {
  const node =
    nodeName === "fragment"
      ? document.createDocumentFragment()
      : document.createElement(nodeName);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "events") {
      Object.entries(value).forEach(([type, args]) => {
        if (Array.isArray(args)) {
          node.addEventListener(type, ...args);
        } else {
          node.addEventListener(type, args);
        }
      });

      return;
    }

    if (key in node) {
      try {
        node[key] = value;
      } catch (err) {
        node.setAttribute(key, value);
      }
    } else {
      node.setAttribute(key, value);
    }
  });

  children.forEach((childNode) => {
    if (!childNode) return;

    if (typeof childNode === "string") {
      if (childNode.includes("\n")) {
        node.innerText = childNode;
      } else {
        node.appendChild(document.createTextNode(childNode));
      }
    } else {
      node.appendChild(childNode);
    }
  });

  return node;
}
