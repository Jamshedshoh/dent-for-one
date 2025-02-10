import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  query: string;
  onSearch: (query: string) => void;
}

export const Search = ({ query, onSearch }: SearchProps) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search ..."
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}; 