/**
 * [distanceBetweenPoints description]
 * @param  {[Arrray[][]]} points [A 2D array containing two sub arrays]
 * @return {[int]}        [The distance between the two points]
 */

function distanceBetweenPoints(points){
  if(points.length > 2){
    console.log("distanceBetweenPoints() error: more then two points given");
    return -1;
  } else {
    a = points[0][0] - points[1][0];
    b = points[0][1] - points[1][1];
    return Math.sqrt(a*a + b*b);
  }
}

/**
 * Creates a pentagon at the given id with
 * @param  {[int]} x  [width of pentagon]
 * @param  {[int]} y  [height of pentagon]
 * @param  {[string]} id [id of SVG element to place pentagon]
 * @param  {[int]} scaleX [scales in the x dimension] optional
 * @param  {[int]} scaleY [scales in the y dimension] optional
 */
const generatePentagon = function(x, y, id, num=0, scaleX=1, scaleY=1) {
  var svg = $(id);

  // 1. Points follow clockwise around the pentagon,
  // starting from the top most point
  let base = [[x/2, 0], //Top most point
              [x, y/2],
              [(3*x)/4, y],
              [x/4, y],
              [0, y/2]];

  //2. Apply scales if they exist
  if(scaleX !== 1 || scaleY !== 1){
    base.forEach((point) => point[0] *= scaleX);
    base.forEach((point) => point[1] *= scaleY);
  }

  let center = [x/2, y/2];

  //3. Set width and height of frame based on points
  svg.attr('width', base[1][0]); //base[1][0] is the right-most point
  svg.attr('height', base[2][1]) //base[2][1] || base[3][1] is the bottom-most point

  //4. Generate the pentagon
  let pointsPentagon = "",
      pentagon = svg.find('.pentagon');

  for(let i=0;i<base.length;i++){
    pointsPentagon += base[i].join(",") + " ";
  }

  pentagon.attr('points', pointsPentagon)

  /**
   * Creates base.length-1 shards for each triangle
   * @param {[int]} num [the number of levels per shard]
   * @return {[type]} [description]
   */
  function createShards() {
    for(let i=0;i<base.length-1;i++){
      let b = distanceBetweenPoints(base.slice(i,(i+2)%base.length));

    }
  }

  createShards()
}

generatePentagon(500, 500, '#J-svg-pentagon',0, 1, 0.90);
