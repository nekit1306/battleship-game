/**
 * Created by Kasutaja on 29.12.2017.
 */

const getCalculatedCorners = () => {
    const corners_points = [];

    for(let i = -1; i < size + 1; i++) {
        for(let a = -1; a < 2; a++) {
            const xCoord = orientation === 0 ? x + i : x + a;
            const yCoord = orientation === 0 ? y + a : y + i;

            if ( xCoord >= 0 && xCoord < 10 && yCoord >= 0 && yCoord < 10) {
                corners_points.push(`${xCoord}${yCoord}`);
            }
        }
    }

    return corners_points;
};

export const getPosition = (options) => {
    const { x, y, size, orientation } = options;

    const position = [];

    for (let i = 0; i < size; i++) {
        const xCoord = orientation === 0 ? x + i : x;
        const yCoord = orientation === 1 ? y + i : y;

        position.push(`${xCoord}${yCoord}`);
    }

    return position;
};

export const getCoordinates = () => {

    let corners = ships = [];

    [4, 3, 2, 1].forEach((size, i) => {
        for (let a = 0; a <= i; a++) {

            let x = y = xCoord = yCoord = endPosition = orientation = null;

            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
                orientation = Math.floor(Math.random() * 2);

                xCoord = orientation === 0 ? x + size : x;
                yCoord = orientation === 1 ? y + size : y;

                endPosition = orientation === 0 ? x + size : y + size;

            } while ((endPosition) > 9 || corners.indexOf(`${x}${y}`) !== -1 || corners.indexOf(`${xCoord}${yCoord}`) !== -1);

            corners = getCalculatedCorners(x, y, size, orientation);

            const options = {
                x          : x,
                y          : y,
                size       : size,
                orientation: orientation
            };

            ships.push({
                size       : size,
                orientation: orientation,
                position   : getPosition(options)
            });
        }
    });

    return ships;
};

export function isDefined(property) {
    return property !== 'undefined';
}