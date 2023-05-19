import { useSelector } from 'react-redux';
import css from './UserCard.module.css';
import { selectorUserItems } from 'redux/selectors';
import { Button } from 'components/Button/Button';

export const UserCard = ({ index }) => {
  const data = useSelector(selectorUserItems);

  const { avatar, tweets, followers } = data[index];

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
      <Button index={index}></Button>
    </li>
  );
};
