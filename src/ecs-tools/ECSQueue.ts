import { LifeCircleComponent } from "../ecs-components/LifeCircleComponent";
import type { IECSQueue } from "../ecs/ECSContext";
import type { ECSEntity } from "../ecs/ECSEntity";
import type { ECSWorld } from "../ecs/ECSWorld";

export class ECSQueue implements IECSQueue {
  private readonly entitiesToAdd = new Set<ECSEntity>();
  private readonly entitiesToDestroy = new Set<ECSEntity>();

  add(entity: ECSEntity) {
    this.entitiesToAdd.add(entity);
  }

  destroy(entity: ECSEntity) {
    this.entitiesToDestroy.add(entity);
  }

  flush(world: ECSWorld) {
    for (const entity of this.entitiesToAdd) {
      world.add(entity);
    }

    for (const entity of this.entitiesToDestroy) {
      const lifeCircleComponent = entity.getComponent(LifeCircleComponent);
      if (lifeCircleComponent) {
        lifeCircleComponent.state = "destroy";
      }
    }

    this.entitiesToAdd.clear();
    this.entitiesToDestroy.clear();
  }
}
