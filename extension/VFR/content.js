// create variables for the change-able clothing and face
let shirt = document.querySelector('.shirt');
let trousers = document.querySelector('.trousers');
let face = document.querySelector('.face');
let shoes = document.querySelector('.shoe');
let clicked;

let moveBy = 8;


// these functions give the clothing/face variables a position when the page loads
window.addEventListener('load', () =>{
    shirt.style.position = 'absolute';
    shirt.style.top = 145 +"px";
    shirt.style.left = 70 +"px";
    shirt.style.height = 260 + 'px';
});

window.addEventListener('load', () =>{
    trousers.style.position = 'absolute';
    trousers.style.top = 350 +"px";
    trousers.style.left = 100 +"px";
    trousers.style.width = 125 + "px";
});

window.addEventListener('load', () =>{
    face.style.position = 'absolute';
    face.style.left = 120 + "px";
    face.style.top = 65 + "px";
});


window.addEventListener('load', () =>{
    shoes.style.position = 'absolute';
    shoes.style.left = 115 + "px";
    shoes.style.top = 655 + "px";
    shoes.style.width = 100 + "px";
});

// listens for key presses and moves the selected clothing item
window.addEventListener('keyup', (e) =>{
    switch (e.key) {
        case 'ArrowLeft':
            clicked.style.left = parseInt(clicked.style.left) - moveBy + 'px';
            break;
        case 'ArrowRight':
            clicked.style.left = parseInt(clicked.style.left) + moveBy + 'px';
            break;
        case 'ArrowUp':
            clicked.style.top = parseInt(clicked.style.top) - moveBy + 'px';
            break;
        case 'ArrowDown':
            clicked.style.top = parseInt(clicked.style.top) + moveBy + 'px';
            break;
        
    }
})

// when an clothing image is clicked adds a <p> with the image class
function onClickedImage(itemId) {
    clicked = document.querySelector('.'+itemId);
    var p = document.createElement('p');
    var text = document.createTextNode(" "+itemId);
    p.appendChild(text);
    p.style.fontFamily = 'Karla, sans serif';
    p.style.fontWeight = 'bold';
    var div = document.querySelector(".banner");
    //TODO: should really replace the current <p> with the new <p> so it doesnt endelessy append new <p>
    div.appendChild(p);
    
}

// should change the color of the body image
function changeColor(buttonValue) {
    //TODO
}


var shirt1 = document.getElementById("shirt1");
shirt1.addEventListener('click', () =>{
    addShirt(1);
});

var shirt2 = document.getElementById("shirt2");
shirt2.addEventListener('click', () =>{
    addShirt(2);
});

var shirt3 = document.getElementById("shirt3");
shirt3.addEventListener('click', () =>{
    addShirt(3);
});

var shirt4 = document.getElementById("shirt4");
shirt4.addEventListener('click', () =>{
    addShirt(4);
});

// changes the shirt image on the model
function addShirt(itemId) {
    shirt.src = 'images/shirt' + itemId + '.png';
}


var jeans1 = document.getElementById("jeans1");
jeans1.addEventListener('click', () =>{
    addTrouser(1);
});

var jeans2 = document.getElementById("jeans2");
jeans2.addEventListener('click', () =>{
    addTrouser(2);
});

var jeans3 = document.getElementById("jeans3");
jeans3.addEventListener('click', () =>{
    addTrouser(3);
});

// changes the trouser image on th model
function addTrouser(itemId) {
    trousers.src = 'images/jeans' + itemId + '.png';
}


var shoes1 = document.getElementById("shoes1");
shoes1.addEventListener('click', () =>{
    addShoe(1);
});

var shoes2 = document.getElementById("shoes2");
shoes2.addEventListener('click', () =>{
    addShoe(2);
});

var shoes3 = document.getElementById("shoes3");
shoes3.addEventListener('click', () =>{
    addShoe(3);
});

var shoes4 = document.getElementById("shoes4");
shoes4.addEventListener('click', () =>{
    addShoe(4);
});

// changes the shoe image on the model
function addShoe(itemId) {
    shoes.src = 'images/shoes' + itemId + '.png';
    
}

function scaleUp() {
    var currHeight = clicked.clientHeight;
    clicked.style.height = (currHeight + 5)+ "px";
}
function scaleDown() {
    var currHeight = clicked.clientHeight;
    clicked.style.height = (currHeight - 5)+ "px";
}
function widthUp() {
    var currWidth = clicked.clientWidth;
    clicked.style.width = (currWidth + 5)+ "px";
}
function widthDown() {x  
    var currWidth = clicked.clientWidth;
    var currLeft = clicked.style.left;
    console.log(currLeft);
    clicked.style.width = (currWidth - 5)+ "px";
    clicked.style.left = (currLeft + 25) + 'px';
}