import React from 'react';
import { Globe } from 'lucide-react';
import { useAccessibilityStore } from '../../store/accessibilityStore';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';

export function UrlAnalyzer() {
  const { isLoading, error, auditUrl } = useAccessibilityStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get('url') as string;
    if (url) {
      await auditUrl(url);
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Globe className="w-6 h-6 text-light-accent dark:text-dark-accent" />
        <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
          Analyze Website
        </h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
              Website URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              className="input-primary"
              placeholder="https://example.com"
              required
              pattern="https?://.*"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Website'}
          </button>
        </div>
      </form>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}