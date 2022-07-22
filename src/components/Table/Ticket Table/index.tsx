import React, { useEffect, useState } from 'react';
import { ITicket } from '../../../types/tickets';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import style from './TicketTable.module.scss';
import { LoginContext } from '../../../Context/loginContext';
import { LoginContextType } from '../../../types/login';

interface Props {
  data: ITicket[];
  editTicket: (id: string) => void;
  deleteTicket: (id: string) => void;
}

export function TicketTable({ data, editTicket, deleteTicket }: Props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { userId, userIsAdmin } = React.useContext(LoginContext) as LoginContextType;

  var filteredData: ITicket[] = [];

  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  userIsAdmin
    ? (filteredData = data)
    : (filteredData = data.filter((row) => {
        return row.userId.toString() === userId;
      }));

  return filteredData.length === 0 ? (
    <div>
      <label>Nenhum chamado encontrado.</label>
      <br />
      <label>Caso tenha aberto algum chamado, tente recarregar a página.</label>
    </div>
  ) : (
    <table className={style.table}>
      <thead key={uuidv4()} className={style.tableRow}>
        <tr>
          <th className={`${style.tableHead} ${style.tableCellId}`}>ID</th>
          {windowWidth > 700 ? (
            <th className={`${style.tableHead} ${style.tableCellId}`}>ID do usuário</th>
          ) : null}

          <th className={style.tableHead}>Assunto</th>

          {windowWidth > 700 ? (
            <th className={`${style.tableHead} ${style.tableCellPriority}`}>Prioridade</th>
          ) : null}

          <th className={style.tableHead}>Status</th>
          {userIsAdmin ? <th className={style.tableHead}>Ações</th> : null}
        </tr>
      </thead>
      {filteredData.map((row) => {
        return (
          <tbody key={uuidv4()} className={style.tableRow}>
            <tr>
              <td
                onClick={() => editTicket(row.id)}
                className={`${style.tableData} ${style.tableCellId}`}
              >
                <span className={style.tableDataOverflow}>{row.id}</span>
              </td>

              {windowWidth > 700 ? (
                <td
                  onClick={() => editTicket(row.id)}
                  className={`${style.tableData} ${style.tableCellId}`}
                >
                  <span className={style.tableDataOverflow}>{row.userId}</span>
                </td>
              ) : null}

              <td onClick={() => editTicket(row.id)} className={style.tableData}>
                <span className={style.tableDataOverflow} title={row.subject}>
                  {row.subject}
                </span>
              </td>

              {windowWidth > 700 ? (
                <td
                  onClick={() => editTicket(row.id)}
                  className={`${style.tableData} ${style.tableCellPriority}`}
                >
                  {row.priority}
                </td>
              ) : null}

              <td
                onClick={() => editTicket(row.id)}
                className={
                  userIsAdmin ? style.tableData : `${style.tableData} ${style.tableCellActions}`
                }
              >
                <span className={style.tableDataOverflow}>{row.status}</span>
              </td>
              {userIsAdmin ? (
                <td className={`${style.tableData} ${style.tableCellActions}`}>
                  <Link to='#'>
                    <img
                      src='/gerenciadordechamados/assets/ic_edit.png'
                      className={style.actionIcon}
                      alt='delete-icon'
                      onClick={() => editTicket(row.id)}
                    />
                  </Link>
                  <Link to='#'>
                    <img
                      src='/gerenciadordechamados/assets/ic_delete.png'
                      className={style.actionIcon}
                      alt='delete-icon'
                      onClick={() => deleteTicket(row.id)}
                    />
                  </Link>
                </td>
              ) : null}
            </tr>
          </tbody>
        );
      })}
    </table>
  );
}
