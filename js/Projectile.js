class Projectile {
  constructor(ctx, ratio = 25, x = null, y = null, width = 800, height = 600) {
    this.ctx = ctx;
    this.ratio = ratio;
    this.x = x != null ? x : width / 2;
    this.y = y != null ? y : height / 2;
    this.width = width;
    this.height = height;
  }
  draw() {
    const ratio = this.ratio;
    const primary = '#006600';
    const secondary = '#9900cc';
    const border = '#8080ff';

    this.ctx.lineWidth = ratio / 20;
    this.ctx.strokeStyle = border;


    // affichage de la tête
    this.ctx.beginPath();
    this.ctx.fillStyle = primary;
    this.ctx.ellipse(this.x, this.y, ratio / 3, ratio, 0, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // affichage du corp
    this.ctx.beginPath();
    this.ctx.fillStyle = secondary;
    this.ctx.fillRect(this.x - (ratio / 3), this.y, (ratio / 3) * 2, ratio * 2);
    this.ctx.strokeRect(this.x - (ratio / 3), this.y, (ratio / 3) * 2, ratio * 2);
    this.ctx.fill();
    this.ctx.stroke();

    // affichage du collide
    // this.ctx.strokeStyle = '#FF0000';
    // this.ctx.beginPath();
    // this.ctx.strokeRect(this.getXCollide(), this.getYCollide(), this.getWidth(), this.getHeight());
    // this.ctx.stroke();
  }
  get isVisible() {
    return this.y + (this.ratio * 2) >= 0;
  }

  moveY(value = 1) {
    this.y -= value;
  }

  getXCollide() {
    return this.x - (this.ratio / 3);
  }
  getYCollide() {
    return this.y - this.ratio;
  }
  getWidth() {
    return (this.ratio / 3) * 2;
  }
  getHeight() {
    return this.ratio;
  }
}