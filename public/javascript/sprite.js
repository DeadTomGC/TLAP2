

function Sprite(imageArray) {
    this.images = imageArray;
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.center = {x: images[0].width/2, y: images[0].height/2};
    this.prototype.drawRotated = function (image, x, y, scale, rotation) {
        ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
        ctx.rotate(rotation);
        ctx.drawImage(image, -center.x, -center.y);
    };
}


