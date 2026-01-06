export default function Test() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Tailwind Test</h1>
        <p className="text-gray-700 mb-4">
          If you see this with proper styling, Tailwind is working!
        </p>
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
          <div className="h-4 bg-gradient-to-r from-green-500 to-teal-500 rounded"></div>
          <div className="h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded"></div>
        </div>
        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Test Button
        </button>
      </div>
    </div>
  );
}