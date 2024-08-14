import { Radio } from "antd";
import useCategoriesHook from "./hooks/categories.hook";
import PageLayout from "@layouts/page-layout/page-layout.component";
import CategoriesTable from "./components/categories-table/categories-table.component";

const Categories = () => {
  const { onCategoryChange, loading, category, categories } =
    useCategoriesHook();

  return (
    <PageLayout loading={loading}>
      <div className="flex flex-col gap-[16px]">
        <Radio.Group value={category} onChange={onCategoryChange}>
          {categories.map((item) => (
            <Radio.Button key={item} value={item}>
              {item}
            </Radio.Button>
          ))}
        </Radio.Group>
        {!!categories.length && <CategoriesTable />}
      </div>
    </PageLayout>
  );
};

export default Categories;
