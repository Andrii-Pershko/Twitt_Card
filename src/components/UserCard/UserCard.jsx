import { useSelector } from 'react-redux';
import css from './UserCard.module.css';
import { selectorUserItems } from 'redux/selectors';
import { Button } from 'components/Button/Button';

export const UserCard = ({ id }) => {
  const data = useSelector(selectorUserItems);

  const { avatar, tweets, followers } = data.filter(user => {
    return user.id === id;
  })[0];

  const addDot = number => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  return (
    <li className={css.cardBox}>
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
      <Button id={id}></Button>
    </li>
  );
};
