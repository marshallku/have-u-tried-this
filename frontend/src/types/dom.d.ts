interface CustomElements extends HTMLElementTagNameMap {
  fragment: DocumentFragment;
}

type CustomElementKeys = keyof CustomElements;

type CreatedElement<T extends CustomElementKeys> = CustomElements[T];

type CustomEvents<K extends keyof HTMLElementEventMap> = {
  [key in K]: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any;
};

interface ElementAttributes {
  [key: string]: any;
}

// addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
//     addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
