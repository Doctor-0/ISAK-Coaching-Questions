$(document).ready(function() {
  //Sets the initial hash
  if(window.location.hash == ""){
    window.location.hash = '0,0&0,0&0,0&0,0&0,0';
  }

  generatePentagon(425, 500, '#J-svg-pentagon', 4, 1.05, 0.85, getHash(window.location.hash));
  // generatePentagon(500, 500, '#J-svg-pentagon', 8, 1, 0.9);
})
