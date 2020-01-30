export default function sketch (p, socket, isDrawing) {
    let width = document.getElementById("sketchCard").offsetWidth - 45;
    let height = window.innerHeight/2;

    p.setup = function () {
        p.clear();
        p.createCanvas(width, height);
        p.background(51);
    };

    p.adaptedSize = function (props) {
        if (props.Width && props.Height){
            width = props.Width;
            height = props.Height;
        }
    };
    p.draw = function () {
        p.stroke(255);
        if(isDrawing){
            if (p.mouseIsPressed === true) {
                p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
                socket.emit('drawing', {x: p.mouseX, y:p.mouseY, px:p.pmouseX, py: p.pmouseY});
            }
        }
        socket.on('update', function(coord){
            p.line(coord.x, coord.y, coord.px, coord.py);
        });
        socket.on('deleteSketch', function () {
            p.setup();
        })
    };
};