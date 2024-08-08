import { Table } from "antd";
import type { TableProps } from "antd";
import { AnyObject } from "antd/es/_util/type";

function CustomTable<RecordType extends AnyObject>({
  ...rest
}: TableProps<RecordType>) {
  return (
    <Table
      {...rest}
      rowKey={(record) => record?.key}
      pagination={{ pageSize: 10 }}
    />
  );
}

export default CustomTable;
