export const buildArray = () => {
    return new Array(10)
        .fill(4, 0, 1)
        .fill(3, 1, 3)
        .fill(2, 3, 6)
        .fill(1, 6, 10);
};

export const buildCount = () => {
    return new Array(10).fill(0).map((_, i) => i);
};

export const inRange = (val, min, max) => {
    return val >= min && val <= max;
};

export const inCellBounds = (x, y) => {
    return x > 9 || y > 9;
};

export const getCoordsArray = (x, y, orientation, length) => {
    return orientation === 'h' ? [x, y, x + length - 1, y] : [x, y, x, y + length - 1];
};

export const getRandomNum = () => {
    return Math.floor(Math.random() * 10);
};

export const generateOrientation = () => {
    return Math.floor(Math.random() * 2) === 0 ? 'h' : 'v';
};

export const generatePosition = (x, y, o, s) => {
  return new Array(s).fill(0).map((_, i) => o === 'h' ?
      `${x + i}${y}` : `${x}${y + i}`);
};

export const checkAvailableCells = (array1, array2) => {

    if (inCellBounds(array1[2], array1[3])) {
        return true;
    }

    const arr = array2.map(a => [array1].map(b => {
        return ((inRange(b[0], a[0]- 1, a[2] + 1) || inRange(b[2], a[0] - 1, a[2] + 1)) &&
            (inRange(b[1], a[1] - 1, a[3] + 1) || inRange(b[3], a[1] - 1, a[3] + 1)))
    })[0]);

    return arr.some(val => val);
};

export const generateCoordinates = () => {
    const userCoordinates = [];

    const generateShipItem = (size) => {
        let x = getRandomNum();
        let y = getRandomNum();
        let o = generateOrientation();

        let i = 0;

        while (i < 1) {
            const array = getCoordsArray(x, y, o, size);

            if (checkAvailableCells(array, userCoordinates)) {
                x = getRandomNum();
                y = getRandomNum();
                o = generateOrientation();
            } else {
                userCoordinates.push(array);
                i++;
            }
        }

        return {
            id         : `${x}${y}`,
            position   : generatePosition(x, y, o, size),
            orientation: o,
            size       : value
        };
    };

    return buildArray().map((v) => generateShipItem(v));
};

export const isDefined = (item) => {
    return typeof item !== 'undefined';
};

export const isUndefined = (item) => {
    return typeof item === 'undefined';
};