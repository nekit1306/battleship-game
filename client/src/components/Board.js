/**
 * Created by Kasutaja on 08.01.2018.
 */
import React, {Component} from 'react';
import Ship from './Ship';

class Board extends Component {

    renderRows() {
        let cells = [];
        let rows = [];

        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if (y === -1) {
                    cells.push(
                        <td className="header">
                            <span>{alphabet[x + 1]}</span>
                        </td>
                    );
                } else {
                    if (x === -1) {
                        cells.push(
                            <td className="header">
                                <span>{numbers[y + 1]}</span>
                            </td>
                        );
                    } else {
                        let cellProps = {
                            key: `${x}${y}`,
                            x: x,
                            y: y
                        };

                        cells.push(this.renderCells(cellProps));
                    }
                }
            }
            rows.push(
                <tr key={y}>
                    {cells}
                </tr>
            );

            cells = [];
        }
        return rows;
    };

    renderShips(key) {
        // const { ships, isOpponent, shipClasses, destroyed } = this.props;
        //
        // if (!isOpponent && ships && ships[key]) {
        //
        //     return <Ship type={shipClasses(key)} data={ships[cells[key].id]} />
        //
        // } else if (isOpponent) {
        //
        //     return <Ship type={shipClasses} data={destroyed} />
        // }
    };

    renderCells(cellProps) {
        const alphabet = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J '];
        const numbers = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

        const { onCellClick, cellClasses } = this.props;

        const key = cellProps.key;

        return (
            <td className="cell">
                <div className={"cell-content " + cellClasses(key)} onClick={() => onCellClick(cellProps)}>
                    {this.renderShips(key)}
                    {cellProps.x === 0 &&
                        <span className="left">{numbers[cellProps.y + 1]}</span>
                    }
                    {cellProps.y === 0 &&
                        <span className="top">{alphabet[cellProps.x + 1]}</span>
                    }
                </div>
            </td>
        );
    };


    render() {
      return (
          <div className="player-field">
              <div className="gap">
                  <div className="board-table">
                      <table className="table">
                          <tbody>
                          {this.renderRows()}
                          </tbody>
                      </table>
                  </div>
              </div>
              <div>{this.props.title}</div>
          </div>
      )
    }
};

export default Board;
