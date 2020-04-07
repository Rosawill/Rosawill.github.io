var resultView = new Vue({
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
    points: 0
  },
  methods: {
    selectLocation(event, location) {
      this.selectedLocation = location;
      this.homePage = false;
      this.levelPage = true;
    },

    isColliding(o1, o2) {
      return isOrWillCollide(o1, o2, 0, 0);
    },

    willCollide(o1, o2, o1_xChange, o1_yChange){
      return isOrWillCollide(o1, o2, o1_xChange, o1_yChange);
    },

    isOrWillCollide(o1, o2, o1_xChange, o1_yChange){
      const o1D = { 'left': o1.offset().left + o1_xChange,
            'right': o1.offset().left + o1.width() + o1_xChange,
            'top': o1.offset().top + o1_yChange,
            'bottom': o1.offset().top + o1.height() + o1_yChange
      };
      const o2D = { 'left': o2.offset().left,
            'right': o2.offset().left + o2.width(),
            'top': o2.offset().top,
            'bottom': o2.offset().top + o2.height()
      };
      // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
      if (o1D.left < o2D.right &&
        o1D.right > o2D.left &&
        o1D.top < o2D.bottom &&
        o1D.bottom > o2D.top) {
         // collision detected!
         return true;
      }
      return false;
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

    goToMarket() {
      this.levelLoad = false;
      this.marketPage = true;
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

function graduallyFadeAndRemoveElement(elementObj){
  // Fade to 0 opacity over 2 seconds
  elementObj.fadeTo(500, 0, function(){
    $(this).remove();
  });
}

function isOrWillCollide(o1, o2, o1_xChange, o1_yChange){
  const o1D = { 'left': o1.offset().left + o1_xChange,
        'right': o1.offset().left + o1.width() + o1_xChange,
        'top': o1.offset().top + o1_yChange,
        'bottom': o1.offset().top + o1.height() + o1_yChange
  };
  const o2D = { 'left': o2.offset().left,
        'right': o2.offset().left + o2.width(),
        'top': o2.offset().top,
        'bottom': o2.offset().top + o2.height()
  };
  // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (o1D.left < o2D.right &&
    o1D.right > o2D.left &&
    o1D.top < o2D.bottom &&
    o1D.bottom > o2D.top) {
     // collision detected!
     return true;
  }
  return false;
}

points = 0; 
pointsAdded = false;
window.addEventListener('keydown', function(e) {
  resultView.handleGlobalKeyDown(e);
  pointsAdded = false;
  this.setInterval(function(){
    $('.snowball').each(function( element ) {
      snowballObject = $(this)
      $('.block').each(function( element ) {
        if(isOrWillCollide(snowballObject, $(this),0 ,0)){
          $(this).attr("src", "./img/hitIceBlock.png");
          $(this).css("width", "100px");
          $(this).attr("class", "hitIceBlock");
          if(!pointsAdded){
            points += 1;
            $("#pointsNum").html(points);
            pointsAdded = true;
          }
        }
      })
    });
  }, 100)
});
