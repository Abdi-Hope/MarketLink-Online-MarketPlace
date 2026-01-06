// src/pages/SearchPage.jsx
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for: "{query}"
      </h1>
      <p className="text-gray-600">Search results will be shown here.</p>
    </div>
  );
};
export default SearchPage;