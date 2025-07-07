import type { ECSQueue } from "../ecs-tools/ECSQueue";

export interface SystemContext {
  queue: ECSQueue;
}
