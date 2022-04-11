import { useCallback, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router';
import { isStudentRoute } from './storefront.mode.helpers';

export const useToggleMode = (t) => {
  const { pathname } = useLocation();
  const { push } = useHistory();

  const activeMode = useMemo(() => (isStudentRoute(pathname, t) ? 'student-mode' : 'all-mode'), [t, pathname]);

  const setActiveMode = useCallback((route) => {
    push(route);
  }, [push]);

  return [activeMode, setActiveMode];
};
