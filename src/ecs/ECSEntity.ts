import type { ComponentCtor, ECSComponent } from "./ECSComponent";

export type ECSEntityLifeCircle = "new" | "existed" | "destroy";

export class ECSEntity {
  public readonly id: string = crypto.randomUUID();

  public state: ECSEntityLifeCircle = "new";

  private readonly components = new Map<string, ECSComponent>();

  add<T extends ECSComponent>(component: T): this {
    this.components.set(
      (component.constructor as typeof ECSComponent).tag,
      component
    );
    return this;
  }

  get<T extends ECSComponent>(ctor: ComponentCtor<T>): T {
    const comp = this.components.get(ctor.tag);
    if (!comp) throw new Error(`Component "${ctor.tag}" not found in entity`);
    return comp as T;
  }

  getComponent<T extends ECSComponent>(ctor: ComponentCtor<T>): T | undefined {
    return this.components.get(ctor.tag) as T | undefined;
  }

  hasComponent<T extends ECSComponent>(ctor: ComponentCtor<T>): boolean {
    return this.components.has(ctor.tag);
  }

  matches(query: ReadonlyArray<ComponentCtor>): boolean {
    return query.every((ctor) => this.hasComponent(ctor));
  }
}
