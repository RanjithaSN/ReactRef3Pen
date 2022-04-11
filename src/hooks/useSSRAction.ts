import { useEffect } from 'react';
import { isServerSide } from '../helpers/ssr.helpers';

export default (func: () => void, deps: any[] = []) => {
  // `func` doesn't need to be part of the dependency array (I think).
  useEffect(() => {
    func();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  if (isServerSide()) {
    func();
  }
};

