import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAuthenticationData, User } from '../../../api/data-contracts';
import { authenticationUser, blockUsers, deleteUsers, getUsers, unblockUsers } from '../../../api/http-client';
import CurrentAccount from '../../currentAccount/CurrentAccount';
import TableManager, { Actions } from '../../tableManager/TableManager';
import TableUsers from '../../tableUsers/TableUsers';
import ContainerPage from '../containerPage/ContainerPage';
import styles from './PageUsers.module.scss';

export default function PageUsers() {
	const navigate = useNavigate();
	const [users, setUsers] = useState<User[]>([]);

	const checkedAll = (isChecked: boolean) => {
		const items = [...users]
		items.forEach(it => isChecked ? it.isChecked = true : it.isChecked = false)
		setUsers(items)
	}

	const checkedUser = (id: number) => {
		const foundItem = users.find(it => it.id === id);

		if (foundItem === undefined) {
			console.warn('item is exists but an item not found by id')
			return;
		}

		foundItem.isChecked = !foundItem.isChecked;
		setUsers([...users])
	}

	const getAction = (action: Actions) => {
		const usersId = users
			.filter(u => u.isChecked === true)
			.map(u => u.id);

		if (usersId.length === 0)
			return;

		switch (action) {
			case 'block':
				blockUsers(usersId).then(x => setUsers(x));
				break;
			case 'unblock':
				unblockUsers(usersId).then(x => setUsers(x));
				break;
			case 'delete':
				deleteUsers(usersId).then(x => setUsers(x));
				break;
		}
	}

	const logout = () => {
		localStorage.removeItem('user')
		navigate('/authentication')
	}

	const user: IAuthenticationData = JSON.parse(localStorage.getItem('user') ?? `{"email": "noAccess", "password": "noAccess"}`);
	authenticationUser(user).then(x => !x.isSucceeded && navigate('/authentication'));

	useEffect(() => {
		getUsers().then(x => setUsers(x))
	}, [])

	return (
		<ContainerPage variant='padding2rem'>
			<div className={styles.toolBar}>
				<TableManager getAction={getAction} />
				<CurrentAccount account={user.email} logOut={logout} />
			</div>
			<TableUsers checkedAllUsers={checkedAll} checkedUser={checkedUser} users={users} />
		</ContainerPage>
	)
}