import { Table } from "antd";
import type { TableProps } from "antd";
import { AnyObject } from "antd/es/_util/type";

function CustomTable<RecordType extends AnyObject>({
  ...rest
}: TableProps<RecordType>) {
  return (
    <Table
      rowKey={(record) => record?.id}
      pagination={{ pageSize: 10 }}
      {...rest}
    />
  );
}

export default CustomTable;
