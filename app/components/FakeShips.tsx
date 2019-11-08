import * as React from 'react';
import classnames from 'classnames';
import { isDefined } from 'utils/helpers';

interface Props {
    onClick: (ship: any) => void;
}

const FakeShips = ({onClick}: Props) => {
    const renderShips = () => {
        const { selectedShip, ships } = this.props;

        let rows = [];
        let counter = 0;

        for(let i = 4; i > 0; i--) {
            let shipList = [];
            for (let a = 4; a > i - 1; a--) {
                const ship = {id: counter++, size: i};

                const classes = classnames({
                    active: selectedShip.id === ship.id,
                    placed: isDefined(ships[ship.id])
                });

                shipList.push(
                    <div onClick={() => onClick(ship)}
                         className={`ship-box-fake ship-fake-${i} ` + classes}>
                    </div>
                )
            }
            rows.push(<div className="ship-box-fake-row">{shipList}</div>);
        }
        return rows;
    };

    return (
        <div className ="ship-box-fake-block">
            {renderShips()}
        </div>
    );
};

export default FakeShips;
