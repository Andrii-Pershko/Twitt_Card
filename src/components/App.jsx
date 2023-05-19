import { Users } from 'Pages/Users/Users';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout.jsx/SharedLayout';
import { Home } from 'Pages/Home/Home';
import { NotFound } from 'Pages/NotFound/NotFound';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/tweets" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
