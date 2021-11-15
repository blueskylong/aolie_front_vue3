//TODO 完善成提示信息

export class UiUtils {
  static INT_SER = 1;
  static lstResizeListener = new Array<() => void>();
  //是否正在调整大小
  static isResizing = false;
  //是否已错过了变化事件
  static hasLostEvent = false;

  static showInfo(info: string) {
    alert(info);
  }

  static showWarning(info: string) {
    alert(info);
  }

  /**
   * 取得块视图的数据
   * @param blockId
   */
  static getBlockViewDataUrl(blockId: number) {
    return "/dmdata/findBlockData/" + blockId;
  }

  static getBlockViewNoPageUrl(blockId: number) {
    return "/dmdata/findBlockDataNoPage/" + blockId;
  }

  static getWindowWidth() {
    let pageWidth = window.innerWidth;

    if (typeof pageWidth != "number") {
      //标准模式
      if (document.compatMode == "CSS1Compat") {
        pageWidth = document.documentElement.clientWidth;
        //怪异模式
      } else {
        pageWidth = document.body.clientWidth;
      }
    }
    return pageWidth;
  }

  static fireResizeEvent() {
    if (UiUtils.isResizing) {
      UiUtils.hasLostEvent = true;
      return;
    }
    try {
      UiUtils.isResizing = true;
      //处理autoFix类的高度
      let lstEle = document.getElementsByClassName("autofit");
      for (let i = 0; i < lstEle.length; i++) {
        UiUtils.autoSize(<HTMLElement>lstEle.item(i));
      }

      lstEle = document.getElementsByClassName("auto-width");
      for (let i = 0; i < lstEle.length; i++) {
        UiUtils.autoWidth(<HTMLElement>lstEle.item(i));
      }

      lstEle = document.getElementsByClassName("auto-height");
      for (let i = 0; i < lstEle.length; i++) {
        UiUtils.autoHeight(<HTMLElement>lstEle.item(i));
      }

      if (UiUtils.lstResizeListener.length > 0) {
        for (const listener of UiUtils.lstResizeListener) {
          listener();
        }
      }

    } finally {
      setTimeout(() => {
        UiUtils.isResizing = false;
        if (UiUtils.hasLostEvent) {
          UiUtils.hasLostEvent = false;
          UiUtils.fireResizeEvent();
        }
      }, 100);

    }

  }

  static autoSize(el: HTMLElement) {
    UiUtils.autoWidth(el);
    UiUtils.autoHeight(el);
  }

  static autoHeight(el: HTMLElement) {
    const height = UiUtils.getAutoFitHeight(el);
    if (height < 1) {
      return;
    }
    el.style.height = height + "px";
  }

  static autoWidth(el: HTMLElement) {
    const width = UiUtils.getAutoFitWidth(el);
    if (width < 1) {
      return;
    }
    el.style.width = width + "px";

  }

  static getAutoFitHeight(el: HTMLElement) {
    const parent = el.parentElement;
    if (!parent) {
      return -1;
    }
    const parHeight = parent.offsetHeight;
    if (parHeight <= 0) {
      return -1;
    }
    //查询兄弟的高度
    const children = parent.children.length;
    let brotherHeight = 0;
    if (children > 1) {
      for (let i = 0; i < children; i++) {
        const child = parent.children[i];
        if (child === el) {
          continue;
        }

        brotherHeight += child.getBoundingClientRect().height;
      }
    }
    if (parHeight <= brotherHeight) {
      return -1;
    }
    //还要去掉自身的margin
    const thisMarginHeight = el.getBoundingClientRect().height - el.offsetHeight;
    return parHeight - brotherHeight - thisMarginHeight - 1;
  }

  static getAutoFitWidth(el: HTMLElement) {
    const parent = el.parentElement;
    if (!parent) {
      return -1;
    }
    const parWidth = parent.offsetWidth;
    if (parWidth <= 0) {
      return -1;
    }
    //查询兄弟的高度
    const children = parent.children.length;
    let brotherWidth = 0;
    if (children > 1) {
      for (let i = 0; i < children; i++) {
        if (parent.children[i] === el) {
          continue;
        }
        brotherWidth += parent.children[i].getBoundingClientRect().width;
      }
    }
    if (parWidth <= brotherWidth) {
      return -1;
    }
    //还要去掉自身的margin
    const thisMarginWidth = el.getBoundingClientRect().width - el.offsetWidth;
    return parWidth - brotherWidth - thisMarginWidth - 1;
  }

  static regOnWindowResized(listener: () => void) {
    UiUtils.lstResizeListener.push(listener);
  }

  static unRegOnWindowResized(listener: () => void) {
    const index = UiUtils.lstResizeListener.indexOf(listener);
    if (index != -1) {
      UiUtils.lstResizeListener.splice(index, 1);
    }

  }
}

window.onresize = function () {
  UiUtils.fireResizeEvent();
}

