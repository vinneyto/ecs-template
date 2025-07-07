import type { ComponentCtor, ECSComponent } from "./ECSComponent";
import { ECSEntity } from "./ECSEntity";

class ECSEntityBuilder {
  private readonly templates = new Map<
    ComponentCtor,
    ECSComponent | undefined
  >();

  component<Component extends ECSComponent>(
    Ctor: ComponentCtor,
    data?: Component
  ) {
    this.templates.set(Ctor, data);
    return this;
  }

  extends(builder: ECSEntityBuilder) {
    for (const [ctor, data] of builder.templates) {
      this.templates.set(ctor, data);
    }
    return this;
  }

  exclude(Ctor: ComponentCtor) {
    this.templates.delete(Ctor);
    return this;
  }

  build() {
    const entity = new ECSEntity();
    for (const [ctor, data] of this.templates) {
      const component = new ctor();
      if (data) {
        Object.assign(component, data);
      }
      entity.add(component);
    }
    return entity;
  }
}

export const entity = () => new ECSEntityBuilder();
