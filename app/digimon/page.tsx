import DigimonList from './DigimonList';

export default function DigimonPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">List of Digimon</h1>
      <DigimonList />
    </main>
  );
}
