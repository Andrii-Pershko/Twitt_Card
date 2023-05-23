import { useDispatch, useSelector } from 'react-redux';
import css from './Button.module.css';
import { selectorFollows, selectorUserItems } from 'redux/selectors';
import { putUser } from 'redux/operations';
import { putFollows } from 'redux/followsSlice';

export const Button = ({ index }) => {
  const dispatch = useDispatch();
  const data = useSelector(selectorUserItems);
  const follows = useSelector(selectorFollows);
  const { followers } = data[index];

  const unsubscribe = () => {
    const contact = {
      ...data[index],
      followers: followers - 1,
    };
    dispatch(putUser(contact));

    const followsPayload = !follows[index];
    dispatch(putFollows({ index, followsPayload }));

    const followsSlice = follows.map((status, indexArray) => {
      if (indexArray === index) {
        return !status;
      }
      return status;
    });

    localStorage.setItem('follows', JSON.stringify(followsSlice));
  };

  const subscription = () => {
    const contact = {
      ...data[index],
      followers: followers + 1,
    };
    dispatch(putUser(contact));

    const followsPayload = !follows[index];
    dispatch(putFollows({ index, followsPayload }));

    const followsSlice = follows.map((status, indexArray) => {
      if (indexArray === index) {
        return !status;
      }
      return status;
    });

    localStorage.setItem('follows', JSON.stringify(followsSlice));
  };

  return (
    <>
      <button
        id={index}
        onClick={!follows[index] ? subscription : unsubscribe}
        className={`${css.button} ${follows[index] && css.subscribeBtn}`}
      >
        {follows[index] ? 'FOLLOWING' : 'FOLLOW'}
      </button>
    </>
  );
};
