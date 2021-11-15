import BaseUI from "@/uibase/BaseUI";
import {MenuDto} from "@/uibase/uidto/MenuDto";
import {Options} from "vue-class-component";
import {Prop} from "vue-property-decorator";
import {MenuFunc} from "@/common/BeanUtils";
import {Test1} from ".";


@Options(
  {
    name: "Test3",
    template: "<div full-display>{{textToShow}}</div>",
    components: {}
  }
)
@MenuFunc("test3")
export class Test3<T extends MenuDto> extends Test1<T> {


}
