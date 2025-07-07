export abstract class ECSComponent {
  static tag: string;
}

export type ComponentCtor<T extends ECSComponent = ECSComponent> = {
  new (...args: any[]): T;
  readonly tag: string;
};
