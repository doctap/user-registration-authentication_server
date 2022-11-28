import React from 'react';
import styles from './ContainerPage.module.scss';

type classNameVariants = 'contentCenter' | 'padding2rem';

interface IContainerPage {
	variant: classNameVariants;
	children: React.ReactNode;
}

const getClassNames = (name: classNameVariants) => {
	switch (name) {
		case 'contentCenter': return `${styles.containerPage} ${styles.containerPage_contentCenter}`
		case 'padding2rem':  return `${styles.containerPage} ${styles.containerPage_padding2rem}`
	}
}

export default function ContainerPage(props: IContainerPage) {
	return (
		<div className={getClassNames(props.variant)}>
			{props.children}
		</div>
	)
}
