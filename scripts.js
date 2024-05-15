let originalImage = null;
let filteredImage = null;

function loadImage(){
  let imageFile = document.getElementById("file1");

  let image1 = new SimpleImage(imageFile);
  let canvas1 = document.getElementById("canvas1");
  
  originalImage = image1;
  originalImage.drawTo(canvas1);
  filteredImage = null;
}
function redFilter(){
  filteredImage = applyRGBFilter("red");
  filteredImage.drawTo(canvas1);
}
function blueFilter(){
  
}

function applyRGBFilter(color){
  let newImage = new SimpleImage(originalImage.width, originalImage.height);
  for (let pixel of originalImage.values()){
    let x = pixel.getX();
    let y = pixel.getY();
    switch (color){
      case 'red':
        pixel.setRed(255);
      case 'blue':
        pixel.setGreen(255);
      case 'red':
        pixel.setBlue(255);
    }
    newImage.setPixel(x,y,pixel);
  }
  return newImage;
}

function blurFilter(){
  
}

function doGreenScreen(){
  if (foregroundImage == null) {
    alert("Foreground Image is NOT loaded.\n\tUpload a Foreground Image");
    return;
  }
  // if (backgroundImage == null || backgroundImage != backgroundImage.complete()) {
  if (backgroundImage == null ) {
    alert("Background Image is NOT loaded.\n\tUpload a Background Image");
    return;
  }
  if (!imageSizesAreSame()) {
    alert("The Background Image and Foreground Image are not the same size. \n\t Upload images of the same size."
    + "\n\nBackground Image size: " + backgroundImage.getWidth() + " x " + backgroundImage.getHeight()
    + "\nForeground size: " + foregroundImage.getWidth() + " x " + foregroundImage.getHeight());
    return;
  }
  backgroundImage = createComposite();
  backgroundImage.drawTo(canvas2);
  
}

function createComposite() {
  let compositeImage = new SimpleImage(foregroundImage.getWidth(), foregroundImage.getHeight());
  for (let pixel of foregroundImage.values()){
    let x = pixel.getX();
    let y = pixel.getY();
    if (pixel.getGreen() > pixel.getRed() + pixel.getBlue()){
      let backgroundPixel = backgroundImage.getPixel(x, y);
      compositeImage.setPixel(x,y, backgroundPixel);
    } else {
      compositeImage.setPixel(x,y, foregroundImage.getPixel(x,y));
    }
  }
  return compositeImage;
}
function clearCanvas(){
  let id1 = "canvas1";
  let id2 = "canvas2";
  clearCanvasById(id1);
  clearCanvasById(id2);
  foregroundImage = null;
  backgroundImage = null;
}

function clearCanvasById(canvasId){
  let canvas = document.getElementById(canvasId);
  let context = canvas.getContext("2d");
  context.clearRect(0,0, canvas.clientWidth,canvas.height);
}

function imageSizesAreSame() {
  if (backgroundImage.width != foregroundImage.width || backgroundImage.height != foregroundImage.height) return false;
  return true;
}