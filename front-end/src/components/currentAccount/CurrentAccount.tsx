import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './CurrentAccount.module.scss';

interface ICurrentAccount {
	account: string;
	logOut(): void;
}

export default function CurrentAccount(props: ICurrentAccount) {
	return (
		<div className={styles.currentAccount}>
			<div className={styles.email}>
				{props.account}
			</div>
			<Button variant="primary" size='sm' children='Log Out' onClick={props.logOut} />
		</div>
	)
}
