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
      selectedGrade: ''
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
      }
  
    }
  })
  