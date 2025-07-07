import { ECSComponent } from "../ecs/ECSComponent";

export type LifeCircleState = "new" | "existed" | "destroy";

export class LifeCircleComponent extends ECSComponent {
  public static readonly tag = "core/life_circle";

  state: LifeCircleState = "new";
}
