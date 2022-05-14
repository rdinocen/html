function $(el){
    return document.getElementById(el);
}
var isDragging = false;

var tzdragg = function(){
    return {
        move : function(divid,xpos,ypos){
            var a = $(divid);
            $(divid).style.left = xpos + 'px';
            $(divid).style.top = ypos + 'px';
        },
        setDragging : function() {
            isDragging = true;
        },
        resetDragging : function() {
            isDragging = false;
        },
        startMoving : function(evt){
           
            evt = evt || window.event;
            var posX = evt.clientX,
                posY = evt.clientY,
                a = $('elem'),
            divTop = a.style.top,
            divLeft = a.style.left;
            
            divTop = divTop.replace('px','');
            divLeft = divLeft.replace('px','');
            var diffX = posX - divLeft,
                diffY = posY - divTop;
            document.onmousemove = function(evt){
                evt = evt || window.event;
                var posX = evt.clientX,
                    posY = evt.clientY,
                    aX = posX - diffX,
                    aY = posY - diffY;
           var boun=document.getElementById("parent").offsetWidth-document.getElementById("elem").offsetWidth;
               
                if((aX>0)&&(aX<boun)&&(aY>0)&&(aY<boun))
                tzdragg.move('elem',aX,aY);
            }
        },
        stopMoving : function(){
            var a = document.createElement('script');
            document.onmousemove = function(){}
            
            if(!isDragging) {
                console.log('clicked');
            }
        },
    }
}();