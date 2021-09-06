import React, { MutableRefObject, useRef, useState } from 'react';
import s from './CreatingForm.module.scss';
import useOutsideClick from '../../hooks/useOutsideClick';
import { useDispatch } from 'react-redux';
import { createBranchRequest } from '../../store/actions';
import TextInput from '../TextInput/TextInput';

const CreatingForm = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [main, setMain] = useState(false);
  const ref = useRef() as MutableRefObject<HTMLInputElement>;

  useOutsideClick(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const reset = () => {
    setTitle('');
    setMain(false);
    setIsOpen(false);
  };

  const toggleVisible = (): void => {
    setIsOpen(!isOpen);
  };

  const createHandler = () => {
    dispatch(createBranchRequest({ title, main }));
    reset();
  };

  return (
    <div className={s.wrapper}>
      <button
        className={s.add}
        onClick={toggleVisible}
      >
        +
      </button>
      {isOpen && (
        <div
          className={s.popup}
          ref={ref}
        >
          <TextInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            full
          />
          <label className={s.label}>
            <input
              type="checkbox"
              checked={main}
              onChange={(e) => setMain(e.target.checked)}
            />
            <span>Main</span>
          </label>
          <button
            className={s.btn}
            onClick={createHandler}
          >
            Добавить
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatingForm;
