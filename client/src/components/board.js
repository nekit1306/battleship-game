import React, { Component } from 'react';
import classnames from 'classnames';
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
      const { cells, ships, hits, onCellClick, opponentBoard, classes } = this.props;

      const key = cellProps.key;

      const shipClasses = classnames({
          danger: hits.userBoard[key] && hits.userBoard[key].destroy
      });

      return(
          <td className="cell">
            <div className={"cell-content " + classes(key)} onClick={() => onCellClick(cellProps)}>
              { !opponentBoard && cells[key] &&
                <Ship type={shipClasses} size={ships[cells[key].id].size} />
              }
              { opponentBoard && hits.opponentBoard[key] && hits.opponentBoard[key].destroy &&
                <Ship type={"danger"}  size={hits.opponentBoard[key].destroy.size }/>
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
