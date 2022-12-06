import { Avatar, Button, List, Typography, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { CONTACTS_URL } from '../../utils/constants';

import './ContactList.css';

const { Search } = Input;

const { Title } = Typography;

type ContactItem = {
  id: string;
  name: string;
  phone: string;
};

const ContactList: React.FC = () => {
  const [contactList, setContactList] = useState<ContactItem[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  useEffect(() => {
    fetch(CONTACTS_URL)
      .then((res) => res.json())
      .then((res) => setContactList(res));
  }, []);

  return (
    <div className="contactList">
      <Title>Список контактов</Title>
      <Search className="contactSearch" placeholder="Найти контакты" onChange={handleChange} enterButton />
      <List
        bordered
        itemLayout="horizontal"
        dataSource={contactList}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="list-loadmore-edit">edit</Button>,
              <Button key="list-loadmore-more">delete</Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={item.name}
              description={item.phone}
            />
          </List.Item>
        )}
      />
      <Button type="primary" className="add-btn">
        Добавить новый контакт
      </Button>
    </div>
  );
};

export default ContactList;
