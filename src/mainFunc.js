$(document).ready(function() {
  const id = '#svg-pentagon';
  //Sets the initial hash
  if(window.location.hash == ""){
    window.location.hash = '0,0&0,0&0,0&0,0&0,0';
  }

  let points = generatePentagon(425, 500, id, 8, 1.05, 0.85, getHash(window.location.hash));

  //3. Set width and height of frame point on points
  $("#J-svg-pentagon").attr({
    width: points[1][0], //points[1][0] is the right-most point
    height: points[2][1] //points[2][1] || points[3][1] is the bottom-most point
  });

  //Sets the popup window with 'coaching questions' when clicked
  function onClick(e) {
    console.log("teehee");
    let $popup = document.getElementById('popup-' + e.target.classList[1]);
    $popup.classList.toggle('hide');
  }
  $(".awareness").click(onClick);
  $(".connecting").click(onClick);
  $(".creative").click(onClick);
  $(".action").click(onClick);
  $(".disciplined").click(onClick);


  // Sets the hovering effect
  // Awareness
  $(".awareness").hover(function(e) {
     e.target.classList.toggle('hover');
  }, function(e) {
    e.target.classList.toggle('hover');
  });

  // Connecting

  // $(".connecting").hover(onEnter, onLeave);
  // $(".connecting").click(onEnter, onLeave);
  //
  // function onEnter(e) {
  //   let shard_id = getID(e.target);
  //   updateShardsCascade(shard_id, HIGH_LIGHT_COLOR);
  // }
  //
  // function onLeave(e) {
  //   let shard_id = getID(e.target),
  //       currHash = getHash(),
  //       cap = currHash[shard_id[0]][1];
  //   updateShardsCascade(shard_id, NORMAL_COLOR, cap);
  // }
  //
  // function onClick(e) {
  //   let shard_id = getID(e.target);
  //   setHash(shard_id);
  // }

  // Creative


  // Action

  // Disciplined
})
