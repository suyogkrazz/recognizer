var cv = require("opencv");

try {
  var camera = new cv.VideoCapture(0);
  var window = new cv.NamedWindow("Video", 0);
  // face detection properties
  var rectColor = [0, 255, 0];
  var rectThickness = 2;

  setInterval(function() {
    camera.read(function(err, im) {
      if (err) throw err;
      console.log(im.size());
      if (im.size()[0] > 0 && im.size()[1] > 0) {
        im.detectObject(cv.FACE_CASCADE, {}, function(err, faces) {
          if (err) throw err;
          for (var i = 0; i < faces.length; i++) {
            face = faces[i];
            im.rectangle(
              [face.x, face.y],
              [face.width, face.height],
              rectColor,
              rectThickness
            );
          }
          window.show(im);
        });
      }
      window.blockingWaitKey(0, 50);
    });
  }, 20);
} catch (e) {
  console.log("Couldn't start camera:", e);
}
