import React from 'react';
import { Button } from '../../Button/index';
import { IInput } from '../../../types/inputs';
import { IButton } from '../../../types/buttons';
import style from './LoginForm.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  buttons: IButton[];
  inputs: IInput[];
  error: boolean;
  setError: (value: boolean) => void;
}

export function LoginForm({ buttons, inputs, error, setError }: Props) {
  return (
    <div className={style.formStyle}>
      <form className={style.form}>
        <div className={style.imgDiv}>
          <img
            src='/gerenciadordechamados/assets/img_login_profile.png'
            className={style.imgProfile}
            alt='login-profile'
          />
        </div>
        <div className={style.inputContainer}>
          {inputs.map((input) => {
            return (
              <React.Fragment key={input.id}>
                <label htmlFor={input.name}>{input.label}</label>
                <input
                  className={error ? style.inputError : ''}
                  type={input.type}
                  name={input.name}
                  value={input.value}
                  onChange={(e) => {
                    input.setValue(e.target.value);
                    setError(false);
                  }}
                  id={input.id}
                  placeholder={input.placeholder}
                  required={input.required}
                />
              </React.Fragment>
            );
          })}
          <Link to={'/gerenciadordechamados/esquecisenha'} className={style.forgotPassword}>
            <label className={style.lblForgotPassword}>Esqueci a senha</label>
          </Link>
          <Link to={'/gerenciadordechamados/novousuario'} className={style.register}>
            <label className={style.lblRegister}>Cadastre-se</label>
          </Link>
        </div>
        <div className={style.divButton}>
          <Button buttons={buttons} />
        </div>
      </form>
    </div>
  );
}
