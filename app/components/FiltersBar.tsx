'use client';

interface FiltersBarProps {
  name: string;
  onChange: (payload: { name: string }) => void;
  onClear: () => void;
}

export function FiltersBar({ name, onChange, onClear }: FiltersBarProps) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg mb-6 shadow-md">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        {/* 🔎 Búsqueda */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-1">Buscar</label>
          <input
            value={name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Nombre del Digimon..."
            className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        {/* 🔹 Botón limpiar */}
        <div>
          <button
            onClick={onClear}
            className="px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600 
                       transition-colors duration-200"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
}
