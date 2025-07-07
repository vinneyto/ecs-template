import { DestroyComponent } from "../ecs-components/DestroyComponent";
import { MatrixWorldComponent } from "../ecs-components/MatrixWorldComponent";
import { entity } from "../ecs/ECSEntityBuilder";

export const base = () =>
  entity().component(DestroyComponent).component(MatrixWorldComponent);
