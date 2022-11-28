import React from 'react';
import { Form } from 'react-bootstrap';
import { User } from '../../api/data-contracts';
import UserItem from '../userItem/UserItem';
import styles from './TableUsers.module.scss';

interface ITableUsers {
	users: User[];
	checkedAllUsers(isChecked: boolean): void;
	checkedUser(usersId: number): void;
}

export default function TableUsers(props: ITableUsers) {
	return (
		<table className={styles.TableUsers}>
			<thead className={styles.thead}>
				<tr>
					<td><Form.Check type="checkbox" onChange={(e) => props.checkedAllUsers(e.currentTarget.checked)} /></td>
					<td>Id</td>
					<td>Full Name</td>
					<td>E-mail</td>
					<td>Registration</td>
					<td>Last login</td>
					<td>Status</td>
				</tr>
			</thead>
			<tbody>
				{
					props.users.map(u =>
						<UserItem
							isChecked={u.isChecked}
							getUserId={props.checkedUser}
							key={u.id}
							firstName={u.firstName}
							lastName={u.lastName}
							email={u.email}
							id={u.id}
							lastLogin={u.lastLogin}
							registrationDate={u.registrationDate}
							isBlocked={u.isBlocked}
						/>
					)}
			</tbody>
		</table>
	)
}
