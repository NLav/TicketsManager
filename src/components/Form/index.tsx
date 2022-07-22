import React from 'react';
import { Button } from '../Button/index';
import { IInput } from '../../types/inputs';
import { ISelect } from '../../types/selects';
import { ITextArea } from '../../types/textareas';
import { IButton } from '../../types/buttons';
import { ICheckbox } from '../../types/checkboxes';
import config from '../../config/app.json';
import style from './Form.module.scss';

interface Props {
  pageTitle: string;
  buttons: IButton[];
  inputs?: IInput[];
  selects?: ISelect[];
  textareas?: ITextArea[];
  checkboxes?: ICheckbox[];
  error?: boolean;
  setError?: (value: boolean) => void;
}

export function Form({
  pageTitle,
  buttons,
  inputs,
  selects,
  textareas,
  checkboxes,
  error,
  setError,
}: Props) {
  return (
    <div className={style.formStyle}>
      <label htmlFor='form'>{pageTitle}</label>
      <form className={style.form}>
        <div className={style.inputContainer}>
          {inputs
            ? inputs.map((input) => {
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
                        if (setError) setError(false);
                      }}
                      id={input.id}
                      placeholder={input.placeholder}
                      required={input.required}
                    />
                  </React.Fragment>
                );
              })
            : null}

          {selects
            ? selects.map((select) => {
                return (
                  <React.Fragment key={select.id}>
                    <label htmlFor={select.name}>{select.label}</label>
                    <select
                      className={error ? style.inputError : ''}
                      name={select.name}
                      value={select.value}
                      onChange={(e) => {
                        select.setValue(e.target.value);
                        if (setError) setError(false);
                      }}
                      id={select.id}
                    >
                      {select.options.map((option) => {
                        return (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        );
                      })}
                    </select>
                  </React.Fragment>
                );
              })
            : null}

          {textareas
            ? textareas.map((textarea) => {
                return (
                  <React.Fragment key={textarea.id}>
                    <label htmlFor={textarea.name}>{textarea.label}</label>
                    <textarea
                      className={error ? style.inputError : ''}
                      name={textarea.name}
                      value={textarea.value}
                      onChange={(e) => {
                        if (e.target.value.length <= config.textarea.characterLimit) {
                          textarea.setValue(e.target.value);
                          if (setError) setError(false);
                        }
                      }}
                      id={textarea.id}
                      placeholder={textarea.placeholder}
                      rows={textarea.rows}
                      required={textarea.required}
                    />
                  </React.Fragment>
                );
              })
            : null}

          {checkboxes
            ? checkboxes.map((checkbox) => {
                return (
                  <div key={checkbox.id}>
                    <input
                      className={error ? style.inputError : ''}
                      type='checkbox'
                      name={checkbox.name}
                      checked={checkbox.checked}
                      onChange={(e) => {
                        checkbox.setValue(e.target.checked);
                        if (setError) setError(false);
                      }}
                      id={checkbox.id}
                    />
                    <label id={checkbox.id}> {checkbox.label} </label>
                  </div>
                );
              })
            : null}
        </div>
        <div className={style.divButton}>
          <Button buttons={buttons} />
        </div>
      </form>
    </div>
  );
}
