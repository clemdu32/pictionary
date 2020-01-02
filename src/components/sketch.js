export default function sketch (p, socket, isCreator) {
    let width = document.getElementById("sketch").offsetWidth;
    let height = window.innerHeight/2;

    p.setup = function () {
        p.createCanvas(width, height);
        p.background(102);
    };

    p.adaptedSize = function (props) {
        if (props.Width && props.Height){
            width = props.Width;
            height = props.Height;
        }
    };

    p.draw = function () {
        p.stroke(255);
        if(isCreator){
            if (p.mouseIsPressed === true) {
                p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
                socket.emit('drawing', {x: p.mouseX, y:p.mouseY, px:p.pmouseX, py: p.pmouseY});
            }
        }
        socket.on('update', function(coord){
            p.line(coord.x, coord.y, coord.px, coord.py);
        })
    };
};