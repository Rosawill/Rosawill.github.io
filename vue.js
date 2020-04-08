function createVueObjects() {
  resultView = new Vue({
    el: '#app',
    data: {
      locations: 
      [
        {
          name: 'big house',
          img: './img/bighouse.jpg', 
          selected: false
        },
        {
          name: 'law quad',
          img: './img/lawquad.jpg', 
          selected: false
        },
        {
          name: 'michigan theater',
          img: './img/michigantheater.jpg', 
          selected: false
        },
        {
          name: 'skeeps',
          img: './img/skeeps.jpg', 
          selected: false
        },
        {
          name: 'ugli',
          img: './img/ugli.jpg', 
          selected: false
        },
        {
          name: 'blue bus',
          img: './img/bluebus.jpg', 
          selected: false
        },
      ],
      selectedLocation: '',
      grades: ['Freshman' , 'Sophomore' , 'Junior', 'Senior'],
      homePage: true,
      levelPage: false,
      gamePage: false,
      levelLoad: false,
      playGame: false,
      marketPage: false,
      selectedGrade: '',
      tips: ['Go to Bivouac for winter gear!', 'Check out Zingermans for some of Ann Arbors best hot chocolate', 'Visit Yost for some ice skating!'],
      tipNum: 0,
      levelNum: 0,
      leftpos_player: 500,
      leftpos_shooter: 400,
      snowballIndex: 0,
      snowballLimit: 32,
      avatars: [
        {
          img: './img/avatar1.png',
          owned: true,
          using: true
        },
        {
          img: './img/avatar2.png',
          owned: false,
          using: false
        },
        {
          img: './img/avatar3.png',
          owned: false,
          using: false
        },
        {
          img: './img/avatar4.png',
          owned: false,
          using: false
        },
      ],
      currentAvatar: {
        index: 0,
        img: './img/avatar1.png'
      }
    },
    methods: {
      selectLocation(event, location) {
        this.selectedLocation = location;
        this.homePage = false;
        this.levelPage = true;
      },

      selectGrade(event, grade) {
        this.gamePage = true;
        this.levelPage = false;
        this.selectedGrade = grade;
      },

      beginGame() {
        this.gamePage = false;
        this.playGame = true;
        this.tipNum = Math.floor((Math.random() * this.tips.length));
        this.levelNum += 1;
        $('body').css('background-image', "url("+this.selectedLocation.img+")");
      },

      getNewTip() {
        var num = this.tipNum;
        while(num == this.tipNum){
          num = Math.floor((Math.random() * this.tips.length));
        }
        this.tipNum = num;
      },

      // need to reset blocks and potentially modify number of snowballs
      // also need to add in a part with wintering tip
      levelTransition() {
        this.getNewTip();
        this.playGame = false;
        this.levelLoad = true;
        this.levelNum++;
        this.snowballIndex = 0;
        this.snowballLimit = this.snowballLimit + 12;
      },

      newLevel() {
        this.levelLoad = false;
        this.marketPage = false;
        this.playGame = true;
      },

      test(){
        alert("rwvecd");
      },

      goToMarket() {
        this.levelLoad = false;
        this.marketPage = true;
      },

      purchaseAvatar(event, index) {
        if(points >= 10){
          this.avatars[index].owned = true;
          points = points - 10;
        }
        else{
          alert("You don't have enough points to purchase this avatar!");
        }
      },

      changeAvatar(event, index) {
        this.avatars[this.currentAvatar.index].using = false;
        this.avatars[index].using = true;
        this.currentAvatar.index = index;
        this.currentAvatar.img = this.avatars[index].img;
      },


      handleGlobalKeyDown(e) {
        console.log(e.keyCode);
        var gameDiv = $('#playGameDiv');
        var shooter = $('#shooter');
        var player = $('#player');
        switch (e.which) {
          case 37:
            //left arrow
          player.css('left', this.leftpos_player - 10 + "px");
          this.leftpos_player = this.leftpos_player - 10;

          shooter.css('left', this.leftpos_shooter - 10 + "px");
          this.leftpos_shooter = this.leftpos_shooter - 10;
          break;
          case 39:
            //right arrow
            player.css('left', this.leftpos_player + 10 + "px");
            this.leftpos_player = this.leftpos_player + 10;

            shooter.css('left', this.leftpos_shooter + 10 + "px");
            this.leftpos_shooter = this.leftpos_shooter + 10;
            break;
          case 38:
            console.log("fire attempt");
            // if player is out of snowballs, trigger level transition
            if(this.snowballIndex >= this.snowballLimit) {
              console.log("Out of snowballs!");
              this.levelTransition();
              break;
            }
            var snowballDivStr = "<div id='s-" + this.snowballIndex + "' class='snowball'><img src='img/snowball.png'/></div>";
            gameDiv.append(snowballDivStr);
            // Create snowball handle
            var curSnowball = $('#s-'+this.snowballIndex);
            this.snowballIndex++;
            // Set snowball position, vertical and horizontal
            curSnowball.css('position', 'fixed');
            curSnowball.css('top', parseInt(shooter.css('top')) + "px");
            var rxPos = parseInt(shooter.css('left'));
            curSnowball.css('left', rxPos);

            setInterval( function() {
            
              curSnowball.css('top', parseInt(curSnowball.css('top'))-10);
              if (parseInt(curSnowball.css('top')) <= curSnowball.height()) {
                curSnowball.remove();
              }
            }, 50);
            break;
          default:
            console.log("Invalid input!");
        }
      },
    },

  })
}
