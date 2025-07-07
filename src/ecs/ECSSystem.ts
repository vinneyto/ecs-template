import type { ComponentCtor } from "./ECSComponent";
import type { ECSEntity } from "./ECSEntity";

export abstract class ECSSystem<Context> {
  abstract readonly query: ReadonlyArray<ComponentCtor>;
  abstract update(entity: ECSEntity, context: Context): void;
}
