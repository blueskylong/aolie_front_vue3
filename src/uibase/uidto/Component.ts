import {Constants} from "../../common/Constants";
import {ComponentDto} from "@/uibase/uidto/ComponentDto";
import {Column} from "@/uibase/uidto/Column";
import {PopulateBean} from "@/common/BeanUtils";
import {BeanFactory} from "@/common/BeanFactory";
import {ColumnDto} from "@/uibase/uidto/ColumnDto";

/**
 * 视图中的控件处理类
 */
export class Component {
  componentDto: ComponentDto | null = null;
  /**
   * 对应的列设置
   */
  column: Column | null = null;

  isConvertToCamel = false;

  //这是一个虚拟值,是由社图主信息提供
  private layoutType = Constants.PositionLayoutType.bootstrapLayout;

  public setLayoutType(layoutType: number): void {
    this.layoutType = layoutType;
  }

  public getLayoutType(): number {
    return this.layoutType;
  }

  getComponentDto(): ComponentDto | null {
    return this.componentDto;
  }

  @PopulateBean(ComponentDto)
  setComponentDto(value: ComponentDto): void {
    this.componentDto = value;
  }

  getColumn(): Column | null {
    return this.column;
  }

  @PopulateBean(Column)
  setColumn(value: Column): void {
    this.column = value;
  }

  getTextAlign(): string {
    if (this.isNumberField()) {
      return "right";
    }
    return "left";
  }

  /**
   * 是不是数字控件
   */
  public isNumberField(): boolean {
    return this.componentDto?.dispType === Constants.ComponentType.number;
  }

  /**
   * 是不是数字列
   */
  public isNumberColumn(): boolean {
    if (!this.column) {
      return false;
    }
    return this.column.isNumberColumn();
  }

  /**
   * 组装一个组件对象
   * @param comp
   */
  static fromSimpleComponent(comp: SimpleComponent): Component {
    const component = new Component();
    const comDto = BeanFactory.populateBean(ComponentDto, comp);
    const columnDto = BeanFactory.populateBean(ColumnDto, comp);
    component.componentDto = comDto;
    component.column = new Column();
    component.column.setColumnDto(columnDto);
    return component;
  }
}

export interface SimpleComponent {
  lvlCode?: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 显示方式,如text,datetime等
   */
  dispType: string;
  /**
   * 横向占比例,类似于bootstrap的12列,占多少列的意思
   */
  horSpan: number;

  verSpan?: number;
  /**
   * 如果为列表显示,则显示的宽度,0表示列表中不显示
   */
  width?: number;
  /**
   * 可编辑条件,空表示可编辑
   */
  editableFilter?: string;
  /**
   * 可见条件,空表示可见
   */
  visibleFilter?: string;
  /**
   * 显示格式,如数字,日期等
   */
  format?: string;
  /**
   * 自定义标题的颜色
   */
  titleColor?: string;
  /**
   * 说明
   */
  memo?: string;
  /**
   * 自定义css样式类
   */
  cssClass?: string;
  /**
   * 扩展样式
   */
  extStyle?: string;
  /**
   * 分组类型
   */
  groupType?: number;
  /**
   * 默认排序类型
   */
  orderType?: number;
  /**
   * 背景色
   */
  backgroundColor?: string;
  /**
   * 标题位置
   */
  titlePosition?: string;
  titleSpan?: number;
  fieldName: string;
  nullable?: number;
  defaultValue?: string;
  refId?: number;
  length?: number;
  precision?: number;
  maxValue?: number;
  minValue?: number;
}
