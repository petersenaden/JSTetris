

function drawRect() {
var c=document.getElementById("tetrisBoard");
var ctx=c.getContext("2d");
ctx.rect(0,0,150,150);
ctx.stroke();
}
drawRect()