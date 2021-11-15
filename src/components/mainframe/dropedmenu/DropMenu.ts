import BaseUI from "@/uibase/BaseUI";
import {Options} from "vue-class-component";
import ElBadge, {ElMessage, ElDropdown, ElDropdownItem, ElDropdownMenu} from "element-plus/lib";


export interface DropMenuInfo {
  lstItem: Array<DropMenuItemInfo>;
  userImg: string;
}

export interface MessageDropMenuInfo {
  lstItem: Array<MessageDropMenuItemInfo>;
  count: number;
  showMore: () => void;
}


/**
 * 消息控件
 */
@Options({
  name: "MessageDropMenu",
  template: require("./templates/MessageDropDownMenu.html"),
  components: {
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElBadge
  }
})
export class MessageDropMenu<T extends MessageDropMenuInfo> extends BaseUI<T> {
  moreButtonClick() {
    this.properties.showMore();
  }

  handleCommand(command: string) {
    ElMessage.info("按下了：" + command);
  }

  getItems() {
    return this.properties?.lstItem;
  }
}


export interface MessageDropMenuItemInfo {
  messageId: number;
  fromUser: string;
  receiveTime: string;
  hasRead: boolean;
}


@Options(
  {
    name: "DropMenu",
    template: require("./templates/DropDownMenu.html"),
    components: {
      ElDropdown,
      ElDropdownMenu,
      ElDropdownItem,
    }
  }
)
export class DropMenu<T extends DropMenuInfo> extends BaseUI<T> {
  handleCommand(command: string) {
    if (command === "logout") {
      this.$store.dispatch("setUser", {})
      this.$store.dispatch("setIsLogin", false);
      this.$router.push("login");
    } else {
      ElMessage.info("按下了：" + command);
    }
  }

  getUserName() {
    return this.$store.state.app.user?.userName
  }
}


export interface DropMenuItemInfo {
  title: string;
  icons?: string;
  commandId: string
}
