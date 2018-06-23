// var svgPentagon = $('#J-svg-pentagon');
// var points = {
//     base : ["6", "1", "10.7552826", "4.45491503", "8.93892626", "10.045085", "3.06107374", "10.045085", "1.24471742", "4.45491503"],
//     pointsAbility : []
// }
// var setPentagon = function(num) {
//     for (i=1;i<=num;i++) {
//         var pointsChildren = 'points' + i;
//         points[pointsChildren] = new Array();
//         for (j=0;j<points.base.length;j++) {
//             points[pointsChildren].push((parseFloat(points.base[j]) * (6 + i * 4)).toFixed(2));
//             points[pointsChildren][j] = parseFloat(points[pointsChildren][j]) - (i * 24);
//         }
//         svgPentagon.find('.pentagon-' + i).attr('points', points[pointsChildren].join(' '));
//     }
// }
// setPentagon(5);

/**
 * Creates a pentagon at the given id
 * @param  {[int]} x  [width of pentagon]
 * @param  {[int]} y  [height of pentagon]
 * @param  {[string]} id [id of SVG element to place pentagon]
 * @param  {{int}} scaleX [scales in the x dimension] optional
 * @param  {{int}} scaleY [scales in the y dimension] optional
 * @return {[type]}    [description]
 */
const generatePentagon = function(x, y, id, scaleX=1, scaleY=1) {
  var svg = $(id);

  // Points follow clockwise around the pentagon,
  // starting from the top most point
  let base = [[x/2, 0], //Top most point
              [x, y/2],
              [(3*x)/4, y],
              [x/4, y],
              [0, y/2]]

  //Apply scales if they exist
  if(scaleX !== 1 || scaleY !== 1){
    base.forEach((point) => point[0] *= scaleX);
    base.forEach((point) => point[1] *= scaleY);
  }

  //Set width and height of frame based on points
  svg.attr('width', base[1][0]); //base[1][0] is the right-most point
  svg.attr('height', base[2][1]) //base[2][1] || base[3][1] is the bottom-most point

  /**
   * Creates a pentagon
   * @return {[type]} [description]
   */
  function createPentagon() {
    let pointsPentagon = "",
        pentagon = svg.find('.pentagon');

    for(let i=0;i<base.length;i++){
      pointsPentagon += base[i].join(",") + " ";
    }

    pentagon.attr('points', pointsPentagon)
  }

  createPentagon();
}

generatePentagon(500, 500, '#J-svg-pentagon', 1, 0.90);
