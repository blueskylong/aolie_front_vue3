//实例化工厂
import 'reflect-metadata';
import {StringMap} from "@/common/StringMap";
import {ApplicationContext} from "@/common/ApplicationContext";

export class BeanFactory {

  static createBean<T>(_constructor: { new(...args: Array<any>): T }, params: Array<any>): T {
    return new _constructor(...params);
  }

  /**
   * 创建并复制对象发生
   * @param _constructor
   * @param params
   */
  static populateBean<T>(_constructor: { new(...args: Array<any>): T }, params: any): T {
    if (!params) {
      return null as any;
    }
    if (params instanceof _constructor) {
      return params;
    }
    if (params instanceof StringMap) {
      params = BeanFactory.mapToObj(params) as any;
    }
    const obj = new _constructor() as any;

    if (params instanceof StringMap) {
      params.forEach((key, value, map) => {
        const setString = "set" + key.substr(0, 1).toUpperCase() + key.substr(1);
        if (typeof obj[setString] === "function") {
          obj[setString](value);
        } else {
          obj[key] = value;
        }
      });
    } else {
      for (const attr in params) {
        const setString = "set" + attr.substr(0, 1).toUpperCase() + attr.substr(1);
        if (typeof obj[setString] === "function") {
          obj[setString](params[attr]);
        } else {
          obj[attr] = params[attr];
        }

      }
    }
    return obj;
  }

  /**
   * 创建并复制对象发生
   * @param _constructor
   * @param params
   */
  static populateBeans<T>(_constructor: { new(...args: Array<any>): T }, params: Array<any>): Array<T> {
    if (!params || params.length < 1) {
      return null as any;
    }
    if (params[0] instanceof _constructor) {
      return params;
    }
    if (params[0] instanceof StringMap) {
      params = BeanFactory.mapToObj(params) as any;
    }
    const result = new Array<T>();
    for (const param of params) {
      const obj = new _constructor() as any;
      for (const attr in param) {
        const setString = "set" + attr.substr(0, 1).toUpperCase() + attr.substr(1);
        if (typeof obj[setString] === "function") {
          obj[setString](param[attr]);
        } else {
          obj[attr] = param[attr];
        }

      }
      result.push(obj);
    }

    return result;
  }

  private static mapToObj(value: StringMap<any> | Array<StringMap<any>>) {
    if (!value) {
      return {};
    }
    if (value instanceof StringMap) {
      return value.getObject();
    }
    const result = [];
    for (const map of value) {
      result.push(map.getObject());
    }
    return result;
  }

  static singleton: { [key: string]: any } = {};

  static getInstance<T>(_constructor: { new(...args: Array<any>): T }): T {

    const paramTypes: Array<unknown> = Reflect.getMetadata('design:paramtypes', _constructor)
    //参数实例化
    if (paramTypes) {
      const paramInstance = paramTypes.map((val: unknown) => {
        //依赖的类必须全部进行注册
        if (!ApplicationContext.getService(val)) throw new Error(`${val}没有被注册`)
        //参数还有依赖
        else if ((val as any).length) {
          return BeanFactory.getInstance(val as any);
        }
        //没有依赖直接创建实例
        else {
          return new (val as any)();
        }
      })
      return new _constructor(...paramInstance);
    } else {
      return new _constructor();
    }
  }

  static getSingleton<T>(_constructor: { new(...args: Array<any>): T }, nameOrType: string | any): T {
    if (!(typeof nameOrType == "string")) {
      nameOrType = nameOrType.name;
    }
    if (this.singleton[nameOrType]) {
      return this.singleton[nameOrType];
    }
    const instance = this.getInstance(_constructor);
    this.singleton[nameOrType] = instance;
    return instance;
  }
}
