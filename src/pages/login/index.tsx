import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { useStoreActions } from 'src/state/hooks';
import { checkIsPhone } from 'src/utils/methods';
import styles from './Login.module.scss';

const { Item: FormItem } = Form;

const inputStyle = {
  height: 40,
  border: 'none',
  borderBottom: '1px solid #d9d9d9',
  borderRadius: 0,
};

const Login = ({ history }: RouteComponentProps) => {
  const { login } = useStoreActions(actions => actions.userModel);
  const onSubmit = values => {
    const { mobile, password } = values;
    login({
      mobile,
      password,
    });
  };

  const easterEggClick = () => {
    const eggCount = Number(sessionStorage.getItem('egg_count'));
    const newVal = eggCount + 1;
    sessionStorage.setItem('egg_count', newVal.toString());
    if (Number(eggCount) === 10) {
      message.success('恭喜你解锁最帅程序员的彩蛋');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <Form
          style={{ width: 320 }}
          name="normal_login"
          initialValues={{ remember: true, mobile: '', password: '' }}
          onFinish={onSubmit}
        >
          <h1 onClick={easterEggClick}>登录</h1>
          <h3>手机号</h3>
          <FormItem
            name="mobile"
            rules={[
              { required: true, message: '手机号不能为空' },
              {
                validator: (rule, value) => {
                  if (value.length === 0) {
                    return Promise.resolve();
                  }
                  return checkIsPhone(value) ? Promise.resolve() : Promise.reject('请输入正确的手机号');
                },
              },
            ]}
          >
            <Input
              style={inputStyle}
              // prefix={<MobileOutlined className="site-form-item-icon" />}
              placeholder="13344445555"
            />
          </FormItem>
          <h3>密码</h3>
          <FormItem name="password" rules={[{ required: true, message: '密码不能为空' }]}>
            <Input style={inputStyle} type="password" placeholder="123456" />
          </FormItem>
          <FormItem>
            <Button
              style={{ width: '100%', height: 40, marginTop: 20 }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
      <div className={styles.bg_container} />
    </div>
  );
};

export default Login;
