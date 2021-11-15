/**
 * 工具类
 */
import {StringMap} from "./StringMap";
import _ from "underscore";
import {ComponentDto} from "@/uibase/uidto/ComponentDto";
import {ColumnDto} from "@/uibase/uidto/ColumnDto";
import {Column} from "@/uibase/uidto/Column";
import {Component} from "@/uibase/uidto/Component";

export class CommonUtils {
  static ID_SER = -1;

  static INT_SER = 1;
  static INT_SER_HASH = 1;

  static READY_TRY_TIMES = 10;

  static configs: { [key: string]: any } = {};

  static genKey(id: number, version: string) {
    return id + "_" + version;
  }

  public static getConfigParam(paramName: string) {
    return CommonUtils.configs[paramName];
  }

  public static setConfigs(configs: { [key: string]: any }) {
    CommonUtils.configs = configs;
  }

  public static isTrue(obj: any): boolean {
    if (CommonUtils.isEmpty(obj)) {
      return false;
    }
    return obj == 1 || true === obj || "true" === obj;

  }

  /**
   * 转换成双精度数值
   *
   * @param obj
   * @return
   */
  public static toDouble(obj: unknown): number {
    if (obj == null) {
      return 0;
    }
    if (obj instanceof Number) {
      return Number.parseFloat(obj.toString(2));
    }
    if (obj instanceof Object)
      return Number.parseFloat(obj.toString());
    return 0;
  }


  static isEmpty(obj: any): boolean {
    if (obj == null) {
      return true;
    }
    const str = typeof obj;
    if (str === "object") {
      return _.isNull(obj.keys());
    }
    const type = typeof obj;
    return type === "undefined" || obj == null || '' === obj;
  }

  static isEquals(obj1: { [key: string]: any }, obj2: { [key: string]: any }) {
    if (!obj1 && !obj2) {
      return true;
    }
    if (!obj1 || !obj2) {
      return false;
    }
    // 当前Object对象
    const propsCurr = Object.getOwnPropertyNames(obj1);
    // 要比较的另外一个Object对象
    const propsCompare = Object.getOwnPropertyNames(obj2);
    if (propsCurr.length != propsCompare.length) {
      return false;
    }
    for (let i = 0, max = propsCurr.length; i < max; i++) {
      const propName = propsCurr[i];
      if (obj1[propName] !== obj2[propName]) {
        return false;
      }
    }
    return true;
  }


  /**
   * 取得临时序号
   */
  static nextInt() {
    return CommonUtils.INT_SER++;
  }

  static genUUID(): string {
    return _.uniqueId()
  }

  static toUnderLine(str: string) {
    let temp = str.replace(/[A-Z]/g, function (match) {
      return "_" + match.toLowerCase();
    });
    if (temp.slice(0, 1) === '_') {
      temp = temp.slice(1);
    }
    return temp;
  }

  static genElementId(...ids: Array<string>) {
    return "C" + ids.join("_");
  }

  static toCamel(str: string) {
    if (str.indexOf("_") == -1) {
      return str;
    }
    return str.replace(/([^_])(?:_+([^_]))/g, function ($0, $1, $2) {
      return $1 + $2.toUpperCase();
    });
  }

  static getServerUrl(subUrl: string) {
    const baseUtils: string = CommonUtils.getConfigParam("baseURL");
    return CommonUtils.getConfigParam("baseURL") + (baseUtils.endsWith('/') && subUrl.indexOf("/") == 0 ? subUrl.substr(1) : subUrl);
  }

  static readyDo(isReady: () => boolean, callback: () => void, tryTimes?: number) {
    let times = tryTimes ? tryTimes : CommonUtils.READY_TRY_TIMES;
    const i = setInterval(() => {
      if (times < 0) {
        clearInterval(i);
        // Alert.showMessage("初始化超时!")
        return;
      }
      times--;
      if (isReady()) {
        clearInterval(i);
        callback();
      }
    }, 100);
  }


  static isNumber(value: any) {
    if (typeof value === "undefined" || value == null || value == "") {
      return false;
    }
    return !isNaN(value);
  }

  /**
   * 生成普通的ID
   */
  static genId(): number {
    return CommonUtils.ID_SER--;
  }


  static getOffsetTopByBody(el: HTMLElement) {
    let offsetTop = 0;
    while (el && el.tagName !== 'BODY') {
      offsetTop += el.offsetTop;
      el = el.offsetParent as any
    }
    return offsetTop;
  }

  static getOffsetLeftByBody(el: HTMLElement) {
    let offsetLeft = 0;
    while (el && el.tagName !== 'BODY') {
      offsetLeft += el.offsetLeft;
      el = el.offsetParent as any
    }
    return offsetLeft;
  }

  static isHandleResult(obj: unknown) {
    if (!obj) {
      return false;
    }
    if (obj instanceof Object) {
      return (obj.hasOwnProperty("changeNum") &&
        obj.hasOwnProperty("err") &&
        obj.hasOwnProperty("page") &&
        obj.hasOwnProperty("data") &&
        obj.hasOwnProperty("success")
      )
    }
    return false;
  }

  static log(code: string, name: string, message: string): void {
    console.log("xxxxxxxx")
  }

  static genHashCode(): number {
    return CommonUtils.INT_SER_HASH++;
  }

  static isIE() {
    if (!!window['ActiveXObject'] || "ActiveXObject" in window)
      return true;
    else
      return false;
  }

  static getDialogFullSize() {
    return [document.body.clientWidth - 200, document.body.clientHeight - 210];
  }

  /**
   * 分类增加子元素
   * @param map
   * @param key
   * @param subElement
   */
  static addMapListValue<T>(map: StringMap<Array<T>>, key: string, subElement: T) {
    let lstEle = map.get(key);
    if (!lstEle) {
      lstEle = new Array<T>();
      map.set(key, lstEle);
    }
    lstEle.push(subElement);
  }

  //     return ; //IE
  // } else if ($.browser.safari) {
  //     alert("this is safari!"); //Safar
  // } else if ($.browser.mozilla) {
  //     alert("this is mozilla!");  //Firefox
  // } else if ($.browser.opera) {
  //     alert("this is opera");     //Opera
  // }

  /**
   * 取得非空字段
   * @param obj
   */
  static noEmptyField(obj: { [key: string]: any }) {
    const result: { [key: string]: any } = {};
    for (const field in obj) {
      if (obj[field]) {
        result[field] = obj[field];
      }
    }
    return result;
  }

  static genSimpDto(type: string, title: string, horSpan: number, field: string, refId?: number, lvlCode?: string) {
    const dto = new ComponentDto();
    dto.dispType = type;
    dto.title = title;
    dto.horSpan = horSpan;
    dto.columnId = CommonUtils.INT_SER++;
    dto.componentId = CommonUtils.INT_SER++;
    const colDto = new ColumnDto();
    colDto.fieldName = field;
    colDto.refId = refId as any;
    colDto.columnId = dto.columnId;
    const column = new Column();
    column.setColumnDto(colDto);
    const comp = new Component();
    comp.setColumn(column);
    comp.setComponentDto(dto);
    dto.lvlCode = lvlCode as any;
    return comp;
  }
}
