export class ContextRegistry {
  private store = new Map<string, unknown>();

  set(key: string, value: unknown) {
    this.store.set(key, value);
  }

  get<T>(key: string): T | undefined {
    return this.store.get(key) as T | undefined;
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  delete(key: string): boolean {
    return this.store.delete(key);
  }
}

export const contextRegistry = new ContextRegistry();
