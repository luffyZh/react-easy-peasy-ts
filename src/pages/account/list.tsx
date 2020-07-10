import React, { useEffect, memo } from 'react';
import { Button, Table, Select, Input, Popconfirm } from 'antd';
import _ from 'lodash';
import { useAsyncFn, useEffectOnce } from 'react-use';
import { useStoreActions, useStoreState } from 'src/state/hooks';
import EmptyData from 'src/components/EmptyData';
import { PageSizeOptions, Roles } from 'src/constants/ConstTypes';
import styles from './Account.module.scss';

const { Option } = Select;

const filterStyle = {
  width: 120,
  margin: '0 10px',
};

function AccountList(props: IComponentProps) {
  const { history } = props;
  const accountData = useStoreState(state => state.userModel);
  const accountActions = useStoreActions(actions => actions.userModel);
  const { queryCondition } = useStoreState(state => state.globalModel);
  const { setQueryCondition, resetQueryCondition } = useStoreActions(actions => actions.globalModel);

  const { pageNum, pageSize } = queryCondition;

  const { list, total, needFetch } = accountData;
  const { fetchUserList, setNeedFetch, setUserInfo } = accountActions;

  const [state, fetchList] = useAsyncFn(() => fetchUserList());

  useEffectOnce(() => {
    resetQueryCondition('account');
  });

  useEffect(() => {
    if (needFetch) {
      // 需要重新获取数据
      console.log('进行用户列表数据获取');
      fetchList();
    }
  }, [fetchList, needFetch]);

  const onRoleChange = value => {
    const payload = {
      type: 'role',
      value,
    };
    setQueryCondition(payload);
  };

  const onMobileChange = ({ target: { value } }) => {
    const payload = {
      type: 'mobile',
      value,
    };
    setQueryCondition(payload);
  };

  const onNameChange = ({ target: { value } }) => {
    const payload = {
      type: 'name',
      value: value,
    };
    setQueryCondition(payload);
  };

  const onPageNumChange = pn => {
    const payload = {
      type: 'pageNum',
      value: pn,
    };
    setQueryCondition(payload);
  };

  const onPageSizeChange = (pn, ps) => {
    const payload = {
      type: 'pageSize',
      value: ps,
    };
    setQueryCondition(payload);
  };

  const columns = [
    {
      key: 'accountName',
      title: '员工姓名',
      dataIndex: 'accountName',
    },
    {
      key: 'role',
      title: '角色类型',
      dataIndex: 'role',
    },
    {
      key: 'phoneNum',
      title: '员工手机号',
      dataIndex: 'phoneNum',
    },
    {
      key: 'createTime',
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      key: 'operate',
      title: '操作',
      render: (text, record) => (
        <span className={styles.divider}>
          <a href={`/account/new?accountId=${record.accountId}`}>修改信息</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <Popconfirm
            placement="topRight"
            title="员工账号删除后将无法再登录系统使用，是否确认删除？"
            onConfirm={() => console.log(record.accountId)}
            onCancel={() => console.log('取消删除')}
          >
            <a className={styles.delete}>删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <>
      <div className={styles.query_bar}>
        <Button
          type="primary"
          onClick={() => {
            // 新建之前先清空
            setUserInfo(null);
            history.push('/account/new');
          }}
        >
          新建账号
        </Button>
        <div className={styles.query_right}>
          <Select style={filterStyle} placeholder="角色类型" onChange={onRoleChange}>
            <Option value="-1">全部角色</Option>
            {_.keys(Roles).map(key => (
              <Option key={key} value={Roles[key]}>
                {key}
              </Option>
            ))}
          </Select>
          <Input style={filterStyle} placeholder="员工手机号" onChange={onMobileChange} />
          <Input maxLength={10} style={filterStyle} placeholder="员工姓名" onChange={onNameChange} />
          <Button onClick={() => setNeedFetch(true)}>搜索</Button>
        </div>
      </div>
      <Table
        size="middle"
        rowKey={record => record.accountId}
        columns={columns}
        dataSource={list}
        bordered
        loading={state.loading}
        pagination={{
          size: 'default',
          current: pageNum,
          pageSize,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: onPageNumChange,
          onShowSizeChange: onPageSizeChange,
          pageSizeOptions: PageSizeOptions,
          total: total,
          showTotal: () => `共 ${total} 条`,
        }}
        locale={{ emptyText: EmptyData }}
      />
    </>
  );
}

export default memo(AccountList);
