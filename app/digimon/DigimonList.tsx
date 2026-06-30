'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { DigimonCard } from '../components/DigimonCard';
import { FiltersBar } from '../components/FiltersBar';
import { FetchOpts, Digimon } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => void>(fn: T, wait = 300) {
  let t: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

export default function DigimonList() {
  const [page, setPage] = useState(1);
  const [digimons, setDigimons] = useState<Digimon[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const [name, setName] = useState('');

  const PAGE_SIZE = 12;

  const fetchDigimons = useCallback(
    async (opts?: FetchOpts) => {
      setLoading(true);
      try {
        const uiPage = opts?.page ?? page;
        const apiPage = Math.max(0, uiPage - 1);

        const params = new URLSearchParams();
        params.set('page', String(apiPage));
        params.set('pageSize', String(PAGE_SIZE));
        if (opts?.name) params.set('name', opts.name);

        const url = `https://digi-api.com/api/v1/digimon?${params.toString()}`;
        const res = await fetch(url);
        const data = await res.json();

        let list: Digimon[] = [];
        let uiTotalPages: number | null = null;

        if (Array.isArray(data)) {
          list = data;
          uiTotalPages = null;
        } else if (data?.content) {
          list = data.content;

          const totalElements = data.pageable?.totalElements ?? data.totalElements ?? null;
          const apiTotalIndex = data.pageable?.totalPages ?? data.totalPages ?? null;

          if (typeof totalElements === 'number') {
            uiTotalPages = Math.max(1, Math.ceil(totalElements / PAGE_SIZE));
          } else if (typeof apiTotalIndex === 'number') {
            uiTotalPages = apiTotalIndex + 1;
          } else {
            uiTotalPages = null;
          }
        } else {
          const fallbackRes = await fetch(
            `https://digi-api.com/api/v1/digimon?page=${apiPage}&pageSize=${PAGE_SIZE}`,
          );
          const fallbackData = await fallbackRes.json();
          list = fallbackData?.content ?? fallbackData ?? [];

          const totalElements =
            fallbackData?.pageable?.totalElements ?? fallbackData?.totalElements ?? null;
          const apiTotalIndex =
            fallbackData?.pageable?.totalPages ?? fallbackData?.totalPages ?? null;

          if (typeof totalElements === 'number') {
            uiTotalPages = Math.max(1, Math.ceil(totalElements / PAGE_SIZE));
          } else if (typeof apiTotalIndex === 'number') {
            uiTotalPages = apiTotalIndex + 1;
          } else {
            uiTotalPages = null;
          }
        }

        setTotalPages(uiTotalPages);

        const filtered = list.filter((d: Digimon) =>
          opts?.name ? d.name.toLowerCase().includes(opts.name.toLowerCase()) : true,
        );

        setDigimons(filtered);
      } catch (err) {
        console.error('Error fetching digimons', err);
        setDigimons([]);
        setTotalPages(null);
      } finally {
        setLoading(false);
      }
    },
    [page],
  );

  const debouncedFetch = useMemo(
    () => debounce((payload: FetchOpts) => fetchDigimons(payload), 350),
    [fetchDigimons],
  );

  useEffect(() => {
    debouncedFetch({ page, name });
  }, [page, name, debouncedFetch]);

  const handleFiltersChange = (payload: { name: string }) => {
    setName(payload.name);
    setPage(1);
  };

  const handleClear = () => {
    setName('');
    setPage(1);
  };

  const goPrev = () => setPage((p) => Math.max(p - 1, 1));
  const goNext = () =>
    setPage((p) => {
      if (totalPages) return Math.min(p + 1, totalPages);
      return p + 1;
    });

  const nextDisabled = totalPages ? page >= totalPages : false;

  return (
    <div>
      <FiltersBar name={name} onChange={handleFiltersChange} onClear={handleClear} />

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-56 bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {digimons.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
              No digimons found.
            </p>
          ) : (
            digimons.map((d) => <DigimonCard key={d.id} digimon={d} />)
          )}
        </div>
      )}

      {!loading && digimons.length > 0 && (
        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {digimons.length} results per page
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={goPrev}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 
             hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              disabled={page === 1}
            >
              Previous
            </button>

            <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
              Page {page}
              {totalPages ? ` of ${totalPages}` : ''}
            </span>

            <button
              onClick={goNext}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 
             hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              disabled={nextDisabled}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
