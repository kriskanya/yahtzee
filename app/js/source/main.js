(function(){
  'use strict';

  $(document).ready(init);

  var currentUser = 0;
  var currentRoll = 3;

  function init(){
    $('#add').click(add);
    $('.arrow').click(arrow);
    $('body').keydown(move);
    $('#add-score').click(score);
  }

  function score(event){
    var addScore = $('#score').val();
    $('.horizontal .vertical').text(addScore);   //selects the thing with both classes .horizontal and .vertical

    event.preventDefault();
  }

  function move(event){

    switch(event.keyCode){
    case 38:
      currentUser--;
      break;
    case 40:
      currentUser++;
      break;
    case 37:
      currentRoll--;
      break;
    case 39:
      currentRoll++;
      break;
    }

    paintScreen();
    if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){
    event.preventDefault();  //stops the arrow keys from making the browser scroll, which is the default
    }
  }

  function arrow(){
    switch(this.id){    //selects the id of whatever you clicked on
    case 'up':
      currentUser--;
      paintScreen();
      break;
    case 'down':
      currentUser++;
      paintScreen();
      break;
    case 'left':
      currentRoll--;
      paintScreen();
      break;
    case 'right':
      currentRoll++;
      paintScreen();
      break;
    }
  }

  function paintScreen(){
    $('.horizontal').removeClass();  //looks in the entre DOM for something with a class of horizontal; once it's found it, it will remove it
    $('.vertical').removeClass();

    var $trs = $('#game > tbody > tr');  //this is an array of all the trs
    var tr = $trs[currentUser];    //you're going into the array and pulling out the one at [1] position
    $(tr).addClass('horizontal');

    $('#game > tbody > tr > td:nth-child('+ currentRoll +')').addClass('vertical');
  }

  function add(event){
    var username = $('#username').val();
    var avatar = $('#avatar').val();
    createRow(username, avatar);

    event.preventDefault();      //stops the form from submitting
  }

  function createRow(username, avatar){
    var $tr = $('<tr>');      //table row
    var tds = [];

    for(var i = 0; i < 16; i++){
      tds.push('<td></td>');      //pushes this string into the array 16 times
    }

    $tr.append(tds);
    $('#game > tbody').append($tr);

    var count = $('#game > tbody > tr').length;    //tells you how many <tr>s there are
    console.log(count);

    if(count===1){    //for the first <tr>, add this class, below
    $tr.addClass('horizontal');    //adds horizontal highlight
  }

    var $img = $('<img>');      //creates a jquery image object
    $img.attr('src', avatar).addClass('avatar');    //changes 'src' to avatar

    $tr.children('td:nth-child(1)').append($img);
    $tr.children('td:nth-child(2)').text(username);
    $tr.children('td:nth-child(3)').addClass('vertical');

  }



})();
