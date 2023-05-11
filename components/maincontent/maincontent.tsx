import React from 'react';
import {IProps} from '@/stores/userAgent'
import Styles from '../maincontent/maincontent.module.css'


function MainContent({children}: IProps): JSX.Element {
    return <main className={Styles.container}>
        {children}
    </main>
}

export default MainContent;
