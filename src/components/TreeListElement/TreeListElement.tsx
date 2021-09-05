import React, { useState } from 'react';
import clsx from 'clsx';
import s from './TreeListElement.module.scss';
import sprite from '../../assets/img/[icons].svg';
import useInput from '../../hooks/useInput';

interface TreeListElementProps {
  title: string
  onDelete: () => void
  onUpdate: (value: string) => void
}

const TreeListElement = ({
  title,
  onDelete,
  onUpdate
}: TreeListElementProps) => {
  const { value, setValue, onChange } = useInput(title);
  const [isEdit, setIsEdit] = useState(false);

  const updateHandler = () => {
    if (value !== title && value.trim() !== '') {
      onUpdate(value);
      setIsEdit(false);
    }
  };

  const cancelHandler = () => {
    setValue(title);
    setIsEdit(false);
  };

  return (
    <li className={s.wrapper}>
      <div className={s.titleWrapper}>
        <input
          className={clsx(s.input, { [s.inputActive]: isEdit })}
          type="text"
          value={value}
          onChange={onChange}
          readOnly={!isEdit}
        />
      </div>
      {isEdit ? (
        <div className={s.actions} style={{ opacity: 1 }}>
          <button onClick={updateHandler}>
            <svg className={s.confirm}>
              <use href={`${sprite}#confirm`} />
            </svg>
          </button>
          <button onClick={cancelHandler}>
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
          <button onClick={onDelete}>
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
