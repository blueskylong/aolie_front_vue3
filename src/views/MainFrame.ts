import {Options, Vue} from "vue-class-component";
import {
  DropMenu,
  DropMenuInfo,
  MessageDropMenu, MessageDropMenuInfo,
  MessageDropMenuItemInfo
} from "@/components/mainframe/dropedmenu/DropMenu";
import {FrameService} from "@/components/mainframe/service/FrameService";
import {MenuDto} from "@/uibase/uidto/MenuDto";
import {SidebarMenu} from "@/components/mainframe/SidebarMenu";
import "./templates/custom.css"
import "./templates/mainframe.css"
import {AppModule} from "@/store/app/app";
import {UiUtils} from "@/common/UiUtils";
import {Watch} from "vue-property-decorator";

@Options(
  {
    name: "MainFrame",
    template: require("./templates/MainFrame.html"),
    components: {
      SidebarMenu,
      DropMenu,
      MessageDropMenu,
    }
  }
)
export class MainFrame extends Vue {
  sideBarInfo: Array<MenuDto> = [];
  dropMenuInfo: DropMenuInfo | null = null;
  messageInfo: MessageDropMenuInfo | null = null;


  beforeMount() {
     FrameService.findDropMenuItem().then((result => {
      this.dropMenuInfo = {
        lstItem: result,
        userImg: ""
      }
    }));
    FrameService.findMenuDtos().then((result) => {
      this.sideBarInfo = result;
    });

    FrameService.findDropMessages().then(result => {
      this.messageInfo = {
        lstItem: result,
        count: result.length,
        showMore: () => {
          alert("showMore")
        }
      };
    })

  }



  isCollapse() {
    return !AppModule.sidebar.opened;
  }

  protected onMenuToggleClick() {
    AppModule.toggleSideBar();

  }
}

export interface HomeInfo {
  homePageClass: { new(...args: Array<any>): any };
}
