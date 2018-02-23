/**
 * Created by Kasutaja on 29.12.2017.
 */

export function getShipPosition (x, y, size, orientation) {
    const position = [];
    for (let i = 0; i < size; i++) {
        const xCoord = orientation === 0 ? x + i : x;
        const yCoord = orientation === 1 ? y + i : y;
        position.push(`${xCoord}${yCoord}`);
    }
    return position;
}

export function getRandomCoordinates () {
    const shipsSize = [4, 3, 2, 1];
    let corners = [];

    const ships = [];
    const cells = [];

    let id = 0;

    shipsSize.forEach((size, i) => {
        for(let a = 0; a <= i; a++) {

            let x = null;
            let y = null;
            let xCoord = null;
            let yCoord = null;

            let endPosition = null;
            let orientation = null;

            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
                orientation = Math.floor(Math.random() * 2);

                xCoord = orientation === 0 ? x + size : x;
                yCoord = orientation === 1 ? y + size : y;

                endPosition = orientation === 0 ? x + size : y + size;

            } while ((endPosition) > 9 || corners.indexOf(`${x}${y}`) !== -1 || corners.indexOf(`${xCoord}${yCoord}`) !== -1);

            corners = corners.concat(calculateCorners(x, y, size, orientation));

            ships[id] = {
                pos        : getShipPosition(x, y, size, orientation),
                size       : size,
                startPos   : `${x}${y}`,
                orientation: orientation
            };

            cells[`${x}${y}`] = {
                id: id
            };

            id++;
        }
    });

    return {ships: ships, cells: cells};
}


export function calculateCorners (x, y, size, orientation) {

    const corners = [];

    for(let i = -1; i < size + 1; i++) {
        for(let a = -1; a < 2; a++) {
            const xCoord = orientation === 0 ? x + i : x + a;
            const yCoord = orientation === 0 ? y + a : y + i;
            if ( xCoord >= 0 && xCoord < 10 && yCoord >= 0 && yCoord < 10) {
                corners.push(`${xCoord}${yCoord}`);
            }
        }
    }

    return corners;
}