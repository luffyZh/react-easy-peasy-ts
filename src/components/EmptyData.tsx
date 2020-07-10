import React, { ReactNode } from 'react';
import { Empty } from 'antd';
import { EmptyImg } from 'src/constants/Images';

export default function(): ReactNode {
  return <Empty description="" imageStyle={{ width: 200, height: 200, margin: '0 auto' }} image={EmptyImg} />;
}
