/**
 * 显示控件的额外属性
 */

export class ComponentDto {
  componentId: number = null as any;
  /**
   * 主表ID
   */
  blockViewId: number = null as any;
  /**
   * 引用的列ID
   */
  columnId: number = null as any;
  /**
   * 级次编码,本系统都采用的3位一级的编码格式
   */
  lvlCode: string = null as any;
  /**
   * 标题
   */
  title: string = null as any;
  /**
   * 显示方式,如text,datetime等
   */
  dispType: string = null as any;
  /**
   * 横向占比例,类似于bootstrap的12列,占多少列的意思
   */
  horSpan: number = null as any;
  /**
   * 纵向行数,如textArea这类的,会占用多行.
   */
  verSpan: number = null as any;
  /**
   * 如果为列表显示,则显示的宽度,0表示列表中不显示
   */
  width: number = null as any;
  /**
   * 可编辑条件,空表示可编辑
   */
  editableFilter: string = null as any;
  /**
   * 可见条件,空表示可见
   */
  visibleFilter: string = null as any;
  /**
   * 显示格式,如数字,日期等
   */
  format: string = null as any;
  /**
   * 自定义标题的颜色
   */
  titleColor: string = null as any;
  /**
   * 说明
   */
  memo: string = null as any;
  /**
   * 自定义css样式类
   */
  cssClass: string = null as any;
  /**
   * 扩展样式
   */
  extStyle: string = null as any;
  /**
   * 其它个性的属性扩展,使用JSON的格式,在生成时会合并到创建属性中
   */
  extAttr: string = null as any;
  /**
   * 分组类型
   */
  groupType: number = null as any;

  /**
   * 默认排序类型
   */
  orderType: number = null as any;

  /**
   * 背景色
   */
  backgroundColor: string = null as any;

  /**
   * 标题位置
   */
  titlePosition: string = null as any;

  titleSpan: number = null as any;

  /**
   * 如果是树状显示,在树上的作用,如标题,ID,编码等,查看 Constants.TreeRole常量定义
   */
  treeRole: number = null as any;

  posTop: number = null as any;
  posLeft: number = null as any;
  showSearch: number = null as any;
  hideInTable: number = null as any;//在列表中隐藏


}
