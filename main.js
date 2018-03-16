//jquery way - can run javascript inside jquery
$(document).ready(function () {
  var board_values
  var card = document.getElementById("card_template").innerHTML
  var STATE = Object.freeze({
    START: 0,
    NEXT: 1,
    FINISHED: 2
  })
  var current_state = STATE.START
  var match1
  var match2

  $('#new_game').on('click', function () {
    var num_of_cards = $('#dificulty').val()
    init_board(num_of_cards)
    render_card(num_of_cards)
  })


  // size = gotta be even
  function init_board(size) {
    // Initialize stuff - remove previous board element
    $(".flip-container").remove();
    board_values = []

    // x = current element, i = index
    arr = [...Array(99)].map((x, i) => i)

    var half = size / 2;
    // pick size/2 random numbers of array size
    for (var i = 0; i < half; i++) {
      index = Math.floor(Math.random() * arr.length)
      board_values.push(arr.splice(index, 1)[0])
    }

    // copy array so that all values are doubled
    board_values = board_values.concat(board_values.slice(0));

    //randomize the array
    for (i = board_values.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = board_values[i]
      board_values[i] = board_values[j]
      board_values[j] = temp
    }
  }

  function render_card(num) {
    // replace placeholder and create and append card
    for (var i = 0; i < num; i++) {
      temp = card.replace(/digit/, board_values[i])
      $(".board").append(temp)
    }

    // Set attributes and add click events
    var temp = document.getElementsByClassName("flip-container")
    for (var i = 0; i != temp.length; ++i) {
      temp[i].style.visibility = "visible"; // hidden has to be a string
      // add onclick function to flip-container



      temp[i].onclick = function () {
        console.log("started: " + current_state)

        // one card peek option - this is the same card
        if ( match1 && $(this).find('.flipper').hasClass("rotated") ) {
          match1.find('.flipper').removeClass("rotated");
          match1 = undefined
          current_state = STATE.START
          
        } else {
          switch (current_state) {
            case STATE.START:
              // get child class flipper
              var temp = $(this).children('.flipper')[0];
              // Just adds a class to the flipper class
              $(temp).toggleClass("rotated")

              match1 = $(this)
              current_state++;
              break;
            case STATE.NEXT:
            // todo: force user to select a new card??
            // only if user didn't click the match1 again
            
              current_state = STATE.FINISHED
              // get child class flipper
              var temp = $(this).children('.flipper')[0];
              // Just adds a class to the flipper class
              $(temp).toggleClass("rotated")

              match2 = $(this)
              value1 = parseInt(match1.find('text').text())
              value2 = parseInt(match2.find('text').text())

              if (value1 === value2) {
                match1.prop('onclick', null).off('click');
                match2.prop('onclick', null).off('click');
                match1.addClass("found");
                match2.addClass("found");
                current_state = STATE.START
                match1 = undefined
                match2 = undefined
                value1 = undefined
                value2 = undefined
              } else {

                setTimeout(function () {
                  match1.find('.flipper').removeClass("rotated");
                  match2.find('.flipper').removeClass("rotated");
                  match1 = undefined
                  match2 = undefined
                  value1 = undefined
                  value2 = undefined
                  // $('.rotated').removeClass( "rotated" );
                  current_state = STATE.START
                }, 800);
              }
              break;
            case STATE.FINISHED:
              break;
          }

        }
        console.log("ended: " + current_state)
      }
    }
  }
})