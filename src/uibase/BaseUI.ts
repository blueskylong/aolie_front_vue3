import {GeneralEventListener} from "@/common/GeneralEventListener";
import {Vue} from "vue-class-component";
import {CommonUtils} from "@/common/CommonUtils";
import {StringMap} from "@/common/StringMap";
import {UiUtils} from "@/common/UiUtils";
import {Constants} from "@/common/Constants";
import {Prop} from "vue-property-decorator";

export default abstract class BaseUI<T> extends Vue implements GeneralEventListener {

  public static rowHeight = 45;
  protected static UN_VISIBLE_CLASS = "un-visible";
  protected static HIDDEN_CLASS = "hidden";
  protected static ACTIVE_CLASS = "active";

  @Prop({required: true})
  protected properties: T = {} as T;
  protected lstReadyListener: Array<(source: any) => void> | null = null;
  protected mapListener: StringMap<Array<GeneralEventListener>> = new StringMap<Array<GeneralEventListener>>();

  protected isHide = false;
  protected width = -1;
  protected height = -1;

  protected ready = false;
  protected destroyed = false;

  protected hashCode = -1;
  private initTime: number | null = null;

  protected resizeListener: (() => void) | null = null;

  public addListener(type: string, listener: GeneralEventListener) {
    if (!type) {
      return;
    }
    let generalEventListeners = this.mapListener.get(type);
    if (!generalEventListeners) {
      generalEventListeners = new Array<GeneralEventListener>();
      this.mapListener.set(type, generalEventListeners);
    }
    if (generalEventListeners.indexOf(listener) == -1) {
      generalEventListeners.push(listener);
    }
  }


  beforeCreate(): void {
    this.hashCode = CommonUtils.genHashCode();
    this.initTime = new Date().getTime();
  }

  public fireEvent(type: string, data?: unknown, source?: unknown, extObj?: unknown): void {
    const generalEventListeners = this.mapListener.get(type);
    if (generalEventListeners) {
      for (const listener of generalEventListeners) {
        listener.handleEvent(type, data, source, extObj);
      }
    }
  }


  addReadyListener(handler: (source: any) => void) {
    if (!this.lstReadyListener) {
      this.lstReadyListener = new Array<() => void>();
    }
    this.lstReadyListener.push(handler);
    if (this.isReady()) {//?????????????????? ???,???????????????
      handler(this);
      return;
    }
  }

  removeListener(type: string, listener: GeneralEventListener) {
    if (!type || !listener) {
      return;
    }
    const generalEventListeners = this.mapListener.get(type);
    if (generalEventListeners) {
      const index = generalEventListeners.indexOf(listener);
      if (index != -1) {
        generalEventListeners.splice(index, 1);
      }
    }
  }

  fireReadyEvent() {
    this.ready = true;
    if (this.lstReadyListener) {
      for (const listener of this.lstReadyListener) {
        listener(this);
      }
      //????????????,?????????????????? ??????
      this.lstReadyListener = [];
    }
  }

  public getDtoInfo() {
    return this.properties;
  }

  handleEvent(eventType: string, data: unknown, source: unknown) {
    console.log("after")
  }

  protected initSubControls() {
    console.log("after")
  }

  protected initEvent() {
    console.log("after")
  }


  /**
   * ??????????????????????????????
   */
  public afterComponentAssemble(): void {
    console.log("after")
  }


  /**
   * ??????????????????
   * @param attrName
   * @param value
   */
  public setAttribute(attrName: string, value: unknown) {
    (this.getAttributes() as any)[attrName] = value;
  }

  /**
   * ??????????????????
   */
  public getAttributes(): T | null {
    if (!this.properties) {
      this.properties = {} as any;
    }
    return this.properties;
  }

  /**
   * ??????????????????
   */
  public destroy(): boolean {

    this.lstReadyListener = null as any;
    this.mapListener.clear();
    this.destroyed = true;
    this.properties = null as any;
    if (this.resizeListener) {
      UiUtils.unRegOnWindowResized(this.resizeListener);
      this.resizeListener = null as any;
    }
    return true;
  }

  isDestroyed() {
    return this.destroyed;
  }

  /**
   * ??????????????????????????????,???????????????????????????????????????,????????????,????????????,????????????????????????????????????,?????????????????????
   * @param fullValue
   */
  public parentValueChanged(fullValue: unknown): void {
    console.log("parentValueChanged")
  }

  public isReady() {
    return this.ready;
  }

  public getHashCode() {
    return this.hashCode;
  }

  public getInitTime() {
    return this.initTime;
  }


  /**
   * ????????????????????????
   * @param data
   */
  renew(data?: any) {
    console.log("renew");
  }

  addDoubleClickListener(listener: GeneralEventListener) {
    this.addListener(Constants.GeneralEventType.EVENT_DBL_CLICK, listener);
  }

  addSelectionListener(listener: GeneralEventListener) {
    this.addListener(Constants.GeneralEventType.SELECT_CHANGE_EVENT, listener);
  }
}

/**
 * UI????????????????????????,????????????afterComponentAssemble
 */
class DomAssembleNotifier {

  /**
   * ?????????????????? ?????????
   */
  private static MAX_WAIT_SECONDS = 5;
  private static notifier: DomAssembleNotifier;
  public static mapElement = new StringMap<BaseUI<any>>();
  private static task = null;

  public static getInstance() {
    if (!DomAssembleNotifier.notifier) {
      DomAssembleNotifier.notifier = new DomAssembleNotifier();
    }
    return DomAssembleNotifier.notifier;
  }

}
