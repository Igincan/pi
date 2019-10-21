var ctx = document.getElementById('ctx').getContext('2d');

var points = {
    inside: 0,
    outside: 0,
    together: 0
}
var pointsDOM = {
    inside: document.getElementById('inside'),
    outside: document.getElementById('outside'),
    together: document.getElementById('together'),
    PI: document.getElementById('PI')
}

changeX = function(x) {
    return x + 250;
}

changeY = function(y) {
    return -y + 250;
}

drawAxis = function() {
    ctx.strokeStyle = '#C0C0C0';
    ctx.beginPath();
    ctx.moveTo(0, 250);
    ctx.lineTo(500, 250);
    ctx.moveTo(250, 0);
    ctx.lineTo(250, 500);
    ctx.stroke();
}

drawPixel = function(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(changeX(x),changeY(y), 1, 1);
}

f1 = function(x) {
    return Math.sqrt(62500-x*x);
}

f2 = function(x) {
    return -Math.sqrt(62500-x*x);
}

addPoint = function() {
    let x = Math.random() * 500 - 250;
    let y = Math.random() * 500 - 250;
    let color;
    if (y < f1(x) && y > f2(x)) {
        color = 'green';
        points.inside++;
    } else {
        color = 'red';
        points.outside++;
    }
    points.together++;
    points.PI = points.together / points.outside;
    drawPixel(x, y, color);
}

updateDOM = function() {
    pointsDOM.inside.innerHTML = points.inside;
    pointsDOM.outside.innerHTML = points.outside;
    pointsDOM.together.innerHTML = points.together;
    pointsDOM.PI.innerHTML = (4 * points.inside) / points.together;
}

drawAxis();

for (let x = -250; x < 250; x += 0.05) {
    let color = 'black';
    drawPixel(x, f1(x), color);
    drawPixel(x, f2(x), color);
}

setInterval(function() {
    for (let i = 0; i < 1000; i++) {
        addPoint();
        updateDOM();
    }
}, 1);

// for (let i = 0; i < 1000; i++) {
//     addPoint();
//     updateDOM();
// }