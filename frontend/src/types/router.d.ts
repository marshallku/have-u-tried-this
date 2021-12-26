interface ICustomRouter {
  base: string;
  baseElement: HTMLElement | null;
  routes: {
    [key: string]: () => HTMLElement;
  };
  navigators: HTMLElement[];
  update(path: string, init?: boolean): void;
  addNavigator(elt: HTMLElement, path: string): void;
  initialize(path: string): void;
}
