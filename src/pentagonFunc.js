
const generatePentagon = function(x, y, id, numLevels=0, scaleX=1, scaleY=1) {
  var $svg = $(id);

  //Calculates the points of the pentagon with
  function genPentagonPoints(ptX=x, ptY=y, offSetX=0, offSetY=0){
    // 2. Points follow clockwise around the pentagon,
    // starting from the top most point

    let points = [[ptX/2, 0+offSetY], //Top most point
                  [ptX-offSetX, (ptY+offSetY/2)/2.5],
                  [((3*ptX)/4)-(offSetX/2), ptY-offSetY],
                  [(ptX/4)+(offSetX/2), ptY-offSetY],
                  [0+offSetX, (ptY+offSetY/2)/2.5]];
    points.forEach((point) => {
      point[0] *= scaleX;
      point[1] *= scaleY;
    });
    return points
  }

  var points = genPentagonPoints();

  //Calculate center
  let center = [(x*scaleX)/2, (y*scaleY)/2];

  //3. Set width and height of frame pointsd on points
  $svg.attr({
    width: points[1][0], //points[1][0] is the right-most point
    height: points[2][1] //points[2][1] || points[3][1] is the bottom-most point
  });

  //4. Generate the pentagon
  $svg.find('.pentagon').attr('points', ptsToString(points))

  // 5. Generate the individual shards shards pointsd on the {numShards}
  // Each shard uses the previous two points to calculate its' own
  // points.
  let shards = [];

  for(let i=1;i<=numLevels;i++){
    let offSetX_prev = Math.floor(((i-1)/numLevels)*(x/2)),
        offSetY_prev = Math.floor(((i-1)/numLevels)*(y/2)),
        offSetX_curr = Math.floor((i/numLevels)*(x/2)),
        offSetY_curr = Math.floor((i/numLevels)*(y/2))
        points_Prev = genPentagonPoints(x,y, offSetX_prev, offSetY_prev),
        points_Curr = genPentagonPoints(x,y, offSetX_curr, offSetY_curr)

    for(let j=0;j<points.length;j++){
      let a = j,                       //First point
          b = (j+1) % (points.length), //Second Point
          pointSet = [points_Prev[a],points_Prev[b]];

      // Checks if it needs to make triangles
      if(i >= numLevels-1 ){ // Only activates if it's the second to the last lvl
        pointSet = pointSet.concat([center]);
      } else {
        pointSet = pointSet.concat([points_Curr[b], points_Curr[a]]);
      }

      shards.push(makeSVG('polygon', {
        class: "shard shard-" + i + j,
        fill: "#cfecfe  ",
        stroke: "#717073",
        "stroke-width": 0.4 + (numLevels - (i))*0.6, //mx+c => m = rate of change of thickness; c = starting thickness
        points: ptsToString(pointSet)
      }));

    }
  }

  $svg.append(shards);

}

function onClick(e) {
  console.log(e.target);
}

/**
 * Creates a pentagon at the given id with
 * @param  {[int]} x  [width of pentagon]
 * @param  {[int]} y  [height of pentagon]
 * @param  {[string]} id [id of SVG element to place pentagon]
 * @param  {[int]} numLevels [the number of shards per slice]
 * @param  {[int]} scaleX [scales in the x dimension] optional
 * @param  {[int]} scaleY [scales in the y dimension] optional
 */
// generatePentagon(500, 500, '#J-svg-pentagon', 1, 1, 0.9);
generatePentagon(425, 500, '#J-svg-pentagon', 4, 1.05, 0.85);
