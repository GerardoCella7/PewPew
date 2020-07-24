(() => {
  const game = document.getElementById('game');
  const ctx = game.getContext("2d");
  game.width = 800;
  game.height = 600;
  let velocity = 5;
  let ratio = 40;
  let difficulty = 1;
  let projectileToCibleSerie = 0;
  let score = {
    cible: 0,
    projectile: 0,
    point: 0,
    table: []
  };
  let screen = 'init';
  class Mouse {
    x = 0;
    y = 0;
    btnHover = false;
    startGame = false;
    click() {
      if (this.btnHover) {
        this.startGame = true;
      }
    }
  }
  const mouse = new Mouse();


  const tank = new Tank(ctx, ratio);
  let projectile = null;
  let cible = null;
  let refresh = null;
  let timeInit = null;


  const draw = () => {
    ctx.clearRect(0, 0, game.width, game.height);
    if (screen === 'init') {
      init();
    } else if (screen === 'game') {
      update();
      if (cible !== null) cible.draw();
      if (projectile !== null) projectile.draw();
      tank.draw();
      overlay();
    } else if (screen === 'end') {
      end();
    }
  }

  const button = (x, y, msg) => {
    ctx.font = '30px serif';
    const wmsg = ctx.measureText(msg).width;

    if (mouse.x >= x && mouse.x <= x + 300 && mouse.y >= y && mouse.y <= y + 80) {
      ctx.strokeStyle = '#000099';
      ctx.fillStyle = '#009900';
      mouse.btnHover = true;
    } else {
      ctx.strokeStyle = '#009900';
      ctx.fillStyle = '#000099';
      mouse.btnHover = false;
    }

    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.fillRect(x, y, 300, 80);
    ctx.strokeRect(x, y, 300, 80);
    ctx.closePath();

    ctx.fillStyle = '#ffffff';
    ctx.fillText(msg, x + (300 - wmsg) / 2, y + 50);
  }

  const start = () => {
    screen = 'game';
    mouse.startGame = false;
    timeInit = Date.now();
    score.projectile = 0;
    score.cible = 0;
    score.point = 0;
    projectileToCibleSerie = 0;
    tank.x = game.width / 2;
  }

  const init = () => {
    if (mouse.startGame) {
      start();
      return;
    }
    const x = game.width / 2 - 150;
    const y = game.height / 2 - 40;

    button(x, y, "Démarrer une partie");
  }

  const end = () => {
    if (timeInit != null) {
      let result = { time: Date.now() - timeInit, name: 'Anonymous', score: score.point }
      const person = prompt('Entrez votre nom', 'Anonymous');
      if (person !== null) result.name = person;
      score.table.push(result);
      score.table.sort(function (a, b) {
        if (a.score > b.score) return -1;
        if (a.score < b.score) return 1;
        if (a.time > b.time) return 1;
        if (a.time < b.time) return -1;
        return 0;
      });
      timeInit = null;
    }

    if (mouse.startGame) {
      start();
      return;
    }

    let n = 0;
    ctx.font = '30px serif';
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#009900';
    ctx.strokeText('Nom', 100, 50);
    ctx.strokeText('Temps', 400, 50);
    ctx.strokeText('Score', 600, 50);
    ctx.strokeStyle = '#000099';

    score.table.forEach((item) => {
      if (n < 10) {
        ctx.strokeText(`${item.name.substring(0, 9)}`, 100, 90 + n * 30);
        ctx.strokeText(`${timeFormat(item.time)}`, 400, 90 + n * 30);
        ctx.strokeText(`${item.score}`, 600, 90 + n * 30);
        n++;
      }
    });

    const x = game.width / 2 - 150;
    const y = game.height - 100;

    button(x, y, "Redémarrer une partie");

  }

  const overlay = () => {
    ctx.font = '30px serif';
    const viewScore = `Score : ${score.point}`;
    const wmsg = ctx.measureText(viewScore).width;

    ctx.fillText(`Cible ${score.cible}/10 - Missile ${score.projectile}`, 10, game.height - 10);
    ctx.fillText(viewScore, game.width - 10 - wmsg, game.height - 10);
    ctx.fillText(`Temps : ${time()}`, 10, 30);
  }

  const time = () => {
    let ellapse = Date.now() - timeInit;
    return timeFormat(ellapse);
  }

  const timeFormat = (time) => {
    const ms = Math.floor((time % 1000) / 10);
    time = Math.floor(time / 1000);
    const sec = time % 60;
    const min = Math.floor((time - sec) / 60);
    return `${twoDigit(min)}:${twoDigit(sec)}.${twoDigit(ms)}`;
  }

  const twoDigit = (value) => {
    return value < 10 ? `0${value}` : value;
  }
  const update = () => {
    if (projectile !== null) {
      projectile.moveY(velocity);
      if (!projectile.isVisible) {
        projectile = null;
        projectileToCibleSerie = 0;
      }
    }
    if (cible === null) {
      cible = new Cible(ctx, tank.ratio);
    } else if (projectile != null && cible.collide(projectile)) {
      cible = null;
      projectile = null;
      score.cible++;
      projectileToCibleSerie++;
      score.point += (projectileToCibleSerie * 10) * difficulty;
      if (score.cible >= 10) {
        screen = 'end';
      }
    } else {
      cible.moveX(velocity);
    }
  }

  const keyDown = (k) => {
    tank.keyDown(k);

    if (screen === 'game' && k.key == " " && projectile === null) {
      projectile = new Projectile(ctx, tank.ratio * .8, tank.x, tank.y - tank.ratio);
      score.projectile++;
    }
  }

  refresh = setInterval(draw, 1000 / 50);
  ctx.canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX - ctx.canvas.offsetLeft;
    mouse.y = e.clientY - ctx.canvas.offsetTop;
  });
  document.onkeydown = keyDown;
  game.onclick = mouse.click.bind(mouse);
})();