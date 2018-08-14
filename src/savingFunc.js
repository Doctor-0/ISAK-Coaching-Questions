/**
* Checks to see if there is a hash in window.location.hash
*
* Hashes can contain up to numLevels many points. Each point dictates
* what is highlight and everything below it. For example:
*  > hash = '#2,3&3,2&4,1'
* means that shard 2 section 3 and all below it are highlighted.
*
* Assumes that there is always a hash
*
* @param  {String}
* @return {[[int, int]]]} [If the hash is empty it returns an empty array,
*                          otherwise it returns an array of points to highlight]
*/
function getHash() {
 let hash = window.location.hash.slice(1);
 hash = hash.replace(/%20/g,' ');
 hash = hash.replace(/%22/g, '\"');
 let hashObj = JSON.parse(hash);
 return hashObj;
}

// Updates a specific property of the state object
function setHash(prop, val) {
 let hash = getHash();
 hash[prop] = val;
 window.location.hash = JSON.stringify(hash);
 return hash;
}

// Just updates the coordinates
function setCoords(curCoords) {
 let hash = getHash();
 hash[hash['page']][curCoords[0]] = curCoords;
 window.location.hash = JSON.stringify(hash);
}
