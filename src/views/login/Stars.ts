export class Stars {
  private static maxWidth = 0;
  private static maxHeight = 0;
  private static stars: Array<Star> | null;
  private static ctx: any;
  private static amimateionId: number | null;

  static randomInt(min: number) {
    return Math.floor(Math.random() * 255 + min);
  }

  static mousePosition = {
    x: 200, y: 100
  };

  static start(canvas: HTMLCanvasElement) {

    // const canvas = $("<canvas class='cavs'></canvas>");
    // $(dom).append(canvas);
    // var canvas = document.querySelector('canvas'),
    Stars.ctx = canvas.getContext('2d');
    Stars.maxHeight = document.body.offsetHeight;
    Stars.maxWidth = document.body.offsetWidth;
    canvas.width = Stars.maxWidth;
    canvas.height = Stars.maxHeight;
    Stars.ctx.lineWidth = 0.3;
    Stars.ctx.strokeStyle = RandomColor.genRandomColor(150);
    Stars.stars = Stars.createStars(Stars.maxWidth, Stars.maxHeight);
    Stars.amimateionId = requestAnimationFrame(Stars.animateDots);

    //生成流星
    SuperStar.start(canvas, true);
  }

  static stop() {
    if (Stars.amimateionId) {
      window.cancelAnimationFrame(Stars.amimateionId);
    }

    Stars.amimateionId = null;
    Stars.stars = [];
    SuperStar.stop();
  }

  static positionChanged(x: number, y: number) {
    Stars.mousePosition.x = x;
    Stars.mousePosition.y = y;
  }

  static mixComponents(comp1: number, weight1: number, comp2: number, weight2: number) {
    return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
  }

  static averageColorStyles(star1: Star, star2: Star) {

    const r = Stars.mixComponents(star1.getColor().getR(), star1.getRadius(), star2.getColor().getR(), star2.getRadius()),
      g = Stars.mixComponents(star1.getColor().getG(), star1.getRadius(), star2.getColor().getG(), star2.getRadius()),
      b = Stars.mixComponents(star1.getColor().getB(), star1.getRadius(), star2.getColor().getB(), star2.getRadius());
    return 'rgba(' + Math.floor(r) + ',' + Math.floor(g) + ',' + Math.floor(b) + ', 0.7)';
  }


  static createStars(maxWidth: number, maxHeight: number): Array<Star> {
    const lstStar: Array<Star> = new Array<Star>();
    for (let i = 0; i < Star.count; i++) {
      lstStar.push(new Star(maxWidth, maxHeight));
    }
    return lstStar;
  }

  static moveDots(stars: Array<Star> | null) {
    if (!stars) {
      return;
    }
    for (const star of stars) {
      star.move();
    }
  }

  static connectDots(stars: Array<Star> | null) {
    if (!stars) {
      return;
    }
    for (let i = 0; i < stars.length; i++) {
      for (let j = 0; j < stars.length; j++) {
        const iStar = stars[i];
        const jStar = stars[j];
        iStar.connectLine(jStar, Stars.mousePosition, Stars.ctx);
      }
    }
  }

  static drawDots(stars: Array<Star> | null, ctx: any) {
    if (stars) {
      for (let i = 0; i < stars.length; i++) {
        stars[i].draw(ctx);
      }
    }

  }

  static animateDots() {
    if (!Stars.amimateionId) {
      return;
    }
    Stars.ctx.clearRect(0, 0, Stars.maxWidth, Stars.maxHeight);
    Stars.moveDots(Stars.stars);
    Stars.connectDots(Stars.stars);
    Stars.drawDots(Stars.stars, Stars.ctx);

    requestAnimationFrame(Stars.animateDots);
  }

  static destroy() {
    Stars.stars = null;
    Stars.ctx = null;
  }


}

class Star {
  static count = 250;
  static distance = 100;
  static d_radius = 150;
  private x: number;
  private y: number;
  private dx: number;
  private dy: number;
  private radius: number;
  private color: RandomColor;


