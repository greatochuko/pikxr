function createArrayOfArrays(num) {
  const myArr = [];
  for (let i = 0; i < num; i++) {
    myArr.push([]);
  }
  return myArr;
}

export function generateMasonryArray(columns, data) {
  const myArr = createArrayOfArrays(columns);

  let index = 0;
  data.forEach((d) => {
    if (index >= myArr.length) {
      index = 0;
    }
    myArr[index].push(d);
    index++;
  });

  return myArr;
}
