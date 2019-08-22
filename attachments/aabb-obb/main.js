const canvasEl = document.querySelector('canvas');
const ctx = canvasEl.getContext('2d');
const car = new Image();
const canvasSize = {
  width: canvasEl.offsetWidth,
  height: canvasEl.offsetHeight
};
const carSize = {
  width: 43,
  height: 119
};
const axesMargin = 10;
const aabb = {};
const obb = {};
let carAngle = 0;
let mouse = {x: 0, y: 0};
let isGrabbing = false;


function draw() {
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

  makeAABB();
  makeOBB();

  drawCar();
  drawOBB();
  drawAABB();
  drawAxes();
  drawLegend();

  requestAnimationFrame(draw);
}

function drawCar() {
  ctx.save();
  ctx.translate(canvasSize.width / 2, canvasSize.height / 2);
  ctx.rotate(carAngle);
  ctx.drawImage(car, -carSize.width/2, -carSize.height/2, carSize.width, carSize.height);
  ctx.restore();
}

function drawAABB() {
  ctx.save();
  ctx.translate(canvasSize.width / 2, canvasSize.height / 2);
  ctx.strokeStyle = '#090';
  ctx.strokeRect(aabb.x, aabb.y, aabb.width, aabb.height);
  ctx.restore();
}

function drawOBB() {
  ctx.save();
  ctx.translate(canvasSize.width / 2, canvasSize.height / 2);
  ctx.rotate(carAngle);
  ctx.strokeStyle = '#00a';
  ctx.strokeRect(obb.x, obb.y, obb.width, obb.height);
  ctx.restore();
}

function drawLegend() {
  const legendMargin = 10;
  const legendSize = 8;
  const legendPosition = {
    x: canvasSize.width - legendMargin - legendSize * 5,
    y: canvasSize.height - axesMargin - legendMargin
  };
  ctx.strokeStyle = '#090';
  ctx.strokeRect(legendPosition.x, legendPosition.y, legendSize/2, legendSize/2);
  ctx.strokeStyle = '#00a';
  ctx.strokeRect(legendPosition.x, legendPosition.y - legendSize, legendSize/2, legendSize/2);

  ctx.strokeStyle = '#000';
  ctx.fillText('AABB', legendPosition.x + legendSize, legendPosition.y + legendSize/2);
  ctx.fillText('OBB', legendPosition.x + legendSize, legendPosition.y - legendSize/2);
}

function drawAxes() {
  const arrowLength = 5;

  // x axis line
  ctx.strokeStyle = '#666';
  ctx.fillStyle = '#666';
  ctx.beginPath();
  ctx.moveTo(0 + axesMargin, canvasSize.height - axesMargin);
  ctx.lineTo(canvasSize.width - axesMargin, canvasSize.height - axesMargin);
  ctx.stroke();

  // x axis arrow
  ctx.beginPath();
  ctx.moveTo(canvasSize.width - axesMargin, canvasSize.height - axesMargin);
  ctx.lineTo(canvasSize.width - axesMargin - arrowLength, canvasSize.height - axesMargin - arrowLength/2);
  ctx.lineTo(canvasSize.width - axesMargin - arrowLength, canvasSize.height - axesMargin + arrowLength/2);
  ctx.fill();

  // y axis line
  ctx.beginPath();
  ctx.moveTo(0 + axesMargin, canvasSize.height - axesMargin);
  ctx.lineTo(0 + axesMargin, 0 + axesMargin);
  ctx.stroke();

  // y axis arrow
  ctx.beginPath();
  ctx.moveTo(0 + axesMargin, 0 + axesMargin);
  ctx.lineTo(0 + axesMargin - arrowLength/2, 0 + axesMargin + arrowLength);
  ctx.lineTo(0 + axesMargin + arrowLength/2, 0 + axesMargin + arrowLength);
  ctx.fill();
}

function makeOBB() {
  const bbMargin = 4;

  obb.x = -carSize.width / 2 - bbMargin;
  obb.y = -carSize.height / 2 - bbMargin;
  obb.width = carSize.width + 2*bbMargin;
  obb.height = carSize.height + 2*bbMargin;
}

function makeAABB() {
  function multi(m, v) {
    return [
      m[0][0] * v[0] + m[0][1] * v[1],
      m[1][0] * v[0] + m[1][1] * v[1]
    ];
  }

  const bbMargin = 4;

  // finds x,y of each vertex after the rotation
  const rotationMatrix = [
    [Math.cos(carAngle), -Math.sin(carAngle)],
    [Math.sin(carAngle),  Math.cos(carAngle)]
  ];
  const vertices = [
    [-carSize.width/2, -carSize.height/2],
    [ carSize.width/2, -carSize.height/2],
    [ carSize.width/2,  carSize.height/2],
    [-carSize.width/2,  carSize.height/2]
  ];
  const transformedVertices = vertices.map(v => multi(rotationMatrix, v));

  // gets the min and max x of all vertices, and  y
  const minX = Math.min(...transformedVertices.map(v => v[0]));
  const maxX = Math.max(...transformedVertices.map(v => v[0]));
  const minY = Math.min(...transformedVertices.map(v => v[1]));
  const maxY = Math.max(...transformedVertices.map(v => v[1]));

  // builds a rectangle from those points
  aabb.x = minX - bbMargin;
  aabb.y = minY - bbMargin;
  aabb.width = maxX - minX + 2*bbMargin;
  aabb.height = maxY - minY + 2*bbMargin;
}

canvasEl.addEventListener('mousemove', e => {
  if (!isGrabbing) return;
  mouse.x = e.clientX - canvasSize.width/2;
  mouse.y = e.clientY - canvasSize.height/2;
  carAngle = Math.atan2(mouse.y, mouse.x) + Math.PI/2;
});

canvasEl.addEventListener('mousedown', () => setDragging(true));
canvasEl.addEventListener('mouseup', () => setDragging(false));

function setDragging(is) {
  isGrabbing = is;
  canvasEl.classList.toggle('grabbing', is);
}

function initialize() {
  // car.src = 'https://i.imgur.com/wyv05Oh.png';
  car.src = '../../images/gta-corp-of-bombers.png';
  ctx.font = '8px sans-serif';
}

initialize();
makeOBB();
makeAABB();
requestAnimationFrame(draw);
