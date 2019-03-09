import { generateDungeon } from "./dungeon";

test('generateDungeon called with 20 generates a dungeon with 20 rooms', () => {
  const rooms = generateDungeon(20);
  expect(rooms.length).toBe(20);
});
