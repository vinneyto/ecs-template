import { Vector3 } from "three";
import { MatrixWorldComponent } from "./ecs-components/MatrixWorldComponent";
import { mesh } from "./ecs-entities/mesh";
import { MeshMatrixSystem } from "./ecs-systems/MeshMatrixSystem";
import { ECSSystemGroup } from "./ecs/ECSSystemGroup";
import { ECSWorld } from "./ecs/ECSWorld";
import { ECSGarbageCollector } from "./ecs-tools/ECSGarbageCollector";
import { ECSQueue } from "./ecs-tools/ECSQueue";

const world = new ECSWorld();

const e1 = mesh().build();
const e2 = mesh().build();

world.add(e1);
world.add(e2);

e1.get(MatrixWorldComponent).matrixWorld.makeTranslation(
  new Vector3(5, 10, 20)
);

const rootGroup = new ECSSystemGroup("root").add(new MeshMatrixSystem());

const gc = new ECSGarbageCollector();
const queue = new ECSQueue();
const context = { queue };

const update = () => {
  queue.flush(world);

  rootGroup.update(world, context);

  gc.prune(world);
};

update();

console.log(world);
