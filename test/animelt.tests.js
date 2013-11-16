'use strict';

$(function(){
  var i = 0;
  $("#t1").click(function(){
    i += Math.round( Math.random( i ) * 180 );
    $(".test").animelt({
      transform: "rotate("+i+"deg)"
    }, 1500);
  });

})