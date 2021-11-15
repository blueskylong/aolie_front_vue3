import * as _ from "underscore";

export class StringMap<V> {
  private obj: { [key: string]: any } = {};

  constructor(obj?: any) {
    this.obj = {};
    if (obj) {
      for (const attr in obj) {
        this.obj[attr] = obj[attr];
      }
    }
  }


  clear(): void {
    this.obj = {};
  }

  delete(key: string): boolean {
    const result = this.obj.hasOwnProperty(key);
    delete this.obj[key];
    return result;
  }


  forEach(callbackfn: (key: string, value: V, map: StringMap<V>) => any, thisArg?: any): void {
    for (const key in this.obj) {
      if (callbackfn(key, this.obj[key], this) === false) {
        break;
      }
    }
  }

  get(key: string | number): V | undefined {
    return this.obj[key + ""] as any;
  }

  getObject() {
    return this.obj;
  }

  has(key: string | number): boolean {
    return this.obj.hasOwnProperty(key + "");
  }

  setAll(map: StringMap<any>) {
    if (!map) {
      return;
    }
    map.forEach((key, value, map) => {
      this.set(key, value);
    })
  }

  getValues(): Array<V> {
    const result = new Array<V>();
    for (const key in this.obj) {
      result.push(this.obj[key])
    }
    return result;
  }

  getKeys(): Array<string> {
    const result = new Array<string>();
    for (const key in this.obj) {
      result.push(key)
    }
    return result;
  }

  getValueAsObject() {
    return _.extend({}, this.obj);
  }

  set(key: string | number, value: V): StringMap<V> {
    this.obj[key + ""] = value;
    return this;
  }

  getSize() {
    let i = 0;
    for (const key in this.obj) {
      i++;
    }
    return i;
  }

  equals(map: StringMap<any> | unknown) {
    if (!map) {
      return false;
    }
    let dest: StringMap<any>;
    if (!(map instanceof StringMap)) {
      dest = new StringMap(map);
    } else {
      dest = map;
    }
    if (dest.getSize() != this.getSize()) {
      return false;
    }
    let result = true;
    dest.forEach((key, value, map) => {
      if (!this.has(key) || this.get(key) != value) {
        result = false;
        return false;
      }
    })
    return result;
  }
}
