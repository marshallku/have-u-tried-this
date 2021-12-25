export default function el<
  T extends CustomElementKeys,
  K extends CustomElementKeys,
  U extends CreatedElement<T>,
>(
  nodeName: T,
  // TODO: Remove any
  attributes: any,
  ...children: Array<string | CreatedElement<K> | undefined | null>
): U {
  // TODO: Remove any
  const node =
    nodeName === "fragment"
      ? document.createDocumentFragment()
      : (document.createElement(nodeName) as any);

  Object.entries(attributes).forEach(([key, value]) => {
    if (node instanceof DocumentFragment) return;
    if (key === "events") {
      Object.entries(value as any).forEach(([type, args]) => {
        if (Array.isArray(args)) {
          // TODO: Update type
          const curArgs = args as [
            EventListenerOrEventListenerObject,
            boolean | AddEventListenerOptions | undefined,
          ];
          node.addEventListener(type, ...curArgs);
        } else {
          // TODO: Remove any
          const curArgs = args as any;
          node.addEventListener(type, curArgs);
        }
      });

      return;
    }
    const img = document.createElement("img");

    img["src"] = "";

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
      if (childNode.includes("\n") && node instanceof HTMLElement) {
        node.innerText = childNode;
      } else {
        node.appendChild(document.createTextNode(childNode));
      }
    } else {
      node.appendChild(childNode);
    }
  });

  return node as U;
}

document.createElement;
