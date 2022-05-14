document.onselectstart = function(e) {
    e.preventDefault();
    return false;
}
  
const slider = document.getElementById('slider');
const container = document.getElementById('container');

document.mouseState = 'up';
slider.mouseState = 'up';
slider.lastMousePosY = null;
slider.lastMousePosX = null;
slider.proposedNewPosY = parseInt(slider.style.top, 10); //converts '10px' to 10
slider.proposedNewPosX = parseInt(slider.style.left, 10);
  
slider.style.top = '40px';
slider.style.left = '40px';
slider.style.height = '60px';
slider.style.width = '60px';
container.style.top = '20px';
container.style.left = '20px';
container.style.height = '200px';
container.style.width = '400px';

document.onmousedown = function() {
    document.mouseState = 'down';
};
  
document.onmouseup = function() {
    document.mouseState = 'up';
    slider.mouseState = 'up';
};

slider.onmousedown = function(e) {
    slider.lastMousePosY = e.pageY; 
    slider.lastMousePosX = e.pageX;
    slider.mouseState = 'down';
    document.mouseState = 'down';
};
  
slider.onmouseup = function(e) {
    slider.mouseState = 'up';
    document.mouseState = 'up';
};

var getAtInt = function getAtInt(obj, attrib) {
    return parseInt(obj.style[attrib], 10);
};
  
document.onmousemove = function(e) { 
    if ((document.mouseState === 'down') && (slider.mouseState === 'down')) {
        slider.proposedNewPosY = getAtInt(slider, 'top') + e.pageY - slider.lastMousePosY;
        slider.proposedNewPosX = getAtInt(slider, 'left') + e.pageX - slider.lastMousePosX;
  
        if (slider.proposedNewPosY < getAtInt(container, 'top')) {
            slider.style.top = container.style.top;
        } else if (slider.proposedNewPosY > getAtInt(container, 'top') + getAtInt(container, 'height') - getAtInt(slider, 'height')) {
            slider.style.top = getAtInt(container, 'top') + getAtInt(container, 'height') - getAtInt(slider, 'height') + 'px';
        } else {
            slider.style.top = slider.proposedNewPosY + 'px';
        }
        
        if (slider.proposedNewPosX < getAtInt(container, 'left')) {
            slider.style.left = container.style.left;
        } else if (slider.proposedNewPosX > getAtInt(container, 'left') + getAtInt(container, 'width') - getAtInt(slider, 'width')) {
            slider.style.left = getAtInt(container, 'left') + getAtInt(container, 'width') - getAtInt(slider, 'width') + 'px';
        } else {
            slider.style.left = slider.proposedNewPosX + 'px';
        }
        
        slider.lastMousePosY = e.pageY;
        slider.lastMousePosX = e.pageX;
    }
};