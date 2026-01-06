// src/pages/CategoryPage.jsx
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { category } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{category} Products</h1>
      <p className="text-gray-600">Products in {category} category will be shown here.</p>
    </div>
  );
};
export default CategoryPage;