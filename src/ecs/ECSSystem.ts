import type { ComponentCtor } from "./ECSComponent";
import type { ECSContext } from "./ECSContext";
import type { ECSEntity } from "./ECSEntity";

export abstract class ECSSystem<Context extends ECSContext> {
  abstract readonly query: ReadonlyArray<ComponentCtor>;
  abstract update(entity: ECSEntity, context: Context): void;
}
