import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IRegistrationData } from '../../../api/data-contracts';
import { registrationUser } from '../../../api/http-client';
import { addUserInLocalStorage } from '../../../utils/Utils';
import RegistrationFrom from '../../forms/registrationForm/RegistrationFrom';
import ContainerPage from '../containerPage/ContainerPage';
import styles from './PageRegistration.module.scss';

export default function PageRegistration() {
	const navigate = useNavigate();

	const sendUserData = (data: IRegistrationData) => {
		registrationUser(data).then(b => {
			if (b.isSucceeded)
				addUserInLocalStorage(data)
			navigate('/');
		});
	}
	
	const rerouteOnAuthenticationForm = () => navigate('/authentication');

	return (
		<ContainerPage variant='contentCenter'>
			<div className={styles.PageRegistration}>
				<RegistrationFrom reroute={rerouteOnAuthenticationForm} getData={sendUserData} />
			</div>
		</ContainerPage>
	)
}