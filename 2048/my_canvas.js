function MyCanvas(canvas) {
  console.assert(canvas != null && canvas != undefined);
  let ctx = canvas.getContext("2d");

  this.clearVis = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  this.rect = (R) => {
    ctx.beginPath();
    ctx.moveTo(R.x, R.y);
    ctx.lineTo(R.x, R.y + R.width);
    ctx.lineTo(R.x + R.height, R.y + R.width);
    ctx.lineTo(R.x + R.height, R.y);
    ctx.closePath();

    if (R.fillColor) {
      ctx.fillStyle = R.fillColor;
      ctx.fill();
    }
    ctx.lineWidth = Math.max(0, R.lineWidth);
    ctx.strokeStyle = R.strokeStyle ? R.strokeStyle : "black";
    ctx.stroke();
  }

  this.string = (T) => {
    ctx.font = T.font;
    ctx.fillStyle = T.fillColor;
    ctx.textAlign = T.align ? T.align : "center";
    ctx.textBaseline = T.baseline ? T.baseline : "middle";
    ctx.fillText(T.content, T.x, T.y);
  }
}