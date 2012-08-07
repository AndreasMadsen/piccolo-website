function generateNoise(elem, opacity, size) {
  if (!document.createElement('canvas').getContext) return false;

  opacity = opacity || 0.2;
  size =  size || 45;

  var canvas = document.createElement("canvas"),
      ctx = canvas.getContext('2d');

  // set canvas size
  canvas.width = canvas.height = size;

  var x = size;
  while(x--) {
    var y = size;
    while(y--) {
      var grey = Math.floor( Math.random() * 60 );

      ctx.fillStyle = "rgba(" + grey + "," + grey + "," + grey + "," + opacity + ")";
      ctx.fillRect(x, y, 1, 1);
    }
  }

   elem.style.backgroundImage = "url(" + canvas.toDataURL("image/png") + ")";
}

generateNoise(document.documentElement, 0.05);