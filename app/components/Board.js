/**
 * Created by Kasutaja on 08.01.2018.
 */
import React, {Component} from 'react';
import Ship from './Ship';

class Board extends Component {

    buildCount = () => {
        return Array(10).fill().map((_, i) => i);
    };

    renderRows() {
        const totalRows = this.buildCount();
        const totalCells = this.buildCount();
        let cells = [];
        let rows = [];

        totalRows.forEach((y, key) => {
            totalCells.forEach((x, key) => {
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
                        let cProps = {
                            key: `${x}${y}`,
                            x: x,
                            y: y
                        };

                        cells.push(this.renderCells(cProps));
                    }
                }
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

    renderCells(props) {
        const alphabet = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J '];
        const numbers = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

        const { onCellClick, cellClasses } = this.props;

        const key = props.key;

        return (
            <td className="cell">
                <div className={"cell-content " + cellClasses(key)} onClick={() => onCellClick(props)}>
                    {this.renderShips(key)}
                    {props.x === 0 &&
                        <span className="left">{numbers[props.y + 1]}</span>
                    }
                    {props.y === 0 &&
                        <span className="top">{alphabet[props.x + 1]}</span>
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
}

export default Board;
