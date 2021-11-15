import BaseUI from "@/uibase/BaseUI";
import {MenuDto} from "@/uibase/uidto/MenuDto";
import {Options} from "vue-class-component";
import {Prop} from "vue-property-decorator";
import {MenuFunc} from "@/common/BeanUtils";
import {compile} from "vue";
import {RenderFunction} from "@vue/runtime-dom";
import {Test1} from "@/views/sysfunc/Test1";


@Options(
  {
    name: "Test2",
    template: "<div full-display>{{textToShow}}</div>",
    components: {}
  }
)
@MenuFunc("test2")
export class Test2<T extends MenuDto> extends Test1<T> {

}
