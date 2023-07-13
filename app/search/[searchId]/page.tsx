import getSearchResult from "@/app/actions/getSearchResult";
import EmptyState from "@/app/components/EmptyState";
import SearchResultList from "./components/SearchResultList";

interface Iparams {
  searchId: string;
}

const SearchId = async ({ params }: { params: Iparams }) => {
  const decodedSearchText = decodeURIComponent(params.searchId);
  const searchResult = await getSearchResult(decodedSearchText);

  if (!searchResult || searchResult?.length <= 0) {
    return (
      <div className="h-full lg:pl-80">
        <div className="flex h-full flex-col">
          <EmptyState title="일치하는 서비스 센터가 없습니다. 다시 검색해 주세요!" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full lg:pl-80">
      <SearchResultList data={searchResult} title={decodedSearchText} />
    </div>
  );
};

export default SearchId;
