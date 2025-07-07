import type { ComponentCtor } from "./ECSComponent";

export function hashQuery(query: ReadonlyArray<ComponentCtor>): string {
  return query
    .map((c) => c.tag)
    .sort()
    .join("+");
}
