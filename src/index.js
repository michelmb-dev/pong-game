let board = document.querySelector(".board");
let initial_ball = document.querySelector(".ball");
let ball = document.querySelector(".ball");
let score = document.querySelector(".score");
let message = document.querySelector(".message");
let initial_ball_coords = ball.getBoundingClientRect();
let ball_coords = initial_ball_coords;
let board_coords = board.getBoundingClientRect();
let paddle = document.querySelector(".paddle");
let paddle_coords = paddle.getBoundingClientRect();
let state_game = "start";

let dx = Math.floor(Math.random() * 4) + 3;
let dy = Math.floor(Math.random() * 4) + 3;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);

document.addEventListener("keydown", (e) => {
	if (state_game === "start") {
		if (e.key === "Enter") {
			state_game = state_game === "start" ? "play" : "start";
			if (state_game === "play") {
				message.innerHTML = "Game Started";
				requestAnimationFrame(() => {
					dx = Math.floor(Math.random() * 4) + 3;
					dy = Math.floor(Math.random() * 4) + 3;
					dxd = Math.floor(Math.random() * 2);
					dyd = Math.floor(Math.random() * 2);
					moveBall(dx, dy, dxd, dyd);
				});
			}
		}
	}
	if (e.key == "q" || e.key == "Q" || e.key == "ArrowLeft") {
		paddle.style.left = Math.max(board_coords.left, paddle_coords.left - window.innerWidth * 0.01) + "px";
		paddle_coords = paddle.getBoundingClientRect();
	}
	if (e.key == "d" || e.key == "D" || e.key == "ArrowRight") {
		paddle.style.left = Math.min(board_coords.right - paddle_coords.width, paddle_coords.left + window.innerWidth * 0.01) + "px";
		paddle_coords = paddle.getBoundingClientRect();
	}
});

function moveBall(dx, dy, dxd, dyd) {
	if (ball_coords.left <= board_coords.left) {
		dxd = 1;
	}
	if (ball_coords.right >= board_coords.right) {
		dxd = 0;
	}
	if (ball_coords.top <= board_coords.top) {
		dyd = 1;
	}
	if (ball_coords.bottom >= paddle_coords.top && ball_coords.right >= paddle_coords.left && ball_coords.left <= paddle_coords.right) {
		dyd = 0;
		dx = Math.floor(Math.random() * 4) + 3;
		dy = Math.floor(Math.random() * 4) + 3;
	}

	if (ball_coords.bottom >= board_coords.bottom) {
		state_game = "start";
		ball_coords = initial_ball_coords;
		ball.style = initial_ball.style;
		message.innerHTML = "Game Over, Press Enter to Restart Pong!";
		return;
	}

	ball.style.top = ball_coords.top + dy * (dyd == 0 ? -1 : 1) + "px";
	ball.style.left = ball_coords.left + dx * (dxd == 0 ? -1 : 1) + "px";
	ball_coords = ball.getBoundingClientRect();
	requestAnimationFrame(() => {
		moveBall(dx, dy, dxd, dyd);
	});
}
