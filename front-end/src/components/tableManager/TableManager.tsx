import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './TableManager.module.scss';

export type Actions = 'block' | 'unblock' | 'delete';

interface ITableManager {
	getAction(action: Actions): void;
}

export default function TableManager(props: ITableManager) {
	return (
		<div className={styles.buttons}>
			<Button variant="primary" size='sm' onClick={(e) => props.getAction('block')} children='lock' />
			<Button variant="primary" size='sm' onClick={(e) => props.getAction('unblock')} children='no_encryption' />
			<Button variant="primary" size='sm' onClick={(e) => props.getAction('delete')} children='delete_forever' />
		</div>
	)
}
