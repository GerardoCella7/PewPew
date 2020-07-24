class Tank {
  constructor(ctx, ratio = 25, x = null, y = null, width = 800, height = 600) {
    this.ctx = ctx;
    this.ratio = ratio;
    this.x = x != null ? x : width / 2;
    this.y = y != null ? y : height - ratio * 2;
    this.width = width;
    this.height = height;
  }
  draw() {

    const ratio = this.ratio;
    const primary = '#006600';
    const secondary = '#9900cc';
    const caterpillar = '#333333';
    const border = '#8080ff';

    this.ctx.strokeStyle = border;
    this.ctx.lineWidth = ratio / 20;

    // affichage des chenilles
    this.ctx.beginPath();
    this.ctx.fillStyle = caterpillar;
    this.ctx.fillRect(this.x - (ratio * 1.5), this.y - (ratio * .75), ratio * 3, ratio / 2);
    this.ctx.fillRect(this.x - (ratio * 1.5), this.y + (ratio * .25), ratio * 3, ratio / 2);
    this.ctx.fill();

    // affichage de la base
    this.ctx.beginPath();
    this.ctx.fillStyle = secondary;
    this.ctx.arc(this.x, this.y, ratio, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // affichage du canon
    this.ctx.beginPath();
    this.ctx.fillStyle = primary;
    this.ctx.fillRect(this.x - (ratio / 3), this.y - (ratio * 2), (ratio / 3) * 2, ratio * 2);
    this.ctx.strokeRect(this.x - (ratio / 3), this.y - (ratio * 2), (ratio / 3) * 2, ratio * 2);
    this.ctx.arc(this.x, this.y, (ratio / 3) * 2, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, (ratio / 3) * 2, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.stroke();

    // affichage du collide
    // this.ctx.strokeStyle = '#FF0000';
    // this.ctx.beginPath();
    // this.ctx.strokeRect(this.getXCollide(), this.getYCollide(), this.getWidth(), this.getHeight());
    // this.ctx.stroke();
  }

  getXCollide() {
    return this.x - (this.ratio * 1.5);
  }
  getYCollide() {
    return this.y - (this.ratio * 2);
  }
  getWidth() {
    return this.ratio * 3;
  }
  getHeight() {
    return this.ratio * 3;
  }

  keyDown(e) {
    switch (e.key) {
      case "q":
      case "Q":
      case "ArrowLeft":
        this.x -= this.ratio / 5;
        if (this.getXCollide() <= 0) this.x = this.ratio * 1.5;
        break;
      case "d":
      case "D":
      case "ArrowRight":
        this.x += this.ratio / 5;
        if (this.getXCollide() + this.getWidth() >= this.width) this.x = this.width - (this.ratio * 1.5);
        break;
    }
  }
}