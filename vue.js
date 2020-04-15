function createVueObjects() {
  resultView = new Vue({
    el: '#app',
    data: {
      pages: {
        'Main': true,
        'Professional': false,
        'Blog': false,
        'Gallery': false,
        'Projects': false,
        'Me': false,
      },
      curPage: 'Main',
    },
    methods: {
      whatever() {
        console.log('ehy');
      },

      changePage(page) {
        if(this.pages[page] == false){
          let curPage = this.curPage;
          this.pages[curPage] = false;
          this.pages[page] = true;
          this.curPage = page;
        }
      },
    },

  })
}
