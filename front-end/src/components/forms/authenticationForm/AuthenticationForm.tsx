import React, { FormEvent } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './AuthenticationForm.module.scss';
import { IAuthenticationData } from '../../../api/data-contracts';

interface IAuthenticationForm {
	getData(data: IAuthenticationData): void;
	reroute(): void;
}

let email = '', password = '';

export default function AuthenticationForm(props: IAuthenticationForm) {

	const submitForm = (event: FormEvent<HTMLFormElement>) => {
		event.stopPropagation();
		event.preventDefault();
		(email && password) && props.getData({ email, password });
	}

	const getEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		const elem = event.currentTarget;
		email = elem.value;
	}

	const getPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		const elem = event.currentTarget;
		password = elem.value;
	}

	return (
		<div className={styles.form}>
			<Form onSubmit={submitForm}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" onChange={getEmail} />
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" onChange={getPassword} />
				</Form.Group>

				<div className={styles.buttons}>
					<Button variant="primary" type="submit" children='Log in' />
					<Button variant="secondary" type="button" children='Go to registration' onClick={() => props.reroute()} />
				</div>
			</Form>
		</div>
	)
}
