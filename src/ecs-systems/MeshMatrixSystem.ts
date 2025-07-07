import { MatrixComponent } from "../ecs-components/MatrixComponent";
import { MeshComponent } from "../ecs-components/MeshComponent";
import type { ECSContext } from "../ecs/ECSContext";
import type { ECSEntity } from "../ecs/ECSEntity";
import { ECSSystem } from "../ecs/ECSSystem";

export class MeshMatrixSystem extends ECSSystem<ECSContext> {
  query = [MeshComponent, MatrixComponent];

  update(entity: ECSEntity): void {
    const { mesh } = entity.get(MeshComponent);
    const { matrixWorld } = entity.get(MatrixComponent);

    mesh.matrixWorldAutoUpdate = false;
    mesh.matrixWorld.copy(matrixWorld);
  }
}
