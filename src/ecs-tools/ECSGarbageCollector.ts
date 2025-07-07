import { LifeCircleComponent } from "../ecs-components/LifeCircleComponent";
import type { ECSEntity } from "../ecs/ECSEntity";
import type { ECSWorld } from "../ecs/ECSWorld";

export class ECSGarbageCollector {
  private readonly entitiesToRemove: ECSEntity[] = [];

  prune(world: ECSWorld) {
    const entities = world.selectAll([LifeCircleComponent]);

    for (const entity of entities) {
      if (entity.get(LifeCircleComponent).state === "destroy") {
        this.entitiesToRemove.push(entity);
      }
    }

    for (const entity of this.entitiesToRemove) {
      world.remove(entity);
    }

    this.entitiesToRemove.length = 0;
  }
}
