$(function () {
  var canvas = document.createElement('canvas');
  document.querySelector('#arcode-container').appendChild(canvas)
  canvas.width = 1024;
  canvas.height = 1024;
  canvas.style.width = '256px';
  canvas.style.height = '256px';
  var context = canvas.getContext('2d')
  var hiroImage = new Image;
  hiroImage.onload = function () {
    console.log('hiro image loaded')
    updateARCode()
  }
  hiroImage.src = 'images/hiro.png';

  function updateARCode() {
    console.log('updateARCode');

    var textToQR = window.scannerPath;
    generateArCodeCanvas(canvas, textToQR, function onReady() {
      console.log('ar-code generated for', textToQR)
    })
  }

  /**
   * Generate AR-Code
   */
  function generateArCodeCanvas(canvas, text, onLoad) {
    var context = canvas.getContext('2d')

    context.drawImage(hiroImage, 0, 0, canvas.width, canvas.height);
    generateQrCodeImage(text, function onLoaded(qrCodeImage) {
      console.log('qrcode generated')
      context.drawImage(qrCodeImage, canvas.width * 0.50, canvas.height * 0.30, canvas.width * 0.20, canvas.height * 0.20);

      onLoad && onLoad()
    })
  }
  /**
   * Generate QR-Code
   */
  function generateQrCodeImage(text, onLoaded) {
    var container = document.createElement('div')
    var qrcode = new QRCode(container, {
      text: text,
      width: 256,
      height: 256,
      colorDark: '#000000',
      colorLight: '#ffffff',
      // correctLevel : QRCode.CorrectLevel.H
    });
    var qrCodeImage = container.querySelector('img')
    qrCodeImage.addEventListener('load', function () {
      onLoaded(qrCodeImage)
    })

  }
});