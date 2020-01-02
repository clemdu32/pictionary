import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';
import from 'p5/p5.min.js';


export default class SketchArea extends React.Component{

    render() {
        function setup() {
            p5.createCanvas(710, 400);
            background(102);
        }

        function draw() {
            stroke(255);
            if (mouseIsPressed === true) {
                line(mouseX, mouseY, pmouseX, pmouseY);
            }
        }
    }
}

