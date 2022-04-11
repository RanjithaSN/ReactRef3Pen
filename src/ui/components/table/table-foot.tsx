import React, { PropsWithChildren } from 'react';
import Head from './table-head';

const Foot = (props: PropsWithChildren<any>) => <Head as="tfoot" {...props} />;

export default Foot;
