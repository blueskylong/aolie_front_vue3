/**
 * 生成对象
 * @param value
 */
import {ApplicationContext} from "@/common/ApplicationContext";
import {BeanFactory} from "@/common/BeanFactory";

export function PopulateBean<T>(constructor: { new(...args: Array<any>): T }) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const origin = target[propertyKey];
    // aop
    target[propertyKey] = function (...args: any[]) {
      //目前只能处理一个对象

      if (!args || args.length != 1) {
        return origin.apply(this, ...args)
      }
      if (Array.isArray(args[0])) {
        const arg = new Array<T>();
        if (args[0].length > 0) {
          //如果都是指定的类别,就不再生成新的对象
          //这里只判断一条
          if (args[0][0] instanceof constructor) {
            return origin.apply(this, args);
          }
          for (const obj of args[0]) {
            arg.push(BeanFactory.populateBean(constructor, obj));
          }
          args[0] = arg;
        } else {
          return origin.apply(this, args)
        }

      } else {
        args[0] = BeanFactory.populateBean(constructor, args[0]);
      }
      return origin.apply(this, args);
    }
    return target[propertyKey];
  }
}

export function Service(name: string) {
  return (_constructor: unknown) => {
    const paramTypes: Array<unknown> = Reflect.getMetadata('design:paramtypes', _constructor as any)
    //已注册
    if (ApplicationContext.getService(_constructor)) return;
    if (paramTypes) {
      for (const val of paramTypes) {
        if (val === _constructor) {
          throw new Error('不能依赖自己');
        } else if (!ApplicationContext.getService(val)) {
          throw new Error(`${val}没有被注册`)
        }
      }
    }
    //注册
    ApplicationContext.regService(_constructor, name);
  }
}

export function MenuFunc(name: string) {

  return (_constructor: any) => {
    const funcName = name ? name : _constructor.name;
    //注册
    ApplicationContext.regMenuFunc(funcName, _constructor as any);
    return;
  }
}



