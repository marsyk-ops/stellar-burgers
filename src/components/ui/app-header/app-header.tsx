import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({
  userName,
  handleMenuClick,
  handleLogout
}) => {
  const location = useLocation();

  const handleLogoClick = () => {
    handleMenuClick('/');
  };

  const isConstructorActive = (isActive: boolean) =>
    isActive || location.pathname.startsWith('/ingredients');

  const isProfileActive = (isActive: boolean) =>
    isActive || location.pathname === '/login';

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `${styles.link} ${isConstructorActive(isActive) ? styles.link_active : ''}`
            }
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick('/');
            }}
          >
            {({ isActive }) => (
              <>
                <BurgerIcon
                  type={isConstructorActive(isActive) ? 'primary' : 'secondary'}
                />
                <p className='text text_type_main-default ml-2 mr-10'>
                  Конструктор
                </p>
              </>
            )}
          </NavLink>
          <NavLink
            to='/feed'
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick('/feed');
            }}
          >
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2'>
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </div>
        <div
          className={styles.logo}
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        >
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <NavLink
            to={userName ? '/profile' : '/login'}
            className={({ isActive }) =>
              `${styles.link} ${isProfileActive(isActive) ? styles.link_active : ''}`
            }
            onClick={(e) => {
              e.preventDefault();
              if (userName) {
                handleMenuClick('/profile');
              } else {
                handleMenuClick('/login');
              }
            }}
          >
            {({ isActive }) => (
              <>
                <ProfileIcon
                  type={isProfileActive(isActive) ? 'primary' : 'secondary'}
                />
                <p className='text text_type_main-default ml-2'>
                  {userName || 'Личный кабинет'}
                </p>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
