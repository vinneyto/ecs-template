import { LifeCircleComponent } from "../ecs-components/LifeCircleComponent";
import { MatrixComponent } from "../ecs-components/MatrixComponent";
import { entity } from "../ecs/ECSEntityBuilder";

export const base = () =>
  entity().component(LifeCircleComponent).component(MatrixComponent);
