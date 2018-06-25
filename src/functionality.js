/**
 * Creates a pentagon at the given id with
 * @param  {[int]} x  [width of pentagon]
 * @param  {[int]} y  [height of pentagon]
 * @param  {[string]} id [id of SVG element to place pentagon]
 * @param  {[int]} scaleX [scales in the x dimension] optional
 * @param  {[int]} scaleY [scales in the y dimension] optional
 */
const generatePentagon = function(x, y, id, num=0, scaleX=1, scaleY=1) {
  var $svg = $(id);

  //1. Apply scales if they exist
  if(scaleX !== 1 || scaleY !== 1){
    x *= scaleX;
    y *= scaleY;
  }

  // 2. Points follow clockwise around the pentagon,
  // starting from the top most point
  var points = [[x/2, 0], //Top most point
              [x, y/2],
              [(3*x)/4, y],
              [x/4, y],
              [0, y/2]];

  //Calculate center
  let center = [x/2, y/2];

  // Testing
  // let centerCircle = makeSVG('circle', {
  //   cx:center[0],
  //   cy:center[1],
  //   r:"10",
  //   fill:"FFF"
  // })
  // $(id).append(centerCircle);

  //3. Set width and height of frame pointsd on points
  $svg.attr({
    width: points[1][0], //points[1][0] is the right-most point
    height: points[2][1] //points[2][1] || points[3][1] is the bottom-most point
  });

  //4. Generate the pentagon
  let pointsPentagon = '',
      pentagon = $svg.find('.pentagon');

  for(let i=0;i<points.length;i++){
    pointsPentagon += points[i].join(",") + " ";
  }

  pentagon.attr('points', pointsPentagon)

  // 5. Generate the individual shards shards pointsd on the {{num}}
  console.log(points);
  for(let i=0;i<points.length;i++){
    let j = (i+1) % (points.length),
        pointSet = [points[i],points[j]],
        base = distanceBetweenPoints(pointSet).toFixed(2),
        height = distanceBetweenPoints([midPoint(pointSet), center]).toFixed(2);
    console.log(i,"\nBase: ",base, " Height: ", height);
  }
}

// generatePentagon(500, 500, '#J-svg-pentagon',0, 1, 1);
generatePentagon(500, 500, '#J-svg-pentagon',0, 1, 0.9);
