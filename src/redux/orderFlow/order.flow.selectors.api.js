import pathOr from 'ramda/src/pathOr';

export const getDecisionPages = (payload) => pathOr([], ['Context', 'Pages'], payload);

export const getDecisions = (payload) => pathOr([], ['Context', 'Decisions'], payload);
