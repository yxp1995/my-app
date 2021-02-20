import React from 'react';
import style from './index.module.css';

export default class HouseClear extends React.Component {
    render() {
        return (
            <div className={style.clear}>房源为空</div>
        )
    }
}