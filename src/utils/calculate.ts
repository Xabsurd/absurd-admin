function isPrime(num: number) {
  let is = true;
  for (let i = 0; i < Math.sqrt(num); i++) {
    if (num % i === 0) {
      is = false;
    }
  }
  return is;
}
type Point = {
  x: number;
  y: number;
};
class Rect {
  public lt: Point;
  public rt: Point;
  public rb: Point;
  public lb: Point;
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    this.lt = { x, y };
    this.rt = { x: x + width, y };
    this.rb = { x: x + width, y: y + height };
    this.lb = { x, y: y + height };
  }
  static form(lt: Point, rb: Point) {
    return new Rect(lt.x, lt.y, rb.x - lt.x, rb.y - lt.y);
  }
}
const buff: Buffer = new Buffer(10);
console.log(buff[0]);
//计算输入点到到另一个点的距离
function distance(p1: Point, p2: Point) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
////p2点绕p1点旋转angle角度后的坐标
function rotate(p1: Point, p2: Point, angle: number) {
  const dx = p2.x - p1.x; // x轴距离
  const dy = p2.y - p1.y; // y轴距离
  const radian = (angle * Math.PI) / 180; // 弧度
  const x = p1.x + dx * Math.cos(radian) - dy * Math.sin(radian); // x轴旋转后的坐标
  const y = p1.y + dx * Math.sin(radian) + dy * Math.cos(radian); // y轴旋转后的坐标
  return { x, y }; // 旋转后的点
}
//计算矩形绕Y点旋转Z度后的四个点坐标
function rotateRect(rect: Rect, y: Point, z: number) {
  return {
    lt: rotate(rect.lt, y, z),
    rt: rotate(rect.rt, y, z),
    rb: rotate(rect.rb, y, z),
    lb: rotate(rect.lb, y, z)
  };
}

console.log(rotate({ x: 0, y: 0 }, { x: 1, y: 1 }, 90));
