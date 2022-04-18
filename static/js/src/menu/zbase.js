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
