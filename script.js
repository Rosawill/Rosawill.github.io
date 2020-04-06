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
      selectedGrade: '',
      tips: ['Go to Bivouac for winter gear!', 'Check out Zingermans for some of Ann Arbors best hot chocolate', 'Visit Yost for some ice skating!'],
      tipNum: 0,
      levelNum: 0,
      leftpos_player: 500,
      leftpos_shooter: 400,
      snowballIndex: 1,
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

      handleGlobalKeyDown(e) {
        console.log(e.keyCode);
        if(e.keyCode == "37"){ 
            //left arrow
           $('#player').css('left', this.leftpos_player - 10 + "px");
           this.leftpos_player = this.leftpos_player - 10;

           $('#shooter').css('left', this.leftpos_shooter - 10 + "px");
           this.leftpos_shooter = this.leftpos_shooter - 10;
        }
        else if (e.keyCode == "39"){
            //right arrow
            $('#player').css('left', this.leftpos_player + 10 + "px");
            this.leftpos_player = this.leftpos_player + 10;

            $('#shooter').css('left', this.leftpos_shooter + 10 + "px");
            this.leftpos_shooter = this.leftpos_shooter + 10;
        }

        else if (e.keycode == "38"){
          console.log("fire attempt");
            var snowballDivStr = "<div id='s-" + snowballIndex + "' class='snowball'><img src='img/snowball.jpg'/></div>";
            playGame.append(snowballDivStr);
            var curSnowball = $('#s-'+snowballIndex);
            snowballIndex++;

            curSnowball.css('top', shooter.css('top'));

            var rxPos = parseInt(shooter.css('left')) + (shooter.width()/2);
            curSnowball.css('left', rxPos);

            setInterval( function() {
              curSnowball.css('top', parseInt(curSnowball.css('top'))-10);

              if (parseInt(curSnowball.css('top')) < curSnowball.height()) {

              curSnowball.remove();
              }
            }, 50);

        }
      },
    },

  })

  window.addEventListener('keydown', function(e) {
    resultView.handleGlobalKeyDown(e);
  });
  


  