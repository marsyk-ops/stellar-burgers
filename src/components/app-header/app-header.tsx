import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/userSlice';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login', { replace: true });
  };

  return (
    <AppHeaderUI
      userName={user?.name || ''}
      handleMenuClick={handleMenuClick}
      handleLogout={handleLogout}
    />
  );
};
