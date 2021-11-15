import BaseUI from "@/uibase/BaseUI";
import {MenuDto} from "@/uibase/uidto/MenuDto";
import {Options} from "vue-class-component";
import {Prop, Watch} from "vue-property-decorator";
import {MenuFunc} from "@/common/BeanUtils";


@Options(
  {
    name: "Test1",
    template: "<div full-display>{{textToShow}}</div>",
    components: {}
  }
)
@MenuFunc("test1")
export class Test1<T extends MenuDto> extends BaseUI<T> {
  @Prop()
  textToShow: string | null = null;
  num = 3;


  watchNum(newVal: string, oldValue: string) {
    console.log(newVal);
    console.log(this.$store)
  }

  created() {
    setTimeout(() => {
      this.num++;
    }, 1000)
  }

}
