import css from './Button.module.css';

export const Button = ({ follow }) => {
  return (
    <button className={css.button}>{!follow ? 'FOLLOW' : 'FOLLOWING'}</button>
  );
};
