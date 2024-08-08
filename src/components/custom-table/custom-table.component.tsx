import { useCallback } from "react";
import type { TableProps } from "antd";
import { Pagination, Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { useSearchparams } from "@utils/user-search-params";

interface TableType<RecordType extends AnyObject>
  extends TableProps<RecordType> {
  total?: number;
  page?: string;
  page_size?: string;
}

function CustomTable<RecordType extends AnyObject>({
  total = undefined,
  page = "page",
  page_size = "page_size",
  ...rest
}: TableType<RecordType>) {
  const { setSearchParams, searchParams } = useSearchparams();

  const handlePaginationSelect = useCallback(
    (page?: string | number, selectedValue?: string | number) => {
      if (!rest.loading) {
        if (page) {
          setSearchParams?.("page", page);
        } else if (selectedValue) {
          setSearchParams?.("page", 1);
          setSearchParams?.("page_size", selectedValue);
        }
      }

      return "";
    },
    [rest.loading, setSearchParams]
  );

  return (
    <>
      <Table {...rest} pagination={false} rowKey={(record) => record?.key} />
      {total && (
        <div className="flex justify-end py-[24px] px-[12px]">
          <Pagination
            total={total}
            defaultPageSize={10}
            pageSizeOptions={[10, 25, 50, 100]}
            current={Number(searchParams?.[page]) || 1}
            pageSize={Number(searchParams?.[page_size]) || 10}
            onChange={handlePaginationSelect}
            onShowSizeChange={(_, e) => handlePaginationSelect(undefined, e)}
          />
        </div>
      )}
    </>
  );
}

export default CustomTable;
