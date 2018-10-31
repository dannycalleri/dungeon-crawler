// https://stackoverflow.com/questions/5837572/generate-a-random-point-within-a-circle-uniformly
const getRandomPointInCircle = (radius: number): Point => {
  const t = 2 * Math.PI * Math.random();
  const u = Math.random() + Math.random();
  let r = null;
  if (u > 1) {
    r = 2-u;
  } else {
    r = u 
  }

  return {
    x: radius * r * Math.cos(t),
    y: radius * r * Math.sin(t)
  };
}

export {
  getRandomPointInCircle
};
