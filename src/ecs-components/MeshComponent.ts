import { Mesh } from "three";
import { ECSComponent } from "../ecs/ECSComponent";

export class MeshComponent extends ECSComponent {
  public static readonly tag = "core/mesh";

  mesh = new Mesh();
}
