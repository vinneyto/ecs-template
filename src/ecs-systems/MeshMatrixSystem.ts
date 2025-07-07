import { MatrixWorldComponent } from "../ecs-components/MatrixWorldComponent";
import { MeshComponent } from "../ecs-components/MeshComponent";
import type { SystemContext } from "../ecs-context/SystemContext";
import type { ECSEntity } from "../ecs/ECSEntity";
import { ECSSystem } from "../ecs/ECSSystem";

export class MeshMatrixSystem extends ECSSystem<SystemContext> {
  query = [MeshComponent, MatrixWorldComponent];

  update(entity: ECSEntity): void {
    const { mesh } = entity.get(MeshComponent);
    const { matrixWorld } = entity.get(MatrixWorldComponent);

    mesh.matrixWorldAutoUpdate = false;
    mesh.matrixWorld.copy(matrixWorld);
  }
}
