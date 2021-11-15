import {Constants} from "../../common/Constants";
import {ColumnDto} from "@/uibase/uidto/ColumnDto";
import {PopulateBean} from "@/common/BeanUtils";

/**
 * 表列信息处理类
 */
export class Column {
  private columnDto: ColumnDto = null as any;

  getColumnDto(): ColumnDto {
    return this.columnDto;
  }

  @PopulateBean(ColumnDto)
  setColumnDto(value: ColumnDto) {
    this.columnDto = value;
  }

  isNumberColumn(): boolean {
    return this.getColumnDto().fieldType === Constants.FieldType.decimal
      || this.getColumnDto().fieldType === Constants.FieldType.int;
  }
}
