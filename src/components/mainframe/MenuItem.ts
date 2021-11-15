import {TreeNode} from "@/uibase/TreeNode";
import BaseUI from "@/uibase/BaseUI";
import {MenuDto} from "@/uibase/uidto/MenuDto";
import {Options} from "vue-class-component";
import {ElMenuItem, ElSubMenu} from "element-plus/lib";


@Options({
  name: "MenuItem",
  template: require("./templates/MenuItem.html"),
  components: {
    ElSubMenu,
    ElMenuItem
  }
})
export class MenuItem<T extends TreeNode<MenuDto>> extends BaseUI<T> {
  menuClick(el: typeof ElMenuItem) {
    this.$emit('leafMenuClick', this.properties.data);
  }

  subMenuClick(menuDto: MenuDto) {
    this.$emit('leafMenuClick', menuDto);
  }


}
