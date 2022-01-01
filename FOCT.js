// FOCT.js v1.0
// Lucian Apetrei is honored that you are using this script.

// let's list the value names of the available blend modes native to modern browsers in a simple array
let blend_modes = ['normal','multiply','screen','overlay','darken','lighten','color-dodge','color-burn','hard-light','soft-light','difference','exclusion','hue','saturation','color','luminosity'];
//let's define the ROYGBIV color palette array
let colors = ['red','orange','yellow','greed','blue','indigo','violet'];

// SELECTORS
// the DOM element that acts as the final overlayed brush drawing image
brush_drawing = document.getElementById('brush_drawing');
// the Title
title = document.getElementById('title');
// Controls and FOCT IT! button
let currentItem = 0;
let controls = document.getElementById('controls_container');
let focter = document.getElementById('focter'); //  The FOCT IT! button
let random = 1;
let effect = 1;

// Functions
let removeShow = function () { title.classList.remove('show') }
let timeouts = function (target_function, val) {
    setTimeout(target_function, val);
}
let intervals = function (target_function, val) {
    setInterval(target_function, val);
}

function one_to_15() {
    currentItem += 1;
    brush_drawing.style.cssText = 'mix-blend-mode: ' + blend_modes[currentItem] + '; transition: opacity 1s; opacity: 1 !important';
    title.textContent = blend_modes[currentItem];
    title.classList.add('show');

    //let hide = function () { brush_drawing.style.cssText = 'mix-blend-mode: ' + blend_modes[currentItem] + '; transition: opacity 1s; opacity: 0 !important'; }
    clearTimeout(timeouts);
    timeouts(removeShow, 1000);


    //timeouts(hide, 1000);
    //clearTimeout(timeouts);
}


let manual = function() {
    if (currentItem <= 15) {
        one_to_15()
    } else {
        currentItem = 0;
        one_to_15()
    }
}

let foctify = function (T, D, C) {
    // Parameters for foctifying:
    // T = transition duration
    // D = delay between current and next transition
    // C = color (one of 7 colors from a simple ROYGBIV color palette)
    // E = effect
    let effect_random = Math.round(Math.random() * 15);
    console.log(effect_random);
    brush_drawing.style.cssText = 'mix-blend-mode: ' + blend_modes[effect_random] + '; opacity: 1 !important';
}

controls.addEventListener("click", function () {
    manual();

}, false);


focter.addEventListener("click", function (ev) {
    //looping through random intervals
    (function loop() {
        let rand = Math.round(Math.random() * 10) + 1;
        console.log(rand);
        setTimeout(function() {
                foctify();
                loop();  
        }, rand);
    }());

    ev.stopPropagation();

    if (!this.classList.contains('running')) {
        this.classList.add('running')
    } else {
        this.classList.remove('running');
        loop.clearInterval();
    }
}, false);

