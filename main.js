//prototyp kontenera
function Tank(width,height){
    this.x = 0;
    this.y = 0;
	this.width = width;
    this.height = height;
   // this.insert = function(FreeRectChoiceHeuristicMethod){
    //console.log('aaaby' + this.width);
  //};
}

//inicjacja wszystkich pudel
function Boxes(boxes){
  //this.x = 0;
  //this.y = 0;
	this.Boxes = boxes.slice(0);
	
}

/*
//prototyp analizowanego pudla
function Box(width,height) {
  this.x = 0;
  this.y = 0;
  this.w = width;
  this.h = height;
  

}*/

//inicjacja obiektĂÂÄšÂw zapakowanych pudeĂĹĄĂÂ oraz jeszcze wolne
var   usedBoxes = [],
	  freeBoxes = []
	  cargo = [];
var that,tmpBoxes;
var insertMethods = ["RectBestShortSideFit",
										"RectBestLongSideFit",
										"RectBestAreaFit",
										"RectBottomLeftRule",
										"RectContactPointRule"];

// przesiewanie pudeĂĹĄĂÂ za duĂĹĄÄšĹych oraz o rozmiarze 0
var oversized = {
  
  delOversized: function(obj,kontener)
  {
	that = this;// wlasciwe okreslenie scope, kolejne zagniezdzenie this w metodzie testAndSaveOversized
    //powodowalo przeniesienei this
    paczki = obj.filter(that.testAndSaveOversized);
	
	  
  },
  testAndSaveOversized: function(value)
  {
	
    //wskazuje przy pomocy helperĂÂÄšÂw ktĂÂÄšÂe paczki za duze i wtedy dodawane do oversizedList else zwraca wartosc
    if(that.getOversized(value) || that.getUndersized(value))
		 {
			 console.log('paczka \'' + value.name + '\' jest wi?ksza ni? kontener lub jeden z jej wymiar?w wynosi 0'); //wykazanie paczki przekraczajacej wymiary
		   that.oversizedList.push(value); // zapisanie przewymiarowanych
		 }
		 else
		 {
            return value;
		 }
  },
  
  getOversized: function(value)
  {
 
  //helper dla delOversized, wskazuje paczki za du?e na kontener
    
    if((value.w > kontener.width || value.w > kontener.height) && (value.h > kontener.width || value.h > kontener.height))
    {
      return true;
    }
    else
    {
      return false;
    }
  },
  getUndersized: function(obj_pack)
  {
   //helper dla paczek, gdzie kt?rykolwiek wymiar wynosi "0"
    if(obj_pack.w === 0 || obj_pack.h === 0)
      {
        return true;
      }
  },
  oversizedList: [],//przewymiarowane
  
}
// sortowanie
var sorting = {
  saveRotated: function(arr)
                  {
                    //obr?t paczki kr?tszy bok staje si? d?ugo?ci? width
                    var r_width, r_height;// pomocnicze zmienne, zapami?tanie szeroko?ci i wysokosci
                    arr = arr.map(this.rotate)

              },
  rotate: function (value){
                   //podmiana h i w 
                   r_width = value.w;
                   r_height = value.h;
                    if(r_width > r_height)
                    {
                      //obr?t paczki
                       value.w = r_height;
                       value.h = r_width;
                    }
  },
  sortDescending: function (arr)
                  {
                    //sortowanie kr?tszym bokiem malej?co 
                    //gdy r?wne wtedy d?u?szym bokiem malej?co
                    arr.sort(function (a, b) 
                    {
                      if(a.w == b.w)
                      {
                        return b.h - a.h;  
                      }
                      else
                      {
                        return b.w - a.w;
                      }
                    });
                },
}
var scoring = {
  score1: Number.MAX_SAFE_INTEGER,
  score2: Number.MAX_SAFE_INTEGER,
  



}


