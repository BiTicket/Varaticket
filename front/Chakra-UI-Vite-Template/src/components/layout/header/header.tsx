import React from 'react';
import { Logo } from './logo';
import { AccountInfo } from './account-info';
import styles from './header.module.scss';

type Props = {
  isAccountVisible: boolean;
};

export function Header({ isAccountVisible }: Props) {


  return (
    <header className={styles.header}>
      <Logo />
      
      {isAccountVisible && <AccountInfo />}
    </header>
  );

  
}
