import { MeshComponent } from "../ecs-components/MeshComponent";
import { entity } from "../ecs/ECSEntityBuilder";
import { base } from "./base";

export const mesh = () => entity().extends(base()).component(MeshComponent);
