"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

const SearchForm = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      router.push(`/search/${keyword}`, { replace: false });
    }, 500);
  }, [keyword, router]);

  return (
    <>
      <input
        id="searchName"
        type="text"
        onChange={e => handleChange(e)}
        className="
            form-input
            block
            w-full
            rounded-md
            border-0
            py-1.5
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:bg-white
            focus:ring-2
            focus:ring-orange-400
            sm:text-sm
            sm:leading-6
        "
        placeholder="서비스센터 이름을 검색해 주세요"
      />
    </>
  );
};

export default SearchForm;
