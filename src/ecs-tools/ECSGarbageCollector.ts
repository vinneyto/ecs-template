import { DestroyComponent } from "../ecs-components/DestroyComponent";
import type { ECSEntity } from "../ecs/ECSEntity";
import type { ECSWorld } from "../ecs/ECSWorld";

export class ECSGarbageCollector {
  private readonly entitiesToRemove: ECSEntity[] = [];

  prune(world: ECSWorld) {
    const entities = world.selectAll([DestroyComponent]);

    for (const entity of entities) {
      if (entity.get(DestroyComponent).destroy) {
        this.entitiesToRemove.push(entity);
      }
    }

    for (const entity of this.entitiesToRemove) {
      world.remove(entity);
    }

    this.entitiesToRemove.length = 0;
  }
}
