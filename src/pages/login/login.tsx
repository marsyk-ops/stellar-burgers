import { FC, SyntheticEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/slices/userSlice';
import { LoginUI } from '@ui-pages';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  const { values, setValue } = useForm({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useSelector((state) => state.user.error);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        loginUser({ email: values.email, password: values.password })
      ).unwrap();
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      // Ошибка игнорируется
    }
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={values.email}
      setEmail={(value) =>
        setValue(
          'email',
          typeof value === 'function' ? value(values.email) : value
        )
      }
      password={values.password}
      setPassword={(value) =>
        setValue(
          'password',
          typeof value === 'function' ? value(values.password) : value
        )
      }
      handleSubmit={handleSubmit}
    />
  );
};
