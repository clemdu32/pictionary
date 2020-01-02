import React from "react";
import p5 from "p5";

if(typeof window !== undefined)
    window.p5 = p5;
export default class sketchComponent extends React.Component {
    constructor(props) {
        super(props)
        this.canvasParentRef = React.createRef()
    }

    componentDidMount() {
        this.scketch = new p5(p => {
            p.setup = () => {
                this.props.setup(p, this.canvasParentRef.current);
            };
            const p5Events = [
                "draw",
                "windowResized",
                "preload",
                "mouseClicked",
                "doubleClicked",
                "mouseMoved",
                "mousePressed",
                "mouseWheel",
                "mouseDragged",
                "mouseReleased",
                "keyPressed",
                "keyReleased",
                "keyTyped",
                "touchStarted",
                "touchMoved",
                "touchEnded",
                "deviceMoved",
                "deviceTurned",
                "deviceShaken"
            ];
            p5Events.forEach(event => {
                if (this.props[event]) {
                    p[event] = () => {
                        this.props[event](p);
                    };
                }
            });
        });
    }
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <div ref={this.canvasParentRef} className={this.props.className || ""} style={this.props.style || {}} />;
    }
}