  constructor(private maxWidth: number, private maxHeight: number) {
    this.x = Math.random() * maxWidth;
    this.y = Math.random() * maxHeight;

    this.dx = -.5 + Math.random();
    this.dy = -.5 + Math.random();
    this.radius = Math.random() * 2;
    this.color = RandomColor.genRandomColor(0);
  }

  move() {
    if (this.y < 0 || this.y > this.maxWidth) {
      this.dx = this.dx;
      this.dy = -this.dy;
    } else if (this.x < 0 || this.x > this.maxHeight) {
      this.dx = -this.dx;
      this.dy = this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  }

  getColor() {
    return this.color;
  }

  connectLine(toStar: Star, mousePosition: any, ctx: any) {
    if ((this.x - toStar.x) < Star.distance && (this.y - toStar.y) < Star.distance
      && (this.x - toStar.x) > -Star.distance && (this.y - toStar.y) > -Star.distance) {
      if ((this.x - mousePosition.x) < Star.d_radius && (this.y - mousePosition.y) < Star.d_radius
        && (this.x - mousePosition.x) > -Star.d_radius && (this.y - mousePosition.y) > -Star.d_radius) {
        ctx.beginPath();
        ctx.strokeStyle = Stars.averageColorStyles(this, toStar);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(toStar.x, toStar.y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getRadius() {
    return this.radius;
  }


  draw(ctx: any) {
    ctx.beginPath();
    ctx.fillStyle = this.color.getColorString();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI, false);
    ctx.fill();
  }
}

/**
 * 流星
 */
class SuperStar {
  static COLORS: Array<string> = [];
  static SCALES = [0.4, 0.6, 0.8, 1.0, 1.2, 1.4];
  //最大的数量
  private static maxCount = 5;
  //流星总数
  private static count = 0;
  //唯一码,用完加一
  private static index = 1;
  private static cssStartIndex = document.styleSheets[0].cssRules.length;
  //最大长度
  private maxDistance = 0;
  //角度
  private angle = 0;
  //大小 //暂时统一大小
  private size = 0;
  //颜色
  private rgbaColor = "";
  private rgbColor = "";
  //速度,持续时间
  private speed = 0;
  private $element: HTMLElement | null = null;
  //起始高度,默认都是顶部开始
  private top = 0;
  //起始左坐标
  private left = 0;
  //每一步行走路程
  private stepX = 0;
  private stepY = 0;
  //帧样式的名称
  private frameName = "";
  private static sleep = 2000;

  public static start($container: HTMLElement, isBegin = false) {
    if (!isBegin && SuperStar.sleep < 0) {
      return;
    }
    SuperStar.initColor();
    SuperStar.sleep = SuperStar.random(200, 20000);
    if (SuperStar.count <= SuperStar.maxCount) {
      new SuperStar().start($container);
    }
    setTimeout(() => {
      SuperStar.start($container);
    }, SuperStar.sleep);
    return;

  }

  public static stop() {
    SuperStar.sleep = -1;
  }

  private static initColor() {
    if (SuperStar.COLORS.length > 0) {
      return;
    }
    this.COLORS = ["255,0,0",
      "255,255,0",
      "218,112,214",
      "255,69,0"];
    for (let i = 0; i <= 100; i++) {
      this.COLORS.push("255,255,255");
    }
  }

  private initParams() {
    SuperStar.count++;
    this.$element = document.createElement('div');
    this.$element.setAttribute("class", "superstar");
    const viewWidth = document.body.clientWidth;
    this.top = SuperStar.random(0, 100);
    //二边各突出200像素
    this.left = SuperStar.random(200, viewWidth - 200);
    //如果在右半边开始,则向左下坠,
    if (this.left > viewWidth / 2) {
      this.angle = -1 * SuperStar.random(30, 90);
    } else {
      this.angle = -1 * SuperStar.random(90, 150);
    }
    const col = SuperStar.COLORS[SuperStar.random(0, SuperStar.COLORS.length - 1)]
    this.rgbaColor = "rgba(" + col + "," + (SuperStar.random(3, 8) / 10) + ")";
    this.rgbColor = "rgb(" + col + ")";
    this.speed = SuperStar.random(1, 10);
    this.maxDistance = Math.abs(document.body.clientHeight / Math.sin(-this.angle * (Math.PI / 180))) / 1.5 + 200;
    //每一步走的路
    const step = Math.round(this.maxDistance / 5);
    this.stepX = Math.round(step * Math.cos(-this.angle * (Math.PI / 180))) - 1;
    this.stepY = Math.abs(Math.round(step * Math.sin(-this.angle * (Math.PI / 180))));

  }

  private show(canvas: HTMLElement) {
    if (this.$element) {
      canvas.parentElement?.appendChild(this.$element);

      const cssStyle = document.styleSheets[0];
      cssStyle.insertRule(this.createFrame(), cssStyle.cssRules.length);
      this.$element?.setAttribute("id", this.frameName);
      //增加样式
      this.$element.style.top = this.top + "px";
      this.$element.style.backgroundColor, this.rgbColor;
      this.$element.style.left = this.left + "px";
      this.$element.style.animation = this.frameName
        + " " + this.speed + "s linear";
      this.$element.style.webkitAnimation = this.frameName
        + " " + this.speed + "s linear";
      this.$element.style.boxShadow = " 0 0 5px 5px " + this.rgbaColor;


      this.$element.innerHTML = "<Style>#" + this.frameName + ":after {" +
        "border-color: transparent transparent transparent " + this.rgbaColor + ";" +
        "transform: rotate(" + this.angle + "deg) translate3d(1px, "
        + Math.min(Math.floor((-this.angle - 60) / 25) + 4, 5) + "px, 0);" +
        // "box-shadow: 0 0 1px 0 " + this.rgbaColor + ";" +
        "}</Style>";
    }
    setTimeout(() => {
      this.destroy();
    }, this.speed * 1000);
  }

  /**
   * 生成活动帧
   */
  private createFrame(): string {
    this.frameName = "superstar" + "_" + SuperStar.index++;
    let str = "@keyframes " + this.frameName + "{";

    for (let i = 0; i < 6; i++) {
      str += i * 20 + "% {opacity:" + i * 0.2 + ";transform: scale(" + SuperStar.SCALES[i] + ") " +
        "translate3d(" + -this.stepX * i +
        "px, " + this.stepY * i + "px, 0);}  "
    }
    str += "}";
    return str;

  }

  start(canvas: HTMLElement) {
    this.initParams();
    this.show(canvas);
  }

  private static random(min: number, max: number) {
    return parseInt((Math.random() * (max - min + 1) + min) + '');
  }

  private destroy() {
    this.$element?.parentElement?.removeChild(this.$element);
    SuperStar.count--;
    const cssStyle = document.styleSheets[0];

    const len = cssStyle.cssRules.length;
    for (let i = len - 1; i > -0; i--) {
      const rule = cssStyle.cssRules.item(i);
      if (rule instanceof CSSKeyframesRule) {
        if (rule.name === this.frameName) {
          cssStyle.removeRule(i);
          return;
        }
      }
    }
  }
}

class RandomColor {
  private r = 0;
  private g = 0;
  private b = 0;

  static genRandomColor(min: number) {

    min = min || 0;
    const color = new RandomColor();
    color.r = Stars.randomInt(min);
    color.g = Stars.randomInt(min);
    color.b = Stars.randomInt(min);
    return color;
  }

  public getR() {
    return this.r;
  }

  public getG() {
    return this.g;
  }

  public getB() {
    return this.b;
  }

  getColorString() {
    return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ', 0.7)';
  }


}
