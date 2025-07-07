import type { ECSEntity } from "./ECSEntity";

export interface IECSQueue {
  add(entity: ECSEntity): void;
  destroy(entity: ECSEntity): void;
}

export interface ECSContext {
  queue: IECSQueue;
}
