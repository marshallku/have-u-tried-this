interface MasonryOptions {
  container: HTMLElement;
  selector: string;
  elements: HTMLElement[];
  padding: {
    top: number;
    left: number;
  };
  gap: number;
}

interface IMasonryObj {
  resize: () => void;
  append: (elements: HTMLElement[]) => void;
}
