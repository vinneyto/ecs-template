import type { ECSContext } from "./ECSContext";
import type { ECSSystem } from "./ECSSystem";
import type { ECSWorld } from "./ECSWorld";

type ECSGroupChild<Context extends ECSContext> =
  | ECSSystemGroup<Context>
  | ECSSystem<Context>;

export class ECSSystemGroup<Context extends ECSContext> {
  public readonly name: string;

  private readonly children: Array<ECSGroupChild<Context>> = [];

  constructor(name: string) {
    this.name = name;
  }

  add(child: ECSGroupChild<Context>) {
    if (this.children.includes(child)) {
      throw new Error("group or system has already added");
    }
    this.children.push(child);
    return this;
  }

  update(world: ECSWorld, context: Context) {
    for (const child of this.children) {
      if (child instanceof ECSSystemGroup) {
        child.update(world, context);
      } else {
        this.runSystem(world, child, context);
      }
    }
  }

  private runSystem(
    world: ECSWorld,
    system: ECSSystem<Context>,
    context: Context
  ) {
    const entities = world.selectAll(system.query);
    for (const entity of entities) {
      system.update(entity, context);
    }
  }
}
