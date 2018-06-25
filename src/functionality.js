const generatePentagon = function(x, y, id, numShards=0, scaleX=1, scaleY=1) {
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

  //Testing
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

  // 5. Generate the individual shards shards pointsd on the {numShards}
  // Each shard uses the previous two points to calculate its' own
  // points.
  for(let i=0;i<points.length;i++){
    let pointSet = [points[i],points[(i+1) % (points.length)]],
        base = distanceBetweenPoints(pointSet).toFixed(2),
        height = distanceBetweenPoints([midPoint(pointSet), center]).toFixed(2),
        shards = [];

    /**
     * Generates the shards recursively.
     * @param  {[type]} topPoints [description]
     * @param  {[type]} n         [description]
     * @return {[DOM Objects]}    returns a list of DOM objects
     */
    function generateShard(topPoints, n=numShards){
      if(n === 1){
        $svg.append(makeSVG('polygon', {
          class: "shard",
          fill:"#7CE0F9",
          points: topPoints.concat([center]).map((point) => point.join(',')).join(' ')
        }));
      } else {
        let nextPointSet = [[((2*n+1)*base)/(2*n),height/n],[base/(2*n), height/n]],
            shardPoints  = topPoints.concat(nextPointSet);
        console.log(i,": ",shardPoints);
        $svg.append(makeSVG('polygon', {
          class: "shard",
          fill: "#7CE0F9",
          points: shardPoints.map((point) => point.join(',')).join(' ')
        }));
        generateShard(nextPointSet, n-1);
      }
    }

    generateShard(pointSet);
  }
}

/**
 * Creates a pentagon at the given id with
 * @param  {[int]} x  [width of pentagon]
 * @param  {[int]} y  [height of pentagon]
 * @param  {[string]} id [id of SVG element to place pentagon]
 * @param  {[int]} numShards [the number of shards per slice]
 * @param  {[int]} scaleX [scales in the x dimension] optional
 * @param  {[int]} scaleY [scales in the y dimension] optional
 */
generatePentagon(500, 500, '#J-svg-pentagon', 1, 1, 0.95);
