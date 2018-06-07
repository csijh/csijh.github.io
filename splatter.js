// An animation which displays words one by one in random locations.
"use strict";

var splatter = newSplatter();

function newSplatter() {
    var timer, index, words, canvas;
    return { init: init, start: start, stop: stop, end: end, key: key };

    // Create a canvas overlay, assuming 1024x768, and find words.
    function init(slide) {
        canvas = document.createElement("canvas");
        canvas.width = "1024";
        canvas.height = "768";
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.pointerEvents = "none";
        var brush = canvas.getContext("2d");
        brush.font = "52px SourceCode";
        slide.appendChild(canvas);
        var wordNode = slide.querySelector(".splatter");
        var wordString = wordNode.textContent;
        words = wordString.split(/\s+/);
        index = 0;
    }

    function start() {
        timer = setInterval(tick, 500);
    }

    // Go straight to the end of the animation, either to prepare for printing,
    // or else because the user has moved back from the following slide.
    function end() {
        for (var i=0; i<words.length; i++) tick();
    }

    // Stop the animation and clear the canvas.
    function stop() {
        if (timer) clearInterval(timer);
        timer = null;
        var brush = canvas.getContext("2d");
        brush.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Not interested in key presses.
    function key() { return false; }

    // On each tick, display another word.
    function tick() {
        if (index < 0 || index >= words.length) return;
        var item = words[index++];
        var x = 5 + Math.random() * 900;
        var y = 110 + Math.random() * 640;
        var brush = canvas.getContext("2d");
        brush.fillText(item, x, y);
        if (index >= words.length) clearInterval(timer);
    }
}
