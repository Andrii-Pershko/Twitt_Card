import { useNavigate } from 'react-router-dom';
import css from '../Users/Users.module.css';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={css.home}>
      <h1>Welcome to my test task project</h1>
      <p>In this page you can only go to tweets page</p>
      <button
        className={css.btnLoadMore}
        onClick={() => navigate('/tweets', { replace: true })}
      >
        Go to Tweets
      </button>
    </div>
  );
};
