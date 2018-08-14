const id = '#svg-pentagon',
      numLevels = 8,
      DEFAULT_TITLE = 'Click me to edit';

var defaultState = {
  'page' : 0,
  0 : [[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]],
  1 : [[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]],
  2 : [[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]],
  'title': DEFAULT_TITLE,
}

$(document).ready(function() {
  //Sets the initial hash
  if(window.location.hash == ""){
    window.location.hash = JSON.stringify(defaultState)
  }

  let currHash = getHash();

  generatePentagon(425, 500, id, numLevels, 1.05, 0.85, currHash[currHash['page']]);

  // Adds the level labels
  for(let i=0;i<4;i++){
      let el = makeSVG('text', {
        x:223.125,
        y:(53.125*i),
        class: 'level'
      })
      el.textContent = 4-i;
      $("#J-svg-pentagon").append(el);
  }

  /** TEXT INTERACTION W/ SHARDS **/
  // Sets the hovering effect
  const opacity=0.15;

  function updateShardsCascade(shard_id, val=1) {
    for(let i=shard_id[1];i<=numLevels;i++){
      $('.shard-' + shard_id[0] + i).attr('opacity', val);
    }
  }

  // Awareness
  $(".awareness").hover(function(e) {
    $(".level").attr('opacity', opacity)
     updateShardsCascade([0,0], opacity); //Connecting
     updateShardsCascade([2,0], opacity); //Self-Disciplined
     updateShardsCascade([3,0], opacity); //Creative
  }, function(e) {
    $(".level").attr('opacity', 1)
    updateShardsCascade([0,0]); //Action-Taking
    updateShardsCascade([2,0]); //Awareness
    updateShardsCascade([3,0]); //Awareness
  });

  // Connecting
  $(".connecting").hover(function(e) {
    $(".level").attr('opacity', opacity)
     updateShardsCascade([2,0], opacity); //Self-Disciplined
     updateShardsCascade([3,0], opacity); //Creative
     updateShardsCascade([4,0], opacity); //Awareness
  }, function(e) {
    $(".level").attr('opacity', 1)
    updateShardsCascade([2,0]); //Self-Disciplined
    updateShardsCascade([3,0]); //Creative
    updateShardsCascade([4,0]); //Awareness
  });

  // Creative
  $(".creative").hover(function(e) {
    $(".level").attr('opacity', opacity)
     updateShardsCascade([0,0], opacity); //Connecting
     updateShardsCascade([4,0], opacity); //Awareness
  }, function(e) {
    $(".level").attr('opacity', 1)
    updateShardsCascade([0,0]); //Action-Taking
    updateShardsCascade([4,0]); //Awareness
  });

  // Action
  $(".action").hover(function(e) {
    $(".level").attr('opacity', opacity)
     updateShardsCascade([0,0], opacity); //Connecting
     updateShardsCascade([3,0], opacity); //Creative
     updateShardsCascade([4,0], opacity); //Awareness
  }, function(e) {
    $(".level").attr('opacity', 1)
    updateShardsCascade([0,0]); //Connecting
    updateShardsCascade([3,0]); //Creative
    updateShardsCascade([4,0]); //Awareness
  });

  // Disciplined
  $(".disciplined").hover(function(e) {
    $(".level").attr('opacity', opacity)
     updateShardsCascade([0,0], opacity); //Connecting
     updateShardsCascade([1,0], opacity); //Action-Taking
     updateShardsCascade([3,0], opacity); //Creative
  }, function(e) {
    $(".level").attr('opacity', 1)
    updateShardsCascade([0,0]); //Connecting
    updateShardsCascade([1,0]); //Action-Taking
    updateShardsCascade([3,0]); //Creative
  });

  //** TITLE **//
  // Adds editing functionality to the title
  if($('#title-text').text() !== currHash['title'] ){
    $('#title-text').text(currHash['title']);
  }

  $('#title-text').on('blur', function() {
    let text = $(this)[0].innerText;
    setHash('title',text);
  });
  // Prevents new line from being usable when editing
  $('#title-text').keypress(function(e){return e.key != 'Enter'; });

  //** MENU ITEMS **//
  $('.menuItem').click(function(e) {
    let newPage = e.target.classList[1].slice(-1)
    setHash('page', newPage);
    
  })

})
