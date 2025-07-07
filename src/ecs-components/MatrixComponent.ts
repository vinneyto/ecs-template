import { Matrix4 } from "three";
import { ECSComponent } from "../ecs/ECSComponent";

export class MatrixComponent extends ECSComponent {
  public static readonly tag = "core/matrix";

  matrixWorld = new Matrix4();
}
