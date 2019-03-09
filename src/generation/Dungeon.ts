import { getRandomPointInCircle, roundToNum } from "./functions";
import { 
  Point,
  Rectangle 
} from "../compiler/types";

function generateDungeon(numberOfRooms: number): Rectangle[] {
  const rooms: Rectangle[] = [];
  
  for(let i=0; i < numberOfRooms; i++) {
    const point: Point = getRandomPointInCircle(100);
    const room = {
      x: point.x,
      y: point.y,
      width: 32 + roundToNum(Math.floor(Math.random() * 64), 32),
      height: 32 + roundToNum(Math.floor(Math.random() * 64), 32),
    };
    rooms.push(room);
  }

  return rooms;
}

export {
  generateDungeon
};
