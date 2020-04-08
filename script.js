$(document).ready( function() {
  points = 0; 
  createVueObjects();
  $(window).keydown(function(e) {
    resultView.handleGlobalKeyDown(e);
  });
  checkCollisions();
})

function checkCollisions(){
  setInterval(function(){
    $('.snowball').each(function() {
      var snowballObject = $(this);
      i = 0;
      $('.block').each(function() {
        var iceblock = $(this);
        console.log("checking for collision ");
        i = i+1;
        if(isOrWillCollide(snowballObject, iceblock,0 ,0)){
          console.log("collided");
          snowballObject.remove();
          $(this).attr("src", "./img/hitIceBlock.png");
          $(this).css("width", "100px");
          $(this).attr("class", "hitIceBlock");
          //$(this).remove();
          points += 1;
          $("#pointsNum").html(points);
        }
      })
    });
  }, 100);
}


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



