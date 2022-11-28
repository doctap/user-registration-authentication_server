import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IAuthenticationData } from '../../../api/data-contracts';
import { authenticationUser } from '../../../api/http-client';
import { addUserInLocalStorage } from '../../../utils/Utils';
import AuthenticationForm from '../../forms/authenticationForm/AuthenticationForm';
import ContainerPage from '../containerPage/ContainerPage';
import styles from './PageAuthentication.module.scss';

export default function PageAuthentication() {
	const navigate = useNavigate();

	const sendData = (data: IAuthenticationData) => {
		authenticationUser({ email: data.email, password: data.password })
			.then(b => {
				if (b.isSucceeded)
					addUserInLocalStorage(data)
				navigate('/');
			});
	}
	
	const rerouteOnRegistrationPage = () => navigate('/registration');

	return (
		<ContainerPage variant={'contentCenter'}>
			<div className={styles.PageAuthentication}>
				<AuthenticationForm reroute={rerouteOnRegistrationPage} getData={sendData} />
			</div>
		</ContainerPage>
	)
}