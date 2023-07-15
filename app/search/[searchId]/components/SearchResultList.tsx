"use client";

import { User } from "@prisma/client";
import SearchResultBox from "./SearchResultBox";

interface SearchResultListProps {
  data: User[];
  title: string;
}

const SearchResultList: React.FC<SearchResultListProps> = ({ data, title }) => {
  return (
    <div className="px-6 lg:pt-6">
      <h1 className="text-xl">
        <strong>{title}</strong>
        {`에 대한 검색결과 입니다.`}
      </h1>
      <div
        className="
        col-span-3
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
    "
      >
        <div className="mt-4">
          {/* {data 리스트 들이 들어옴} */}
          {data.map(item => (
            <SearchResultBox key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultList;
