import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'
import 'tailwindcss/tailwind.css'

// export * as SwipeBar from '@/components/swipebar'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ヘッダー */}
    <header aria-label="Page Header" className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              タスク管理
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              タスクを管理して業務を効率化しよう 🎉
            </p>
          </div>
        </div>
      </div>
    </header>
    {/* ヘッダーend */}
    <div className="mt-10 m-auto max-w-2xl">
      <App />
    </div>
    <footer
      aria-label="Site Footer"
      className="bg-white text-center dark:bg-gray-900"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="mx-auto max-w-lg text-xs text-gray-500 dark:text-gray-400">
            <span className="mt-4 block"> &copy; 2022 Todo List </span>
          </p>
        </div>
      </div>
    </footer>
  </React.StrictMode>,
)
