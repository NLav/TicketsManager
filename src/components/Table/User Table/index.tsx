import React, { useEffect, useState } from 'react';
import { IUser } from '../../../types/user';
import style from './UserTable.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

interface Props {
  data: IUser[];
  editUser: (id: string) => void;
  deleteUser: (id: string) => void;
}

export function UserTable({ data, editUser, deleteUser }: Props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return data.length === 0 ? (
    <div>
      <label>Nenhum usuário encontrado</label>
    </div>
  ) : (
    <table className={style.table}>
      <thead key={uuidv4()} className={style.tableRow}>
        <tr>
          <th className={`${style.tableHead} ${style.tableCellId}`}>ID</th>

          {windowWidth > 700 ? (
            <th className={`${style.tableHead} ${style.tableCellEmail}`}>E-mail</th>
          ) : null}

          <th className={style.tableHead}>Nome</th>

          {windowWidth > 700 ? (
            <th className={`${style.tableHead} ${style.tableCellPassword}`}>Senha</th>
          ) : null}

          <th className={`${style.tableHead} ${style.tableCellCompany}`}>Empresa</th>

          {windowWidth > 700 ? (
            <th className={`${style.tableHead} ${style.tableCellAdmin}`}>Admin</th>
          ) : null}

          <th className={style.tableHead}>Ações</th>
        </tr>
      </thead>
      {data.map((row) => {
        return (
          <tbody key={uuidv4()} className={style.tableRow}>
            <tr>
              <td
                onClick={() => editUser(row.id)}
                className={`${style.tableData} ${style.tableCellId}`}
              >
                <span className={style.tableDataOverflow}>{row.id}</span>
              </td>

              {windowWidth > 700 ? (
                <td onClick={() => editUser(row.id)} className={style.tableData}>
                  <span className={style.tableDataOverflow}>{row.email}</span>
                </td>
              ) : null}

              <td onClick={() => editUser(row.id)} className={style.tableData}>
                <span className={style.tableDataOverflow}>{row.name}</span>
              </td>

              {windowWidth > 700 ? (
                <td onClick={() => editUser(row.id)} className={style.tableData}>
                  <span className={style.tableDataOverflow}>{row.password}</span>
                </td>
              ) : null}

              <td onClick={() => editUser(row.id)} className={style.tableData}>
                <span className={style.tableDataOverflow}>{row.company}</span>
              </td>

              {windowWidth > 700 ? (
                <td onClick={() => editUser(row.id)} className={style.tableData}>
                  <span className={style.tableDataOverflow}>{row.admin ? 'Sim' : 'Não'}</span>
                </td>
              ) : null}

              <td className={`${style.tableData} ${style.tableCellActions}`}>
                <Link to='#'>
                  <img
                    src='/gerenciadordechamados/assets/ic_edit.png'
                    className={style.actionIcon}
                    alt='delete-icon'
                    onClick={() => editUser(row.id)}
                  />
                </Link>
                <Link to='#'>
                  <img
                    src='/gerenciadordechamados/assets/ic_delete.png'
                    className={style.actionIcon}
                    alt='delete-icon'
                    onClick={() => deleteUser(row.id)}
                  />
                </Link>
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
}
