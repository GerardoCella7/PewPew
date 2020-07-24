class Cible {
  constructor(ctx, ratio = 25, x = null, y = null, width = 800, height = 600) {
    this.ctx = ctx;
    this.ratio = ratio;
    this.x = x != null ? x : Math.floor(Math.random() * (width - 3 * ratio)) + ratio * 1.5;
    this.y = y != null ? y : Math.floor(Math.random() * ((height / 2) - 3 * ratio) + ratio * 1.5);
    this.width = width;
    this.height = height;
    this.direction = Math.floor(Math.random() * 2) + 1 == 1 ? 1 : -1;
  }

  draw() {
    const ratio = this.ratio;
    const primary = '#ffffff';
    const secondary = '#ff0000';
    const border = '#8080ff';

    this.ctx.strokeStyle = border;
    this.ctx.lineWidth = ratio / 20;

    // affichage de la base
    this.ctx.beginPath();
    this.ctx.fillStyle = primary;
    this.ctx.arc(this.x, this.y, ratio, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // affichage de la base
    this.ctx.beginPath();
    this.ctx.fillStyle = secondary;
    this.ctx.arc(this.x, this.y, ratio * .7, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // affichage de la base
    this.ctx.beginPath();
    this.ctx.fillStyle = primary;
    this.ctx.arc(this.x, this.y, ratio * .4, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // affichage de la base
    this.ctx.beginPath();
    this.ctx.fillStyle = secondary;
    this.ctx.arc(this.x, this.y, ratio * .15, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // affichage du collide
    // this.ctx.strokeStyle = '#FF0000';
    // this.ctx.beginPath();
    // this.ctx.strokeRect(this.getXCollide(), this.getYCollide(), this.getWidth(), this.getHeight());
    // this.ctx.stroke();

  }

  moveX(value = 1) {
    this.x -= value * this.direction;
    if (this.getXCollide() <= 0 || this.getXCollide() + this.getWidth() >= this.width) {
      this.direction *= -1;
    }
  }

  getXCollide() {
    return this.x - this.ratio;
  }
  getYCollide() {
    return this.y - this.ratio / 2;
  }
  getWidth() {
    return this.ratio * 2;
  }
  getHeight() {
    return this.ratio;
  }

  collide(projectile) {
    const x1 = this.getXCollide();
    const y1 = this.getYCollide();
    const w1 = this.getWidth();
    const l1 = this.getHeight();

    const x2 = projectile.getXCollide();
    const y2 = projectile.getYCollide();
    const w2 = projectile.getWidth();
    const l2 = projectile.getHeight();

    // verifie s'il y a du vide autour
    return (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + l2 && y1 + l1 > y2);
  }
}