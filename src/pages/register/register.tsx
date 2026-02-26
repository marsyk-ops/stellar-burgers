import { FC, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser } from '../../services/slices/userSlice';
import { RegisterUI } from '@ui-pages';
import { useForm } from '../../hooks/useForm';

export const Register: FC = () => {
  const { values, setValue } = useForm({
    userName: '',
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        registerUser({
          name: values.userName,
          email: values.email,
          password: values.password
        })
      ).unwrap();
      navigate('/', { replace: true });
    } catch (err) {
      // Ошибка игнорируется
    }
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={values.email}
      userName={values.userName}
      password={values.password}
      setEmail={(value) =>
        setValue(
          'email',
          typeof value === 'function' ? value(values.email) : value
        )
      }
      setPassword={(value) =>
        setValue(
          'password',
          typeof value === 'function' ? value(values.password) : value
        )
      }
      setUserName={(value) =>
        setValue(
          'userName',
          typeof value === 'function' ? value(values.userName) : value
        )
      }
      handleSubmit={handleSubmit}
    />
  );
};
