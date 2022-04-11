import LocaleKeys from '../../locales/keys';

const normalRouteToStudent = (pathname, t) => {
  const infix = pathname.endsWith('/') ? '' : '/';
  return `${pathname}${infix}${t(LocaleKeys.ROUTES.STUDENT)}`;
};

const studentRouteToNormal = (pathname, t) => {
  const studentSuffixLength = t(LocaleKeys.ROUTES.STUDENT).length + 1;
  return pathname.substring(0, pathname.length - studentSuffixLength);
};

const STUDENT_MODE_VALUE = 'student-mode';

const ALL_MODE_VALUE = 'all-mode';

export const isStudentRoute = (pathname, t) => {
  return pathname.endsWith(t(LocaleKeys.ROUTES.STUDENT));
};

export const toggleOptions = (pathname, t) => {
  return (
    [
      {
        text: t(LocaleKeys.STUDENT_TOGGLE.FOR_ALL),
        id: 'all',
        value: ALL_MODE_VALUE,
        route: studentRouteToNormal(pathname, t)
      },
      {
        text: t(LocaleKeys.STUDENT_TOGGLE.FOR_STUDENTS),
        id: 'student',
        value: STUDENT_MODE_VALUE,
        route: normalRouteToStudent(pathname, t)
      }
    ]
  );
};
