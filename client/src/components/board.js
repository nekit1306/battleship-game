import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Ship from './ship';

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

  renderCells(cellProps) {
      const { cells, onCellClick, opponentBoard, classes } = this.props;

      return(
          <td className="cell" onClick={() => onCellClick(cellProps)}>
            <div className={"cell-content " + classes(cellProps.key)}>
                { !opponentBoard && cells[cellProps.key] &&
                    <Ship size={cells[cellProps.key].shipSize} />
                }
            </div>
          </td>
      );
  }

  render() {
      return (
          <div className ="player-field">
            <div className="gap">
              <table className="table bfield">
                <tbody>
                {this.renderRows()}
                </tbody>
              </table>
            </div>
            <div className="field-bottom">{this.props.title}</div>
          </div>
      );
    }
}

export default Board;
