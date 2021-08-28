import React, { useState } from 'react';
import clsx from 'clsx';
import s from './TreeListElement.module.scss';
import sprite from '../../assets/img/[icons].svg';

interface TreeListElementProps {
  title: string
}

const TreeListElement = ({
  title
}: TreeListElementProps) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <li className={s.wrapper}>
      <div className={s.titleWrapper}>
        <input
          className={clsx(s.input, { [s.inputActive]: isEdit })}
          type="text"
          value={title}
          readOnly={!isEdit}
        />
      </div>
      {isEdit ? (
        <div className={s.actions} style={{ opacity: 1 }}>
          <button onClick={() => setIsEdit(true)}>
            <svg className={s.confirm}>
              <use href={`${sprite}#confirm`} />
            </svg>
          </button>
          <button onClick={() => setIsEdit(false)}>
            <svg className={s.cancel}>
              <use href={`${sprite}#cancel`} />
            </svg>
          </button>
        </div>
      ) : (
        <div className={s.actions}>
          <button onClick={() => setIsEdit(true)}>
            <svg className={s.edit}>
              <use href={`${sprite}#edit`} />
            </svg>
          </button>
          <button>
            <svg className={s.delete}>
              <use href={`${sprite}#delete`} />
            </svg>
          </button>
        </div>
      )}
    </li>
  );
};

export default TreeListElement;
