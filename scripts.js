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
  if (imageIsLoaded(originalImage) == false){
    alert('No image is loaded for filtering.\n\tTry loading a new image.');
    return;
  }
  filteredImage = applyRGBFilter("red");
  filteredImage.drawTo(canvas1);
}
function greenFilter(){
  if (imageIsLoaded(originalImage) == false){
    alert('No image is loaded for filtering.\n\tTry loading a new image.');
    return;
  }
  filteredImage = applyRGBFilter("green");
  filteredImage.drawTo(canvas1);  
}
function blueFilter(){
  if (imageIsLoaded(originalImage) == false){
    alert('No image is loaded for filtering.\n\tTry loading a new image.');
    return;
  }
  filteredImage = applyRGBFilter("blue");
  filteredImage.drawTo(canvas1);  
}
function grayscaleFilter(){
  if (imageIsLoaded(originalImage) == false){
    alert('No image is loaded for filtering.\n\tTry loading a new image.');
    return;
  }
  filteredImage = makeGray();
  filteredImage.drawTo(canvas1);  
}

function applyRGBFilter(color){
  // let grayImage = makeGray();
  let newImage = new SimpleImage(originalImage);
  for (let pixel of newImage.values()){
    let x = pixel.getX();
    let y = pixel.getY();
    switch (color){
      case 'red':
        pixel.setRed(255);
        break;
      case 'blue':
        pixel.setBlue(255);
        break;
      case 'green':
        pixel.setGreen(255);
        break;
      default:
        console.error("Something went wrong with applyRGBImage function. \n\t\'color\' value: " + color)
    }
    newImage.setPixel(x,y,pixel);
  }
  return newImage;
}

function makeGray() {
  let newImage = new SimpleImage(originalImage);
  // for loop over image pixels, get rgb average, set each RGB value to the average value.
  let avg = 0;
  for (let pix of newImage.values()){
    avg = (pix.getRed() + pix.getGreen() + pix.getBlue())/3;
    pix.setRed(avg);
    pix.setGreen(avg);
    pix.setBlue(avg);
  }
  // let canvas1 = document.getElementById("canvas1");
  // grayScale1.drawTo(canvas2);
  return newImage;
}

function imageIsLoaded(anImage){
  if (anImage != null) return true;
  return false;  
}

function resetCanvas(){
  originalImage.drawTo(canvas1);
}