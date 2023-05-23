import { UserCard } from 'components/UserCard/UserCard';
import { InfinitySpin } from 'react-loader-spinner';
import css from './Users.module.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'redux/operations';
import { addPagination } from 'redux/paginationSlice';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { checkFilter } from 'redux/filterSlice';
import {
  selectorError,
  selectorFilter,
  selectorLoadingUser,
  selectorPagination,
  selectorUserItems,
} from 'redux/selectors';
import { useNavigate } from 'react-router-dom';
import { followsAction } from 'redux/followsSlice';

export const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectorUserItems);
  const isLoadingUsers = useSelector(selectorLoadingUser);
  const pagination = useSelector(selectorPagination);
  const error = useSelector(selectorError);
  const activeFilter = useSelector(selectorFilter);
  const navigate = useNavigate();

  const addPage = () => {
    if (users.length <= pagination) {
      return;
    }
    setTimeout(() => {
      window.scrollBy({
        top: window.innerHeight - 170,
        behavior: 'smooth',
      });
    }, 250);
    dispatch(addPagination(3));
  };

  const handleFilter = ({ target: { name } }) => {
    dispatch(checkFilter(name));
    dispatch(addPagination(-pagination + 2));
  };

  const toUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUser()).then(res => {
        const statusFollow = res.payload.map(() => {
          return false;
        });
        const localData = typeof localStorage.getItem('follows') === 'string';

        if (localData) {
          const localDataParse = JSON.parse(localStorage.getItem('follows'));
          dispatch(followsAction(localDataParse));
        } else {
          localStorage.setItem('follows', JSON.stringify(statusFollow));
          dispatch(followsAction(statusFollow));
        }
      });
    }
  }, [dispatch, users.length]);

  if (error) {
    return (
      <div>
        {error.status} {error.data}
      </div>
    );
  }
  return isLoadingUsers ? (
    <div className={css.infinity}>
      <InfinitySpin color="#471CA9" />
    </div>
  ) : (
    <>
      <div className={css.btnBox}>
        <button
          className={css.btnLoadMore}
          onClick={() => navigate('/', { replace: true })}
        >
          Back to home
        </button>
        <Dropdown>
          <Dropdown.Toggle
            className={(css.drop, css.btnLoadMore)}
            variant="success"
            id="dropdown-basic"
          >
            Filter: {activeFilter}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item name="All" onClick={handleFilter}>
              All
            </Dropdown.Item>
            <Dropdown.Item name="Follow" onClick={handleFilter}>
              Follow
            </Dropdown.Item>
            <Dropdown.Item name="Followings" onClick={handleFilter}>
              Followings
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <ul>
        {users.map(({ id }, index) => {
          return <UserCard key={id} index={index} />;
        })}
      </ul>
      {pagination >= users.length ? (
        <div className={css.allTwits}>
          <p>Its all tweets</p>
        </div>
      ) : (
        <button className={css.btnLoadMore} onClick={addPage}>
          Load more
        </button>
      )}
      <button onClick={toUp} className={css.btnLoadMore}>
        To Up
      </button>
    </>
  );
};
