import { LifeCircleComponent } from "../ecs-components/LifeCircleComponent";
import type { ECSContext } from "../ecs/ECSContext";
import type { ECSEntity } from "../ecs/ECSEntity";
import { ECSSystem } from "../ecs/ECSSystem";

export class LifeCirclePromoteSystem extends ECSSystem<ECSContext> {
  query = [LifeCircleComponent];

  update(entity: ECSEntity): void {
    const lifeCircleComponent = entity.get(LifeCircleComponent);

    if (lifeCircleComponent.state === "new") {
      lifeCircleComponent.state = "existed";
    }
  }
}
