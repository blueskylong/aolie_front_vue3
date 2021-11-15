import {MenuItem} from "./MenuItem";
import {MenuDto} from "@/uibase/uidto/MenuDto";
import BaseUI from "@/uibase/BaseUI";
import {Options} from "vue-class-component";
import {TreeNode, TreeNodeFactory} from "@/uibase/TreeNode";

import {ElMenu, ElRadioButton, ElRadioGroup} from "element-plus/lib";
import {AppModule} from "@/store/app/app";

@Options({
  name: "SidebarMenu",
  template: require("./templates/SidebarMenu.html"),
  components: {
    ElRadioGroup,
    ElMenu,
    MenuItem,
    ElRadioButton
  }
})
export class SidebarMenu<T extends Array<MenuDto>> extends BaseUI<T> {
  protected nodeMenu: Array<TreeNode<MenuDto>> | null = null;

  protected menuClicked(menuDto: MenuDto) {

    AppModule.setMenuId(menuDto?.menuId + "");
    AppModule.setMenuName(menuDto?.menuName + "");
    this.$router.push(menuDto?.menuId + "");

  }


  get lstMenu() {
    return TreeNodeFactory.genTreeNodeForTree(this.properties || [], "lvlCode", "menuName");
  }
}
