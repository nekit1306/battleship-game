// @flow

import  * as React from 'react';
import {buildCount, isDefined} from "../utils/helpers";
import ShipBox from "./Ship";
import classnames from "classnames";
import {
    HIT_STATUS_DONE,
    HIT_STATUS_HIT,
    HIT_STATUS_MISS
} from "../utils/constants";

type Props = {
    onCellClick: (key: string) => void;
    ships      : any[],
    hits       : any[],
    title      : string,
    children?  : React.Node
};

class Board extends React.Component<Props> {
    renderRows = () => {
        let cells        = [];
        let rows         = [];
        const totalRows  = buildCount();
        const totalCells = buildCount();

        totalRows.forEach((y) => {
            totalCells.forEach((x) => {
                let cProps = {
                    key: `${x}${y}`,
                    x  : x,
                    y  : y
                };
                cells.push(this.renderCells(cProps));
            });
            rows.push(
                <tr key={y}>
                    {cells}
                </tr>
            );

            cells = [];
        });
        return rows;
    };

    renderCells = (cProps: any) => {
        const { hits, onCellClick} = this.props;

        const chars = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J '];
        const nums  = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

        const hitCell: any = hits.find(it => it.id === cProps.key);

        const classNames = classnames(
            'cell-content',
            {
                'cell-content_empty': !isDefined(hitCell),
                'cell-content_miss': isDefined(hitCell) && hitCell.status === HIT_STATUS_MISS,
                'cell-content_hit' : isDefined(hitCell) && hitCell.status === HIT_STATUS_HIT,
                'cell-content_done': isDefined(hitCell) && hitCell.status === HIT_STATUS_DONE
            });

        return (
            <td className='cell'>
                <div className={classNames} onClick={() => onCellClick(cProps.key)}>
                    {this.renderShips(cProps.key)}
                    {cProps.x === 0 &&
                        <span className="left">{nums[cProps.y + 1]}</span>
                    }
                    {cProps.y === 0 &&
                        <span className="top">{chars[cProps.x + 1]}</span>
                    }
                </div>
            </td>
        );
    };

    renderShips = (key: string) => {
        const ship: any = this.props.ships.find(val => val.id === key);

        return isDefined(ship) ?
            <ShipBox size={ship.size} orientation={ship.orientation} /> : null;
    };

    render() {
        return (
            <div className="field-board">
                <div className="gap">
                    {this.props.children}
                    <div className="player-field">
                        <div className="board-table">
                            <table className="table">
                                <tbody>{this.renderRows()}</tbody>
                            </table>
                        </div>
                        <div>{this.props.title}</div>
                    </div>
                </div>
            </div>
        )
    }
};

export default Board;
