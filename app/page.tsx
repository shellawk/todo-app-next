import TodoList from '@/components/TodoList';
import DatabaseStatus from '@/components/DatabaseStatus';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
        <p className="text-gray-600 mt-2">
          A full-stack todo application built with Next.js 14, TypeScript, and MongoDB
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <TodoList />
        </div>
        <div className="lg:col-span-1">
          <DatabaseStatus />
          
          <div className="mt-6 bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">API Endpoints:</span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Framework:</span>
                <span className="font-medium">Next.js 14</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Database:</span>
                <span className="font-medium">MongoDB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Deployment:</span>
                <span className="font-medium">Vercel Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 pt-6 border-t text-center text-gray-500 text-sm">
        <p>
          Built with Next.js 14 App Router • TypeScript • Tailwind CSS • MongoDB
        </p>
        <p className="mt-1">
          API Routes: /api/todos • /api/health • /api/db-info
        </p>
      </footer>
    </div>
  );
}