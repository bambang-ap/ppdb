class Storage<V extends string | number | boolean | object> {
  public key: string;

  constructor(key: string) {
    this.key = key;
  }

  set(value: V) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  remove() {
    localStorage.removeItem(this.key);
  }
}

export class StorageObject<V extends object> extends Storage<V> {
  get() {
    const data = localStorage.getItem(this.key);
    if (data) return JSON.parse(data) as V;
    return null;
  }
}

export class StorageNumber<V extends number> extends Storage<V> {
  get() {
    const data = localStorage.getItem(this.key);
    const number = Number(data);
    if (!Number.isNaN(number)) return number as V;
    return null;
  }
}

export class StorageString<V extends string> extends Storage<V> {
  get() {
    const data = localStorage.getItem(this.key);
    if (typeof data === "string") return data as V;
    return null;
  }
}

export class StorageBoolean<V extends boolean> extends Storage<V> {
  get() {
    const data = localStorage.getItem(this.key);
    if (data === "true") return true;
    if (data === "false") return false;
    return null;
  }
}
