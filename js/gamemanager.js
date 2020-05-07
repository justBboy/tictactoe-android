
var Gamemanager = {
    init: function(game_status){
        this.game_status = game_status;
        switch(this.game_status){
            case "intro":
                this.introState();
                break;
        }
    },

    introState: function(){
        game_intro_div = document.getElementById("game-intro");
        intro_name = document.querySelector(".game-intro h2");
        game_intro_div.style.display = "block";
        intro_name.style.animationPlayState = "running";
        var self = this;
        intro_name.onanimationend = function(ev){
            ev.target.style.animationPlayState = "paused";
            ev.target.parentElement.style.display = "none";
            self.menuState();
        }
    },

    menuState: function(){
        var game_menu = document.getElementById("game-menu")
        game_menu.style.display = "block";
        document.getElementById("play-game").addEventListener("click", function(ev){
            game_menu.style.display = "none";
            document.querySelector(".nav").style.display = "flex";
            document.querySelector(".game-container").style.display = "flex";
        }, false)
    }
}

Gamemanager.init("intro")