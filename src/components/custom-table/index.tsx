import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
  },
  {
    title: "Age",
    dataIndex: "age",
    defaultSortOrder: "descend",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "41",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "411",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "42",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "422",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "433",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "44",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "434",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "4555",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "4541",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "44166",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "43453",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const CustomTable = () => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
      pagination={{ pageSize: 4 }}
    />
  );
};

export default CustomTable;
