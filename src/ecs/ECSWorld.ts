import type { ComponentCtor } from "./ECSComponent";
import type { ECSEntity } from "./ECSEntity";
import { hashQuery } from "./hashQuery";

type Bucket = {
  query: ReadonlyArray<ComponentCtor>;
  entities: Set<ECSEntity>;
};

export class ECSWorld {
  private readonly entities = new Map<string, ECSEntity>();

  private readonly queryBuckets = new Map<string, Bucket>();

  add(entity: ECSEntity): this {
    this.entities.set(entity.id, entity);
    for (const bucket of this.queryBuckets.values()) {
      if (entity.matches(bucket.query)) {
        bucket.entities.add(entity);
      }
    }
    return this;
  }

  remove(entity: ECSEntity): this {
    this.entities.delete(entity.id);
    for (const bucket of this.queryBuckets.values()) {
      bucket.entities.delete(entity);
    }
    return this;
  }

  get(id: string) {
    return this.entities.get(id);
  }

  selectAll<Q extends ReadonlyArray<ComponentCtor>>(
    query: Q
  ): ReadonlySet<ECSEntity> {
    const key = hashQuery(query);
    let bucket = this.queryBuckets.get(key);
    if (!bucket) {
      bucket = {
        query,
        entities: new Set<ECSEntity>(),
      };
      for (const e of this.entities.values()) {
        if (e.matches(query)) {
          bucket.entities.add(e);
        }
      }
      this.queryBuckets.set(key, bucket);
    }
    return bucket.entities;
  }
}
