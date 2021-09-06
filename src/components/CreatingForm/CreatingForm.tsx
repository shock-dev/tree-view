import React, { FormEvent, MutableRefObject, useRef, useState } from 'react';
import s from './CreatingForm.module.scss';
import useOutsideClick from '../../hooks/useOutsideClick';
import { useDispatch } from 'react-redux';
import { createBranchRequest } from '../../store/actions';
import TextInput from '../TextInput/TextInput';

const CreatingForm = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const ref = useRef() as MutableRefObject<HTMLInputElement>;
  const conditionTitle = title.trim() !== '';

  useOutsideClick(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const reset = () => {
    setTitle('');
    setIsOpen(false);
  };

  const toggleVisible = (): void => {
    setIsOpen(!isOpen);
  };

  const createHandler = (e: FormEvent) => {
    if (conditionTitle) {
      dispatch(createBranchRequest({ title, main: true }));
      reset();
    }
    e.preventDefault();
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
          <form onSubmit={createHandler}>
            <TextInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              full
            />
            <button
              type="submit"
              className={s.btn}
              disabled={!conditionTitle}
            >
              Добавить
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreatingForm;
