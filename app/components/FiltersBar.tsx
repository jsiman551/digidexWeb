'use client';

interface FiltersBarProps {
  name: string;
  onChange: (payload: { name: string }) => void;
  onClear: () => void;
}

export function FiltersBar({ name, onChange, onClear }: FiltersBarProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg mb-6 shadow-md">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Search
          </label>
          <input
            value={name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Digimon name..."
            className="w-full px-3 py-2 rounded bg-gray-50 dark:bg-gray-800 
                       text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        <div>
          <button
            onClick={onClear}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                       rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
