import {User} from "@/components/sysfunc/user/User";

export class AppService {
  static login(accountCode: string, pass: string): Promise<User> {
    return new Promise<User>(resolve => {
      const user = new User();
      user.accountCode = accountCode;
      user.userName = accountCode;
      user.userId = 10;
      resolve(user);
    })
  }
}
