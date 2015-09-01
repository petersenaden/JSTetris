

function drawRect(xcoord, ycoord, width, height)
{
	var c=document.getElementById("tetrisBoard");
	var ctx=c.getContext("2d");
	ctx.rect(xcoord, ycoord, width, height);
	ctx.stroke();
}

drawRect(0,0,100,100);