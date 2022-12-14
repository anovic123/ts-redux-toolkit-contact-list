import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hook/hook';
import { addContact } from '../../../redux/slices/contact/contactApi';
import { selectContactStatus } from '../../../redux/slices/contact/contactSlice';
import { UserOutlined } from '@ant-design/icons';

type AddFormValue = {
  name: string;
  phone: string;
};

type Props = {
  isAddFormVisible: boolean;
  hideAddForm: () => void;
};

const AddForm = ({ isAddFormVisible, hideAddForm }: Props) => {
  const status = useAppSelector(selectContactStatus);
  const dispatch = useAppDispatch();

  const onFinish = async ({ name, phone }: AddFormValue) => {
    await dispatch(addContact({ name, phone }));
    hideAddForm();
  };

  return (
    <Modal
      title="Добавление контакта"
      visible={isAddFormVisible}
      onCancel={hideAddForm}
      width={400}
      centered
      footer={null}
    >
      <Form name="" initialValues={{ name: '', phone: '' }} onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Пожалуйста введите имя контакта' }]}
        >
          <Input prefix={<UserOutlined className="site-form-icon" />} placeholder="Имя контакта" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[{ required: true, message: 'Пожалуйста введите номер телефона' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-icon" />}
            placeholder="Номер телефона"
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={status === 'loading'}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddForm;
