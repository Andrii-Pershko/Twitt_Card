import { UserCard } from 'components/UserCard/UserCard';
import { InfinitySpin } from 'react-loader-spinner';
import css from './Users.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'redux/operations';
import { addPagination } from 'redux/paginationSlice';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { checkFilter } from 'redux/filterSlice';

export const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.items);
  const isLoadingUsers = useSelector(state => state.users.isLoadingUsers);
  const pagination = useSelector(state => state.pagination);
  const error = useSelector(state => state.users.error);
  const activeFilter = useSelector(state => state.filter);

  const filteredUsers = () => {
    if (activeFilter === 'All') {
      return users;
    }
    if (activeFilter === 'Follow') {
      return users.filter(({ follow }) => follow === false);
    } else {
      return users.filter(({ follow }) => follow === true);
    }
  };

  console.log('activeFilter', activeFilter);

  const addPage = () => {
    if (users.length <= pagination) {
      return;
    }
    dispatch(addPagination(3));
  };
  console.log('first', pagination);

  const handleFilter = ({ target: { name } }) => {
    dispatch(checkFilter(name));
    dispatch(addPagination(-pagination + 2));
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (error) {
    return (
      <div>
        {error.status} {error.data}
      </div>
    );
  }
  return isLoadingUsers ? (
    <InfinitySpin style className={css.infinity} color="#471CA9" />
  ) : (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
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

      <ul>
        {filteredUsers()
          .filter((_, index) => index <= pagination)
          .map(({ id }) => {
            return <UserCard key={id} index={id - 1} />;
          })}
      </ul>
      {pagination >= filteredUsers().length ? (
        <div className={css.allTwits}>
          <p>Its all tweets</p>
        </div>
      ) : (
        <button className={css.btnLoadMore} onClick={addPage}>
          Load more
        </button>
      )}
    </>
  );
};