var kontener = new Tank(1360,245);
// paczki = new Boxes();
var paczki =  [
  {
    name: 'a',
    w: 245,
    h: 75,


    x: 0,
    y: 0
  },
  {
    name: 'b',
    w: 280,
    h: 70,


    x: 0,
    y: 0
  },
  {
    name: 'c',
    w: 160,
    h: 80,

    x: 0,
    y: 0
  },
 {
    name: 'd',
    w: 85,
    h: 110,

    x: 0,
    y: 0
  },
 {
    name: 'e',
    w: 94,
    h: 135,

    x: 0,
    y: 0
  },
 {
    name: 'f',
    w: 125,
    h: 65,

    x: 0,
    y: 0
  },
 {
    name: 'g',
    w: 125,
    h: 65,

    x: 0,
    y: 0
  },
 {
    name: 'h',
    w: 125,
    h: 65,

    x: 0,
    y: 0
  },
 {
    name: 'i',
    w: 300,
    h: 60,

    x: 0,
    y: 0
  },
 {
    name: 'j',
    w: 125,
    h: 160,


    x: 0,
    y: 0
  },
 {
    name: 'k',
    w: 125,
    h: 65,
    x: 0,
    y: 0
  },

];


sorting.saveRotated(paczki);
sorting.sortDescending(paczki);

oversized.delOversized(paczki,kontener);
console.log(paczki);
console.log( oversized.oversizedList);




         var score1;
         var score2;



	for (var i=0;  i<insertMethods.length;  i++)
		{

			//czyscimy usedBoxes gdy nie puste
			if (usedBoxes.length>0){usedBoxes.length = 0;}
			//inicjacja pustej przestrzeni
			if (freeBoxes.length>0)
			{
				freeBoxes.length = 0; 
				freeBoxes.push(kontener);
			}
			else
			{
              freeBoxes.push(kontener);
            }
			tmpBoxes = new Boxes(paczki);
            //console.log(freeBoxes);
			insert(tmpBoxes.Boxes,insertMethods[i]);
			cargo[i] = {insertMethod:insertMethods[i],usedBoxes: usedBoxes.slice(0), freeBoxes: freeBoxes.slice(0), container: kontener};
			console.log('CARGO - ' + i);
			console.log(cargo[i].freeBoxes);
			
		}



function insert(boxes, method)
{
  


	while(boxes.length > 0)
	{
   
      var bestScore1 = scoring.score1;
		var bestScore2 = scoring.score2;
		var bestBoxIndex = -1;

      var bestNode;

		for (var i=0,  tot=boxes.length; i < tot; i++)
		{
      
          //////
       //   var score1;
       //   var score2;
			var newNode = ScoreBox(boxes[i].w, boxes[i].h, method,boxes[i].name);

			if (score1 < bestScore1 || (score1 == bestScore1 && score2 < bestScore2))
			{
			
				bestScore1 = score1;
				bestScore2 = score2;
				bestNode = newNode;
				bestBoxIndex = i;
			}
		}

		if (bestBoxIndex == -1){
		return;
        }

	  	
      PlaceBox(bestNode);
	  boxes.splice(bestBoxIndex,1);

	}
}
function ScoreBox(width,height, method,name) 
{
	var newNode;
	score1 = scoring.score1;
	score2 = scoring.score2;
	switch(method)
	{
      case "RectBestShortSideFit": 
        newNode = FindPositionForNewNodeBestShortSideFit(width, height, name); 
        break;
      case "RectBottomLeftRule":
        newNode = FindPositionForNewNodeBottomLeft(width, height, name); 
        break;
      case "RectContactPointRule": 
        newNode = FindPositionForNewNodeContactPoint(width, height, name); 
		score1 = -score1; // Reverse since we are minimizing, but for contact point score bigger is better.
		break;
      case "RectBestLongSideFit":
        newNode = FindPositionForNewNodeBestLongSideFit(width, height, name); 
        break;
      case "RectBestAreaFit":
        newNode = FindPositionForNewNodeBestAreaFit(width, height, name); 
        break;
	}

	// Cannot fit the current rectangle.
	if (newNode.h == 0)
	{
		score1 = scoring.score1;
		score2 = scoring.score2;
	}

	return newNode;
}

function  CommonIntervalLength(i1start,i1end,i2start,i2end)
{
	if (i1end < i2start || i2end < i1start)
	{	
		return 0;
	}
	return Math.min(i1end, i2end) - Math.max(i1start, i2start);
}

