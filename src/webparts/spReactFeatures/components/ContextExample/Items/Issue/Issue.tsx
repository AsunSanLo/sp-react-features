
import * as React from 'react';
import {IIssue} from '../../_code/IIssue';
import styles from './Issue.module.scss';

export interface IIssueProps {
  item: IIssue;
}

export const Issue = (props: IIssueProps ) => {
  return (<div className={styles.issue}>
    <div>{props.item.title}</div>
    <div>{props.item.topic}</div>
    <div>{props.item.status}</div>
  </div>);
}
