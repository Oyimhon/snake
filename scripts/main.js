const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const snakeColor = 'green';
const foodColor = 'red';

let snake = [{ x: 5, y: 5 }];
let food = getRandomFoodPosition();
let direction = 'right';
let isGameOver = false;
let score = 0;

function getRandomFoodPosition() {
  const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
  const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
  return { x, y };
}

function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = snakeColor;
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function eatTail(head, arr) {
  for (let i = 1; i < arr.length; i++) {
    if (head.x === arr[i].x && head.y === arr[i].y) {
      isGameOver = true;
      alert('Игра окончена! Счет: ' + score);
    }
  }
}

function updateGame() {
  if (isGameOver) {
    return;
  }

  const newHead = { ...snake[0] };
  switch (direction) {
    case 'up':
      newHead.y -= gridSize;
      break;
    case 'down':
      newHead.y += gridSize;
      break;
    case 'left':
      newHead.x -= gridSize;
      break;
    case 'right':
      newHead.x += gridSize;
      break;
  }

  if (newHead.x >= canvas.width) {
    newHead.x = 0;
  } else if (newHead.x < 0) {
    newHead.x = canvas.width - gridSize;
  }
  if (newHead.y >= canvas.height) {
    newHead.y = 0;
  } else if (newHead.y < 0) {
    newHead.y = canvas.height - gridSize;
  }

  snake.unshift(newHead);

  eatTail(newHead, snake);

  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    food = getRandomFoodPosition();
  } else {
    snake.pop();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();

  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 30);

  setTimeout(updateGame, 200);
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 'ArrowDown':
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
    case 'ArrowLeft':
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 'ArrowRight':
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
  }
});

updateGame();
