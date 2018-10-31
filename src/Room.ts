class Room {
  private x:number = 0;
  private y:number = 0;
  private width:number = 0;
  private height:number = 0;

  public constructor(x: number, y: number, width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public getWidth() { return this.width; }
  public getHeight() { return this.height; }
}

export default Room;
