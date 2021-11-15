import {MenuDto} from "@/uibase/uidto/MenuDto";
import {DropMenuItemInfo, MessageDropMenuItemInfo} from "@/components/mainframe/dropedmenu/DropMenu";

export class FrameService {

  static findMenuDtos(): Promise<Array<MenuDto>> {
    const lstMenuDto = new Array<MenuDto>();
    let menuDto = new MenuDto();
    menuDto.menuName = "菜单一";
    menuDto.menuId = 1;
    menuDto.lvlCode = '001';
    menuDto.component = "BaseFunc";
    lstMenuDto.push(menuDto);

    menuDto = new MenuDto();
    menuDto.menuName = "菜单1.1";
    menuDto.menuId = 2;
    menuDto.lvlCode = '001001';
    menuDto.component = "BaseFunc";
    lstMenuDto.push(menuDto);

    menuDto = new MenuDto();
    menuDto.menuName = "菜单1.2";
    menuDto.menuId = 3;
    menuDto.lvlCode = '001002';
    menuDto.component = "BaseFunc";
    lstMenuDto.push(menuDto);

    menuDto = new MenuDto();
    menuDto.menuName = "菜单1.3";
    menuDto.menuId = 4;
    menuDto.lvlCode = '001003';
    menuDto.component = "BaseFunc";
    lstMenuDto.push(menuDto);

    menuDto = new MenuDto();
    menuDto.menuName = "菜单1.3.1";
    menuDto.menuId = 7;
    menuDto.lvlCode = '001003001';
    menuDto.component = "BaseFunc";
    lstMenuDto.push(menuDto);

    menuDto = new MenuDto();
    menuDto.menuName = "菜单2";
    menuDto.menuId = 5;
    menuDto.lvlCode = '002';
    menuDto.component = "BaseFunc";
    lstMenuDto.push(menuDto);

    menuDto = new MenuDto();
    menuDto.menuName = "菜单2.1";
    menuDto.menuId = 6;
    menuDto.lvlCode = '002001';
    menuDto.component = "BaseFunc";
    lstMenuDto.push(menuDto);

    menuDto = new MenuDto();
    menuDto.menuName = "菜单3";
    menuDto.menuId = 7;
    menuDto.lvlCode = '003';
    menuDto.component = "BaseFunc";
    lstMenuDto.push(menuDto);

    menuDto = new MenuDto();
    menuDto.menuName = "菜单4";
    menuDto.menuId = 8;
    menuDto.lvlCode = '004';
    menuDto.component = "BaseFunc";
    lstMenuDto.push(menuDto);
    return new Promise<Array<MenuDto>>((resole => {
      resole(lstMenuDto);
    }))
  }

  static findDropMessages(): Promise<Array<MessageDropMenuItemInfo>> {
    const lstItem = new Array<MessageDropMenuItemInfo>();
    lstItem.push({
      messageId: 1,
      fromUser: "张明",
      receiveTime: FrameService.formatDate(new Date(Date.now() - 1000 * 69), "yyyy-MM-dd hh:mm:ss"),
      hasRead: false
    });

    lstItem.push({
      messageId: 2,
      fromUser: "李浩然",
      receiveTime: FrameService.formatDate(new Date(Date.now() - 1000 * 69), "yyyy-MM-dd hh:mm:ss"),
      hasRead: false
    });
    return new Promise<Array<MessageDropMenuItemInfo>>((resolve => resolve(lstItem)));
  }

  static findDropMenuItem(): Promise<Array<DropMenuItemInfo>> {
    const lstItem = new Array<DropMenuItemInfo>();

    lstItem.push({
      title: "修改资料", icons: "fa fa-pencil-square-o", commandId: "x1"
    });
    lstItem.push({
      title: "切换角色", icons: "fa fa-users", commandId: "x2"
    });
    lstItem.push({
      title: "退出登录", icons: "fa fa-sign-out", commandId: "logout"
    });
    return new Promise<Array<DropMenuItemInfo>>(resolve => resolve(lstItem));
  }

  static formatDate(date: Date, fmt: string) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    const o: any = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : FrameService.padLeftZero(str))
      }
    }
    return fmt
  }

  static padLeftZero(str: string) {
    return ('00' + str).substr(str.length)
  }

}
