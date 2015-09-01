

function drawSquare(xcoord, ycoord, width, height)
{
	drawBlock(200, 0, 100, 100);
	drawBlock(300, 0, 100, 100);
	drawBlock(200, 100, 100, 100);
	drawBlock(300, 100, 100, 100);
}



function drawBlock(xcoord, ycoord, width, height)
{
	var c=document.getElementById("tetrisBoard");
	var ctx=c.getContext("2d");
	ctx.rect(xcoord, ycoord, width, height);
	ctx.stroke(); //Actually draws what has been defined
}
