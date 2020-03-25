

export interface IItem {
  name: string;
  goal: number;
}
const _mockData = require('./mockData.json') as Array<IItem>;
export const fetchData = async (): Promise<Array<IItem>> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(_mockData), 2000);
  });
}
