import React from 'react';
import { Table } from 'antd';
import './CarTable.css';

const CarTable = ({ data, page, pageSize, onPageChange }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'make_display',
      key: 'make_display',
    },
    {
      title: 'Country',
      dataIndex: 'make_country',
      key: 'make_country',
    },
  ];

  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Table
        
      columns={columns}
      dataSource={paginatedData}
      rowKey="make_display"
      pagination={{
        current: page,
        pageSize: pageSize,
        total: data.length,
        onChange: onPageChange,
      }}
    />
  );
};

export default CarTable;
