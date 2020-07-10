import React from 'react';
import { Result, Button } from 'antd';

function NotFound(props: IComponentProps) {
  const { history } = props;
  return (
    <Result
      style={{ margin: 'auto' }}
      status="404"
      title="404"
      subTitle="对不起, 您正在访问的页面不存在."
      extra={
        <Button type="primary" onClick={() => history.push('/outVendor')}>
          返回首页
        </Button>
      }
    />
  );
}

export default NotFound;