function ContactPointScoreNode(x,y,width,height)
{
	var score = 0;

	if (x == 0 || x + width == kontener.width)
		score += height;
	if (y == 0 || y + height == kontener.height)
		score += width;

	for(var i=0,  tot=usedBoxes.length; i < tot; i++)
	{
		if (usedBoxes[i].x == x + width || usedBoxes[i].x + usedBoxes[i].width == x)
			score += CommonIntervalLength(usedBoxes[i].y, usedBoxes[i].y + usedBoxes[i].height, y, y + height);
		if (usedBoxes[i].y == y + height || usedBoxes[i].y + usedBoxes[i].height == y)
			score += CommonIntervalLength(usedBoxes[i].x, usedBoxes[i].x + usedBoxes[i].width, x, x + width);
	}
	return score;
}
function FindPositionForNewNodeContactPoint(width,height,name)
{
	var bestNode ={};
	

	bestContactScore = -1;

	for (var i=0,  tot=freeBoxes.length; i < tot; i++)
	{
		// Try to place the rectangle in upright (non-flipped) orientation.
		if (freeBoxes[i].width >= width && freeBoxes[i].height >= height)
		{
			var score = ContactPointScoreNode(freeBoxes[i].x, freeBoxes[i].y, width, height);
			if (score > bestContactScore)
			{
				bestNode.x = freeBoxes[i].x;
				bestNode.y = freeBoxes[i].y;
				bestNode.width = width;
				bestNode.height = height;
				bestNode.name = name;
				bestContactScore = score;
			}
		}
		if (freeBoxes[i].width >= height && freeBoxes[i].height >= width)
		{
			var score = ContactPointScoreNode(freeBoxes[i].x, freeBoxes[i].y, height, width);
			if (score > bestContactScore)
			{
				bestNode.x = freeBoxes[i].x;
				bestNode.y = freeBoxes[i].y;
				bestNode.width = height;
				bestNode.height = width;
				bestNode.name = name;
				bestContactScore = score;
			}
		}
	}
	score = bestContactScore;
	return bestNode;
}

function FindPositionForNewNodeBottomLeft(width,height,name)
{
	var bestNode ={};
	

	bestY = scoring.score1;
	bestX = scoring.score2;

	for (var i=0,  tot=freeBoxes.length; i < tot; i++)
	{
		// Try to place the rectangle in upright (non-flipped) orientation.
		if (freeBoxes[i].width >= width && freeBoxes[i].height >= height)
		{
			var topSideY = freeBoxes[i].y + height;
			if (topSideY < bestY || (topSideY == bestY && freeBoxes[i].x < bestX))
			{
				bestNode.x = freeBoxes[i].x;
				bestNode.y = freeBoxes[i].y;
				bestNode.width = width;
				bestNode.height = height;
				bestNode.name = name;
				bestY = topSideY;
				bestX = freeBoxes[i].x;
			}
		}
		if (freeBoxes[i].width >= height && freeBoxes[i].height >= width)
		{
			var topSideY = freeBoxes[i].y + width;
			if (topSideY < bestY || (topSideY == bestY && freeBoxes[i].x < bestX))
			{
				bestNode.x = freeBoxes[i].x;
				bestNode.y = freeBoxes[i].y;
				bestNode.width = height;
				bestNode.height = width;
				bestNode.name = name;
				bestY = topSideY;
				bestX = freeBoxes[i].x;
			}
		}
	}
	  score1 = bestX;
	score2 = bestY;
	return bestNode;
}


function FindPositionForNewNodeBestAreaFit(width,height,name) 
{
	var bestNode ={};
	

	bestAreaFit = scoring.score1;
	bestShortSideFit = scoring.score2;

	for (var i=0,  tot=freeBoxes.length; i < tot; i++)
	{
		var areaFit = freeBoxes[i].width * freeBoxes[i].height - width * height;
		

		// Try to place the rectangle in upright (non-flipped) orientation.
		if (freeBoxes[i].width >= width && freeBoxes[i].height >= height)
		{
			var leftoverHoriz = Math.abs(freeBoxes[i].width - width);
			var leftoverVert = Math.abs(freeBoxes[i].height - height);
			var shortSideFit = Math.min(leftoverHoriz, leftoverVert);

			if (areaFit < bestAreaFit || (areaFit == bestAreaFit && shortSideFit < bestShortSideFit))
			{
				bestNode.x = freeBoxes[i].x;
				bestNode.y = freeBoxes[i].y;
				bestNode.width = width;
				bestNode.height = height;
				bestNode.name = name;
				bestShortSideFit = shortSideFit;
				bestAreaFit = areaFit;
			}
		}

		if (freeBoxes[i].width >= height && freeBoxes[i].height >= width)
		{
			var flippedLeftoverHoriz = Math.abs(freeBoxes[i].width - height);
			var flippedLeftoverVert = Math.abs(freeBoxes[i].height - width);
			var flippedShortSideFit = Math.min(flippedLeftoverHoriz, flippedLeftoverVert);
			

			if (areaFit < bestAreaFit || (areaFit == bestAreaFit && flippedShortSideFit < bestShortSideFit))
			{
				bestNode.x = freeBoxes[i].x;
				bestNode.y = freeBoxes[i].y;
				bestNode.width = height;
				bestNode.height = width;
				bestNode.name = name;
				bestShortSideFit = flippedShortSideFit;
				bestAreaFit = areaFit;
			}
		}
	}
  score1 = bestShortSideFit;
	score2 = bestAreaFit;
	return bestNode;
}

