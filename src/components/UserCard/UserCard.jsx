import { useDispatch, useSelector } from 'react-redux';
import css from './UserCard.module.css';
import { putUser } from 'redux/operations';

export const UserCard = ({ index }) => {
  const dispatch = useDispatch();

  const isLoadingFollow = useSelector(state => state.users.refreshFollow);

  const data = useSelector(state => state.users.items);
  const { id, avatar, tweets, followers, follow } = data[index];

  const unsubscribe = ({ target: { id } }) => {
    const contact = { ...data[id], follow: !follow, followers: followers - 1 };
    dispatch(putUser(contact));
  };

  const subscription = ({ target: { id } }) => {
    const contact = { ...data[id], follow: !follow, followers: followers + 1 };
    dispatch(putUser(contact));
  };

  const addDot = number => {
    return new Intl.NumberFormat('en-US').format(number);
  };
  
  return (
    <li className={css.cardBox}>
      <img
        className={css.back_img}
        src={require('../../img/backgtoundImg@1.png')}
        alt="bg img"
        width="308"
        height="168"
      />
      <div className={css.linear}></div>
      <div className={css.moduleBorder}>
        <div className={css.thumb}>
          <img
            className={css.avatar}
            src={avatar}
            alt="user avatar"
            width="62"
            height="62"
          ></img>
        </div>
      </div>
      <div className={css.test}></div>
      <p className={css.tweets}>{addDot(tweets)} TWEETS</p>
      <p className={css.followers}>{addDot(followers)} FOLLOWERS</p>
      <button
        id={id - 1}
        onClick={!follow ? subscription : unsubscribe}
        className={`${css.button} ${follow && css.subscribeBtn}`}
      >
        {isLoadingFollow ? 'loading' : follow ? 'FOLLOWING' : 'FOLLOW'}
      </button>
    </li>
  );
};
