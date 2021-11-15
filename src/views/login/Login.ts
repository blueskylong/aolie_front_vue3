import {Stars} from "@/views/login/Stars";
import "./template/login.css";
import {Options, Vue} from "vue-class-component";
import {ElCheckbox, ElInput, ElMessage} from "element-plus/lib";
import {CommonUtils} from "@/common/CommonUtils";
import {AppService} from "@/views/sysfunc/services/AppService";


@Options({
  name: "login",
  template: require("./template/Login.html"),
  components: {
    ElInput,
    ElCheckbox
  }
})
export class Login extends Vue {
  userName: string | null = null;
  password: string | null = null;
  rememberMe = true;

  doLogin() {
    if (CommonUtils.isEmpty(this.userName)) {
      ElMessage.info("请输入用户帐号");
      return;
    } else if (CommonUtils.isEmpty(this.password)) {
      ElMessage.info("请输入密码");
      return;
    }
    const that = this as Login;
    if (this.userName != null) {
      AppService.login(this.userName, <string>this.password).then((user) => {
          if (user) {
            that.$store.dispatch('setUser', user);
            this.$store.dispatch("setIsLogin", true);
            that.$router.push("main");
          }
        }
      )
    }
  }

  mounted() {
    Stars.start(<HTMLCanvasElement>this.$refs.stars);
  }

  unmounted() {
    Stars.destroy();

  }

  mouseMove(e: MouseEvent) {
    Stars.mousePosition.x = e.pageX;
    Stars.mousePosition.y = e.pageY;
  }

}
