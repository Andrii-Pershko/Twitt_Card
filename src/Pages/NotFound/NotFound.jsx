import { useNavigate } from 'react-router-dom';
import css from '../Users/Users.module.css';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={css.boxNotFound}>
      <p>Page Not Found</p>
      <div>
        <button
          className={css.btnLoadMore}
          onClick={() => navigate('/', { replace: true })}
        >
          Go to Home
        </button>
        <button
          className={css.btnLoadMore}
          onClick={() => navigate('/tweets', { replace: true })}
        >
          Go to Tweets
        </button>
      </div>
    </div>
  );
};
