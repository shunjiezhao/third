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