import React from 'react'
import { Form } from 'react-bootstrap'
import { IUser } from '../../api/data-contracts'
import { getDate } from '../../utils/Utils';
import styles from './UserItem.module.scss';

interface IUserItem {
	getUserId(id: number): void;
	isChecked: boolean;
}

export default function UserItem(props: IUser & IUserItem) {
	return (
		<tr>
			<td>
				<Form.Check type="checkbox" checked={props.isChecked} onChange={() => props.getUserId(props.id)} />
			</td>
			<td>{props.id}</td>
			<td>{`${props.firstName} ${props.lastName}`}</td>
			<td>{props.email}</td>
			<td>{getDate(new Date(props.registrationDate), false)}</td>
			<td>{getDate(new Date(props.lastLogin), true)}</td>
			<td>
				{props.isBlocked ? <span className={styles.blocked}  children='blocked' /> : <span className={styles.active} children='active' />}
			</td>
		</tr>
	)
}