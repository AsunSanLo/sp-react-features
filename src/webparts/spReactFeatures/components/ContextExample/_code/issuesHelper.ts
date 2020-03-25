import { IIssue } from "./IIssue";

export const groupIssuesBy = (issues: Array<IIssue>, prop: string) => {
  const group = {};
  issues.forEach(issue => {
    const propValue = issue[prop];
    if (!group[propValue]) group[propValue] = [];
    group[propValue].push(issue);
  })
  return group;
}

export const reGroupIssuesBy = (issues: { [groupTitle: string]: Array<IIssue> }, prop: string) => {
  const group = {};
  for (let groupTitle in issues) {
    issues[groupTitle].forEach(issue => {
      const propValue = issue[prop];
      if (!group[propValue]) group[propValue] = [];
      group[propValue].push(issue);
    });
  }
  return group;
}
