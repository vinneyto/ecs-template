import { DestroyComponent } from "../ecs-components/DestroyComponent";
import type { ECSEntity } from "../ecs/ECSEntity";
import type { ECSWorld } from "../ecs/ECSWorld";

export class ECSQueue {
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
      const destroyComponent = entity.getComponent(DestroyComponent);
      if (destroyComponent) {
        destroyComponent.destroy = true;
      }
    }

    this.entitiesToAdd.clear();
    this.entitiesToDestroy.clear();
  }
}
