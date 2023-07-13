import EmptyState from "../components/EmptyState";
import SearchForm from "./components/SearchForm";

const Search = () => {
  return (
    <div className="hidden h-full lg:block lg:pl-80">
      <EmptyState title="검색 결과가 없습니다 검색을 해주세요!" />
    </div>
  );
};

export default Search;
