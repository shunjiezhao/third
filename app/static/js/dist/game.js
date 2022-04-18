class Menu{
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="practice-menu">
    <div class="practice-menu-field">
         <div class="practice-menu-field-item practice-menu-field-item-settings">
            退出
         </div>
    </div>
</div>
`)
    this.$menu.hide();
    this.root.$ac_game.append(this.$menu);
    console.log("menu hide");
    this.$settings = this.$menu.find('.practice-menu-field-item-settings');
    console.log(this.$settings);
    this.start();
    }
    start(){
        this.add_listening_events();
    }
    add_listening_events(){
        let outer = this;
        this.$settings.click(function (){
            console.log("click Exit");
            outer.root.settings.logout_on_remote();
        });
    }
    show(){
        console.log("menu show ");
        this.$menu.show();
    }
    hide(){
        this.$menu.hide();
    }
}
class Settings{
    constructor(root) {
        this.root = root;
        this.username = "";
        this.$settings = $(`
<div class="practice-settings">
    <div class="practice-settings-login">
        <div class="practice-settings-title">
            登录
        </div>
        <div class="practice-settings-username">
            <div class="practice-settings-item">
                <input type="text" placeholder="用户名">
            </div>
        </div>
        <div class="practice-settings-password">
            <div class="practice-settings-item">
                <input type="password" placeholder="密码">
            </div>
        </div>
        <div class="practice-settings-submit">
            <div class="practice-settings-item">
                <button>登录</button>
            </div>
        </div>
        <div class="practice-settings-error-message">
        </div>
        <div class="practice-settings-option">
            注册
        </div>
        <br>
    </div>

    <div class="practice-settings-register">
        
        <div class="practice-settings-title">
            登录
        </div>
        <div class="practice-settings-username">
            <div class="practice-settings-item">
                <input type="text" placeholder="用户名">
            </div>
        </div>
        <div class="practice-settings-password">
            <div class="practice-settings-item practice-settings-password-first">
                <input type="password" placeholder="密码">
            </div>
        </div>
          <div class="practice-settings-password practice-settings-password-second">
            <div class="practice-settings-item">
                <input type="password" placeholder="确认密码">
            </div>
        </div>
        <div class="practice-settings-submit">
            <div class="practice-settings-item">
                <button>注册</button>
            </div>
        </div>
        <div class="practice-settings-error-message">
        </div>
        <div class="practice-settings-option">
            登录
        </div>
        <br>
    </div>    
</div>    
`);

        this.root.$ac_game.append(this.$settings);
        this.$login = this.$settings.find(".practice-settings-login");
        this.$login_username  = this.$login.find(".practice-settings-username input");
        this.$login_password = this.$login.find(".practice-settings-password input");
        this.$login_submit = this.$login.find(".practice-settings-submit  button");
        this.$login_error_message = this.$login.find(".practice-settings-error-message");
        this.$login_register = this.$login.find(".practice-settings-option");
        this.$login.hide();

        this.$register = this.$settings.find(".practice-settings-register");
        this.$register_username = this.$register.find(".practice-settings-username input");
        this.$register_password = this.$register.find(".practice-settings-password-first input");
        this.$register_password_confirm = this.$register.find(".practice-settings-password-second input");
        this.$register_error_message = this.$register.find(".practice-settings-error-message");
        this.$register_submit = this.$register.find(".practice-settings-submit button");
        this.$register_login = this.$register.find(".practice-settings-option");
        this.$register.hide();

        this.start();
    }

    start(){
        this.getinfo_web();
        this.web_add_listening_events();
    }
    login(){
        this.$register.hide();
        console.log("login extand");
        this.$login.show();
    }

    web_add_listening_events(){
        this.add_listening_events_login();
        this.add_listening_events_register();
    }



    add_listening_events_login(){
        let outer = this;
        this.$login_register.click(function(){
            outer.register();
        });
        this.$login_submit.click(function(){
            outer.login_on_remote();
        });
        this.$register_submit.click(function(){
            outer.register_on_remote();
        });
    }
    add_listening_events_register(){
        let outer = this;
        this.$register_login.click(function(){
            outer.login();
        });
    }
    login_on_remote(){
        let outer = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        $.ajax({
            url: "/settings/login",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function(resp){
                if(resp.result === "success"){
                    location.reload();
                }else{
                    outer.$login_error_message.html(resp.result);
                }
            }
        });

    }
    register_on_remote(){
        let outer = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();
        this.$register_error_message.empty();
        $.ajax({
            url: "/settings/register/",
            type: "GET",
            data: {
                username: username,
                password: password,
                password_confirm: password_confirm,
            },
            success: function(resp){
                if(resp.result === "success"){
                    location.reload();
                }else{
                    outer.$register_error_message.html(resp.result);
                }
            }

        });

    }
    logout_on_remote(){
        $.ajax({
            url: "/settings/logout/",
            type: "GET",
            success: function(resp){
                if(resp.result === "success"){
                    console.log("logout on remote");
                    location.reload();
                }
            }
        });
    }
    register(){
        this.$login.hide();
        this.$register.show();
    }

    getinfo_web(){
        console.log("getinfo- web");
        let outer = this;
        $.ajax({
            url: "/settings/getinfo/",
            type: "GET",
            success: function(resp) {
                if(resp.result === "success"){
                    console.log("getinfo on web success");
                    outer.hide();
                    outer.username =resp.username;
                    outer.root.menu.show();
                }else{
                    outer.login();
                }
            }
        });
    }
    hide(){
        this.$settings.hide();
    }
    show(){
        this.$settings.show();
    }
}
class Practice{
    constructor(id) {
        this.id = id;

        this.$ac_game = $('#' + id);

        this.settings = new Settings(this);
        this.menu = new Menu(this);
        this.start();
    }

    start(){

    }

}