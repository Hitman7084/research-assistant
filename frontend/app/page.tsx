'use client';

import { useState } from 'react';
import { fetchDigest } from '@/services/api';
import { DigestResponse, Category, CategoryOption } from '@/types';

const CATEGORIES: CategoryOption[] = [
  { value: 'cs.AI', label: 'Artificial Intelligence' },
  { value: 'cs.LG', label: 'Machine Learning' },
  { value: 'cs.CL', label: 'Computation and Language' },
  { value: 'cs.CV', label: 'Computer Vision' },
  { value: 'cs.NE', label: 'Neural and Evolutionary Computing' },
  { value: 'cs.RO', label: 'Robotics' },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('cs.AI');
  const [digest, setDigest] = useState<DigestResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchDigest(selectedCategory);
      setDigest(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
        <header className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            AI Research Assistant
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-6 sm:leading-7">
            Generate research digests from arXiv. Select a category and get a summary of recent papers.
          </p>
        </header>

        <div className="space-y-4 sm:space-y-5">
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-slate-700">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg bg-white text-slate-900 text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:border-slate-900 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full px-4 sm:px-6 py-3 sm:py-3.5 bg-slate-900 text-white text-sm sm:text-base rounded-lg font-medium hover:bg-slate-800 active:bg-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Generating...' : 'Generate Digest'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 rounded-lg p-4 sm:p-5">
            <p className="text-sm text-red-800 leading-6">{error}</p>
          </div>
        )}

        {digest && (
          <div className="space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-4">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                Research Digest
              </h2>
              <span className="text-xs text-slate-500">
                {new Date(digest.generated_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            <article className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 border border-slate-200">
              <div className="whitespace-pre-wrap text-slate-700 text-base sm:text-lg leading-relaxed sm:leading-8">
                {digest.summary}
              </div>
            </article>

            <div className="text-xs text-slate-500">
              {digest.category}
            </div>
          </div>
        )}

        {!digest && !error && !loading && (
          <div className="bg-white rounded-lg py-12 sm:py-16 px-6 sm:px-8 text-center border border-slate-200">
            <p className="text-sm sm:text-base text-slate-500 leading-6 sm:leading-7">
              Select a category and generate a digest to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
