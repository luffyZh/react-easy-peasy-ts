import React, { Component, ReactElement } from 'react';
import { Result, Button } from 'antd';

interface IErrorProps {
  children: ReactElement;
}

interface IErrorState {
  hasError: boolean;
  eventId?: any;
}

class ErrorBoundary extends Component<IErrorProps, IErrorState> {
  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    console.log('渲染出错：', error);
    return { hasError: true };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.log(error);
  }
  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return (
        <Result
          style={{ margin: 'auto' }}
          status={500}
          title="运行异常"
          subTitle="对不起，程序运行出现异常，如果您愿意配合我们排查，请点击下方 错误上报 按钮"
          extra={
            <>
              <Button type="primary" onClick={() => (window.location.href = '/')}>
                错误上报
              </Button>
              <Button onClick={() => window.location.reload()}>取消</Button>
            </>
          }
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
