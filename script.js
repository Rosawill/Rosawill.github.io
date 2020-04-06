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
      }
  
    }
  })
  