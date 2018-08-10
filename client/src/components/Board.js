import React from 'react';
import Ship from './Ship';

const Board = (props) => {

  const renderRows = () => {
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

                      cells.push(renderCells(cellProps));
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

  const renderShips = (key) => {

      const { ships, cells, hit_points, isOpponent, shipClasses } = props;
      const opponentBoard = hit_points[key];

      if (!isOpponent && cells[key]) {

          return <Ship type={shipClasses(key)} data={ships[cells[key].id]} />

      } else if (isOpponent && opponentBoard) {

          return <Ship type={shipClasses} data={opponentBoard.destroyed} />
      }
  };

  const renderCells = (cellProps) => {
      const alphabet = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J '];
      const numbers = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

      const { onCellClick, cellClasses } = props;

      console.log(cellProps);

      const key = cellProps.key;

      return(
          <td className="cell">
            <div className={"cell-content " + cellClasses(key)} onClick={() => onCellClick(cellProps)}>
                {renderShips(key)}
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

  return (
      <div className ="player-field">
        <div className="gap">
            <div className="board-table">
                <table className="table">
                    <tbody>
                    {renderRows()}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
  );
};

export default Board;
