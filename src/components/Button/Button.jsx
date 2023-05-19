import { useDispatch, useSelector } from 'react-redux';
import css from './Button.module.css';
import { selectorUserItems } from 'redux/selectors';
import { putUser } from 'redux/operations';

export const Button = ({ index }) => {
  const dispatch = useDispatch();

  const data = useSelector(selectorUserItems);

  const { followers, follow } = data[index];

  const unsubscribe = () => {
    const contact = {
      ...data[index],
      follow: !follow,
      followers: followers - 1,
    };
    dispatch(putUser(contact));
  };

  const subscription = () => {
    const contact = {
      ...data[index],
      follow: !follow,
      followers: followers + 1,
    };
    dispatch(putUser(contact));
  };

  return (
    <>
      <button
        id={index}
        onClick={!follow ? subscription : unsubscribe}
        className={`${css.button} ${follow && css.subscribeBtn}`}
      >
        {follow ? 'FOLLOWING' : 'FOLLOW'}
      </button>
    </>
  );
};
