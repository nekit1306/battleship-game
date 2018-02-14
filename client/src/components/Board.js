import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Ship from './Ship';

class Board extends Component {

  renderRows() {
      let cells = [];
      let rows = [];
      for (let y = 0; y < 10; y++) {
          for (let x = 0; x < 10; x++) {

              let cellProps = {
                  key: `${x}${y}`,
                  x: x,
                  y: y
              };

              cells.push(this.renderCells(cellProps));
          }

          rows.push(
              <tr key={y}>
                  {cells}
              </tr>
          );

          cells = [];
      }

      return rows;
  }

  renderShips(key) {

      const { ships, cells, hits, isOpponent, shipClasses } = this.props;
      const opponentBoard = hits.opponentBoard[key];

      if (!isOpponent && cells[key]) {

          return <Ship type={shipClasses(key)}
                       size={ships[cells[key].id].size}
                       orientation={ships[cells[key].id].orientation} />

      } else if (isOpponent && opponentBoard && opponentBoard.destroyed) {

          return <Ship type={shipClasses}
                       size={opponentBoard.destroyed.size}
                       orientation={opponentBoard.destroyed.orientation}/>
      }
  }

  renderCells(cellProps) {
      const { onCellClick, cellClasses } = this.props;

      const key = cellProps.key;

      return(
          <td className="cell">
            <div className={"cell-content " + cellClasses(key)} onClick={() => onCellClick(cellProps)}>
                {this.renderShips(key)}
            </div>
          </td>
      );
  }

  render() {
      return (
          <div className ="player-field">
            <div className="gap">
                <div className="board-table">
                    <table className="table">
                        <tbody>
                        {this.renderRows()}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="field-bottom">{this.props.title}</div>
          </div>
      );
    }
}

export default Board;
