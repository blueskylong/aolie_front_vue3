/**
 * 目标辅助类,可以实现写到文件或后台
 */
export class Logger {
  static error(message: string, className?: string) {
    console.log("error:" + message + (className ? ("  类:" + className) : ""));
  }

  static info(message: string, className?: string) {
    console.log("info:" + message + (className ? ("  类:" + className) : ""));
  }

  static warning(message: string, className?: string) {
    console.log("warning:" + message + (className ? ("  类:" + className) : ""));
  }
}
