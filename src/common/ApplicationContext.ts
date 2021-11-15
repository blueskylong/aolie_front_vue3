//TODO 这里的服务暂时没办法保证在调用前注册
import {StringMap} from "@/common/StringMap";
import {IValidator} from "@/common/IValidator";

export class ApplicationContext {
  private static Services: { [key: string]: any } = {};
  private static lstServices: Array<unknown> = new Array<unknown>();
  private static menuFuncs: { [key: string]: any } = {};
  private static validators = new StringMap<IValidator>();
  private static customUis: { [key: string]: any } = {};
  private static stepUI: { [key: string]: any } = {};

  public static regService(service: any, name?: string) {
    if (!name) {
      name = service.name;
    }
    ApplicationContext.Services[name as any] = service;
    ApplicationContext.lstServices.push(service);
  }

  public static getService(nameOrType: string | any) {
    if (typeof nameOrType == "string") {
      return ApplicationContext.Services[nameOrType];
    } else {
      for (const service of ApplicationContext.lstServices) {
        if (service == nameOrType) {
          return service;
        } else if (ApplicationContext.isSubClass(service, nameOrType)) {
          return service;
        }
      }
      return null;
    }
  }

  public static getMenuFunc(name: string) {
    console.log("menuFuncs:" + JSON.stringify(ApplicationContext.menuFuncs));
    return ApplicationContext.menuFuncs[name];
  }

  public static getCustomUi(name: string) {
    return ApplicationContext.customUis[name];
  }

  public static getCustomStepUI(name: string) {
    return ApplicationContext.stepUI[name];
  }

  public static getValidates() {
    return ApplicationContext.validators.getValues();
  }

  public static regMenuFunc(name: string, constructor: { new(...args: Array<any>): any }) {
    if (ApplicationContext.menuFuncs[name]) {
      console.log("************** warning![" + name + "] already exists,Replace the old one!***************")
    }
    ApplicationContext.menuFuncs[name] = constructor;
  }

  public static regValidator(name: string, validator: IValidator) {
    if (ApplicationContext.validators.has(name)) {
      console.log("************** warning![" + name + "] already exists,Replace the old one!***************")
    }
    ApplicationContext.validators.set(name, validator);
  }

  public static regCustomUi(name: string, constructor: { new(...args: Array<any>): any }) {
    if (ApplicationContext.customUis[name]) {
      console.log("************** warning![" + name + "] already exists,Replace the old one!***************")
    }
    ApplicationContext.customUis[name] = constructor;
  }

  public static regCustomStepUi(name: string, constructor: { new(...args: Array<any>): any }) {
    if (ApplicationContext.stepUI[name]) {
      console.log("************** warning![" + name + "] already exists,Replace the old one!***************")
    }
    ApplicationContext.stepUI[name] = constructor;
  }


  /**
   * 检查typeSuper是typeSub的父类或自己
   * @param typeSub
   * @param typeSuper
   */
  private static isSubClass(typeSub: any, typeSuper: any) {
    if (typeSub == typeSuper) {
      return true;
    }
    const protoSuper = typeSuper.prototype;
    let protoSub = typeSub.prototype;
    while (true) {
      if (protoSub === null)
        return false;
      if (protoSuper === protoSub)  // 当 O 显式原型 严格等于  L隐式原型 时，返回true
        return true;
      protoSub = protoSub.__proto__;
    }


  }
}
