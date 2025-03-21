import sha256 from "crypto-js/sha256";

export class InMemoryDataSource<T> {
  private store = new Map<string, { value: T; expiresAt: number }>();

  constructor() {}

  protected save(key: string, value: T, ttl: number = 60) {
    const expiresAt = Date.now() + ttl * 1000;
    this.store.set(key, { value, expiresAt });
  }

  protected get(key: string) {
    const entry = this.store.get(key);
    if (!entry) {
      return;
    }

    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }

    return entry.value;
  }

  protected delete(key: string) {
    this.store.delete(key);
  }

  protected generateKey(url: string, params: Record<string, unknown>): string {
    const hash = sha256(url + JSON.stringify(params));
    return hash.toString();
  }
}
