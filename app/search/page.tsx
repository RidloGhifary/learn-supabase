import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0;

export default async function SearchPage({ searchParams }: SearchProps) {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <Header>
        <div className="mb-2 space-y-6">
          <h1 className="text-3xl font-semibold text-white">
            Search {`${searchParams.title}`}
          </h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
}
