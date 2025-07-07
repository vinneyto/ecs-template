import { ECSComponent } from "../ecs/ECSComponent";

export class DestroyComponent extends ECSComponent {
  public static readonly tag = "core/destroy";

  destroy = false;
}