function FindPositionForNewNodeBestLongSideFit(width,height,name) 
{
	var bestNode ={};
	
	var bestShortSideFit = scoring.score1;
	var bestLongSideFit = scoring.score2;
    for (var i=0,  tot=freeBoxes.length; i < tot; i++)
	{

      
      // Try to place the rectangle in upright (non-flipped) orientation.
		if (freeBoxes[i].width >= width && freeBoxes[i].height >= height)
		{
			var leftoverHoriz = Math.abs(freeBoxes[i].width - width);
			var leftoverVert = Math.abs(freeBoxes[i].height - height);
			var shortSideFit = Math.min(leftoverHoriz, leftoverVert);
			var longSideFit = Math.max(leftoverHoriz, leftoverVert);

			if (longSideFit < bestLongSideFit || (longSideFit == bestLongSideFit && shortSideFit < bestShortSideFit))
			{
				bestNode.x = freeBoxes[i].x;
				bestNode.y = freeBoxes[i].y;
				bestNode.width = width;
				bestNode.height = height;
                bestNode.name = name;
				bestShortSideFit = shortSideFit;
				bestLongSideFit = longSideFit;
			}
		}

		if (freeBoxes[i].width >= height && freeBoxes[i].height >= width)
		{
			var flippedLeftoverHoriz = Math.abs(freeBoxes[i].width - height);
			var flippedLeftoverVert = Math.abs(freeBoxes[i].height - width);
			var flippedShortSideFit = Math.min(flippedLeftoverHoriz, flippedLeftoverVert);
			var flippedLongSideFit = Math.max(flippedLeftoverHoriz, flippedLeftoverVert);

			if (flippedLongSideFit < bestLongSideFit || (flippedLongSideFit == bestLongSideFit && flippedShortSideFit < bestShortSideFit))
			{
				bestNode.x = freeBoxes[i].x;
				bestNode.y = freeBoxes[i].y;
				bestNode.width = height;
				bestNode.height = width;
                bestNode.name = name;
				bestShortSideFit = flippedShortSideFit;
				bestLongSideFit = flippedLongSideFit;
			}
		}
	}
  score1 = bestShortSideFit;
  score2 = bestLongSideFit;
	return bestNode;
}
function FindPositionForNewNodeBestShortSideFit(width,height,name) 
{
	var bestNode ={};
	
	var bestShortSideFit = scoring.score1;
	var bestLongSideFit = scoring.score2;
    for (var i=0,  tot=freeBoxes.length; i < tot; i++)
	{

      
      // Try to place the rectangle in upright (non-flipped) orientation.
		if (freeBoxes[i].width >= width && freeBoxes[i].height >= height)
		{
			var leftoverHoriz = Math.abs(freeBoxes[i].width - width);
			var leftoverVert = Math.abs(freeBoxes[i].height - height);
			var shortSideFit = Math.min(leftoverHoriz, leftoverVert);
			var longSideFit = Math.max(leftoverHoriz, leftoverVert);

			if (shortSideFit < bestShortSideFit || (shortSideFit == bestShortSideFit && longSideFit < bestLongSideFit))
			{
				bestNode.x = freeBoxes[i].x;
				bestNode.y = freeBoxes[i].y;
				bestNode.width = width;
				bestNode.height = height;
                bestNode.name = name;
				bestShortSideFit = shortSideFit;
				bestLongSideFit = longSideFit;
			}
		}

		if (freeBoxes[i].width >= height && freeBoxes[i].height >= width)
		{
			var flippedLeftoverHoriz = Math.abs(freeBoxes[i].width - height);
			var flippedLeftoverVert = Math.abs(freeBoxes[i].height - width);
			var flippedShortSideFit = Math.min(flippedLeftoverHoriz, flippedLeftoverVert);
			var flippedLongSideFit = Math.max(flippedLeftoverHoriz, flippedLeftoverVert);

			if (flippedShortSideFit < bestShortSideFit || (flippedShortSideFit == bestShortSideFit && flippedLongSideFit < bestLongSideFit))
			{
				bestNode.x = freeBoxes[i].x;
				bestNode.y = freeBoxes[i].y;
				bestNode.width = height;
				bestNode.height = width;
                bestNode.name = name;
				bestShortSideFit = flippedShortSideFit;
				bestLongSideFit = flippedLongSideFit;
			}
		}
	}
  score1 = bestShortSideFit;
  score2 = bestLongSideFit;
	return bestNode;
}

