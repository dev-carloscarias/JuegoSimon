import React from 'react';
import { Score } from '../interfaces/score-interface';

interface ScoreTableProps {
  scores: Score[];
}

const ScoreTable: React.FC<ScoreTableProps> = ({ scores }) => {
  return (
    <div style={styles.container}>
      <h2>Puntuaciones Altas</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Puntuación</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td style={styles.td}>{score.name}</td>
              <td style={styles.td}>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    marginTop: '30px',
  },
  table: {
    margin: '0 auto',
    borderCollapse: 'collapse',
    width: '50%',
  },
  th: {
    border: '1px solid #dddddd',
    textAlign: 'center',
    padding: '8px',
    backgroundColor: '#f2f2f2',
  },
  td: {
    border: '1px solid #dddddd',
    textAlign: 'center',
    padding: '8px',
  },
};

export default ScoreTable;
