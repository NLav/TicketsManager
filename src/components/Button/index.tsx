import React from 'react';
import { IButton } from '../../types/buttons';
import { v4 as uuidv4 } from 'uuid';
import style from './Button.module.scss';

interface Props {
  buttons: IButton[];
}

export function Button({ buttons }: Props) {
  return (
    <>
      {buttons.map((button) => {
        return (
          <button
            key={uuidv4()}
            onClick={button.onClick}
            type={button.type}
            className={`${style.button} 
              ${
                button.color === 'default'
                  ? style.default
                  : button.color === 'green'
                  ? style.accept
                  : button.color === 'red'
                  ? style.deny
                  : style.neutral
              }`}
          >
            {button.children}
          </button>
        );
      })}
    </>
  );
}
