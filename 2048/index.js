(function () {
  const N = 4;
  const SIZE = 50;
  const MID = 5;
  const LEFT = 500;
  const TOP = 200;
  const TAR_SCORE = Math.pow(2, 11);
  const TWO_RATE = 0.8;
  let dirs = [
    [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0]
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 1]
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
      [1, 0, 0]
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 1]
    ]
  ];
  let can = new MyCanvas(document.getElementById("myCanvas")),
    game = new Game2048(N),
    lastCode = null,
    colors = ["#AAA", "#82D900", "#2894FF", "#004B97", "#4A4AFF", "#613030", "#EAC100", "#FF9224", "#BB5E00", "#B766AD", "#FF5809", "#7E3D76"],
    dict = {},
    over = false;
  dict[0] = colors[0];
  for (let i = 1; i < colors.length; ++i) dict[Math.pow(2, i)] = colors[i];

  // update game canvas
  function show() {
    let mat = game.toMat();
    const my_font = "15px bold 微软雅黑";
    const box_size = SIZE + MID;
    const txt_center = (box_size >> 1);
    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < N; ++j) {
        if (mat[i][j] == TAR_SCORE) over = true;
        can.rect({
          x: LEFT + j * box_size,
          y: TOP + i * box_size,
          width: SIZE,
          height: SIZE,
          fillColor: dict[mat[i][j]],
          strokeStyle: "#EFEFEF"
        });
        if (mat[i][j] > 0) {
          can.string({
            x: LEFT + txt_center + j * box_size,
            y: TOP + txt_center + i * box_size,
            content: mat[i][j],
            font: my_font,
            fillColor: "#FFF"
          });
        }
      }
    }
  }

  // show current arrow
  function showArrow(i) {
    const size = 10;
    const top = 200;
    const left = 450;
    let dir = dirs[i];
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        can.rect({
          x: left + j * size,
          y: top + i * size,
          width: size,
          height: size,
          fillColor: dir[i][j] ? "#D94600" : "#EFEFEF",
          strokeStyle: "#FFF"
        });
      }
    }
  }

  // game converge
  function gameConverge(code) {
    switch (code) {
      case "KeyW":
      case "ArrowUp":
        game.moveUp();
        showArrow(0);
        break;
      case "ArrowDown":
      case "KeyS":
        game.moveDown();
        showArrow(1);
        break;
      case "ArrowLeft":
      case "KeyA":
        game.moveLeft();
        showArrow(2);
        break;
      case "ArrowRight":
      case "KeyD":
        game.moveRight();
        showArrow(3);
        break;
      default:
        return false;
    }
    return true;
  }

  document.addEventListener("keydown", (event) => {
    if (!over && gameConverge(event.code)) {
      if (lastCode != event.code) game.randBlock(TWO_RATE);
      lastCode = event.code;
      show();
      if (over) {
        setTimeout(() => {
          alert("恭喜你，游戏通关了!");
          window.location.reload();
        }, 100);
      }
    }
  });

  // init game
  for (let i = 0; i < N; ++i) game.randBlock();
  show();
})()