function PlaceBox(box)
{
	   tot=freeBoxes.length;

	for (var i=0; i < tot; i++)
	{
	
   
     
		if (SplitFreeNode(freeBoxes[i], box))
		{
          freeBoxes.splice(i, 1);
          i--;
          tot--;

		}
	}

	PruneFreeList();

	usedBoxes.push(box);
 
	//		dst.push_back(bestNode); ///\todo Refactor so that this compiles.
}
function PruneFreeList()
{
	

	/// Go through each pair and remove any rectangle that is redundant.
	for (var i=0,  tot=freeBoxes.length; i < tot; i++)
   {   
		for(var j= i + 1; j < freeBoxes.length; j++)
		{
			
          
      if (IsContainedIn(freeBoxes[i], freeBoxes[j]))
			{
				freeBoxes.splice(i,1);
				i--;
				break;
			}
			if (IsContainedIn(freeBoxes[j], freeBoxes[i]))
			{
				freeBoxes.splice(j,1);
				j--;
			}
		}
}
}
function IsContainedIn(a, b)
{
	return a.x >= b.x && a.y >= b.y 
		&& a.x+a.width <= b.x+b.width 
		&& a.y+a.height <= b.y+b.height;
}
function SplitFreeNode(freeNode,usedNode)
{
    

	// Test with SAT if the rectangles even intersect.
	if (usedNode.x >= freeNode.x + freeNode.width || usedNode.x + usedNode.width <= freeNode.x ||
		usedNode.y >= freeNode.y + freeNode.height || usedNode.y + usedNode.height <= freeNode.y)
		{ 
      	return false;
       }

	if (usedNode.x < freeNode.x + freeNode.width && usedNode.x + usedNode.width > freeNode.x)
	{
	
      // New node at the top side of the used node.
		if (usedNode.y > freeNode.y && usedNode.y < freeNode.y + freeNode.height)
		{
		
      newNode = Object.assign({},freeNode);
			newNode.height = usedNode.y - newNode.y;
			freeBoxes.push(newNode);
		}

		// New node at the bottom side of the used node.
		if (usedNode.y + usedNode.height < freeNode.y + freeNode.height)
		{
			
      newNode =  Object.assign({},freeNode);
			newNode.y = usedNode.y + usedNode.height;
			newNode.height = freeNode.y + freeNode.height - (usedNode.y + usedNode.height);
			freeBoxes.push(newNode);
		}
	}

	if (usedNode.y < freeNode.y + freeNode.height && usedNode.y + usedNode.height > freeNode.y)
	{

      // New node at the left side of the used node.
		if (usedNode.x > freeNode.x && usedNode.x < freeNode.x + freeNode.width)
		{
			newNode =  Object.assign({},freeNode);
			newNode.width = usedNode.x - newNode.x;
			freeBoxes.push(newNode);
		}

		// New node at the right side of the used node.
		if (usedNode.x + usedNode.width < freeNode.x + freeNode.width)
		{
			newNode =  Object.assign({},freeNode);
			newNode.x = usedNode.x + usedNode.width;
			newNode.width = freeNode.x + freeNode.width - (usedNode.x + usedNode.width);
			freeBoxes.push(newNode);
		}
	}
  
  //freeBoxes.push(newNode);
  //freeBoxes.push(newNode2);
 
	return true;
}