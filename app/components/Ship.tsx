import * as React from 'react';

interface Props {
    size: number;
    orientation: string
}

const ShipBox = ({size, orientation}: Props) => {
    return (
        <div className={"ship-box size--" + size + ' orient--' + orientation}></div>
    );
};

export default ShipBox;
