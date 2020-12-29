import range from './range';

const START_YEAR = 1900;
const END_YEAR = 2100;

const UNIT_YEAR = '';
const UNIT_MONTH = '';
const UNIT_DAY = '';

export function isLeapYear(y) {
  return y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
}

function getDays(y, m) {
  y = Number(y);
  m = Number(m);
  let endDay = null;
  switch (m) {
    case 2:
      endDay = isLeapYear(y) ? 29 : 28;
      break;
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      endDay = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
    default:
      endDay = 30;
      break;
  }
  const days = range(1, endDay, true, UNIT_DAY);
  return days.map((day) => {
    return { value: day };
  });
}

const yearData = range(START_YEAR, END_YEAR, true, UNIT_YEAR);
const monthData = range(1, 12, true, UNIT_MONTH);

const cascadeMonthData = monthData.map((month) => {
  return {
    value: month,
    children: [],
  };
});

const dateData = yearData.map((year) => {
  const item = {
    value: year,
    children: cascadeMonthData.slice(),
  };

  item.children.forEach((month) => {
    month.children = getDays(year, month.value);
  });
  return item;
});

export { dateData };
