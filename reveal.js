// Reveal the images on a slide one by one.
"use strict";

// The animation object, with the methods required by Wrap.
// The 'reveal' prefix on functions prevents name clashes with other scripts.
var reveal = {
    init: revealInit, start: revealStart, stop: revealStop, end: revealEnd,
    key: revealKey
};

// Gather an array of the items to be revealed.
function revealInit(slide) {
    this.items = [];
    for (var i=0; i<slide.children.length; i++) {
        var node = slide.children[i];
        var tag = node.tagName.toLowerCase();
        if (tag == "p") this.items.push(node);
    }
}

// Show the items given by the index.
function revealShow(items, index) {
    for (var i=0; i<items.length; i++) {
        var item = items[i];
        if (i <= index) item.style.display = "block";
        else item.style.display = "none";
    }
}

// Start the animation by making the items invisible.
function revealStart() {
    this.index = 0;
    revealShow(this.items, this.index);
}

// Stop the animation. (There is nothing to do).
function revealStop() {
}

// Go to the end of the animation by making the last item visible.
function revealEnd() {
    this.index = this.items.length - 1;
    revealShow(this.items, this.index);
}

// Respond to the same key presses as Wrap uses for navigation.
function revealKey(key, shift, ctrl) {
    if (key == 'PageDown' || key == 'ArrowRight' || key == 'ArrowDown') {
        if (this.index >= this.items.length - 1) return false;
        this.index++;
        revealShow(this.items, this.index);
        return true;
    }
    if (key == 'PageUp' || key == 'ArrowLeft' || key == 'ArrowUp') {
        if (this.index == 0) return false;
        this.index--;
        revealShow(this.items, this.index);
        return true;
    }
    return false;
}
