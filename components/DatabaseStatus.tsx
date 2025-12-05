'use client';

import { useState, useEffect } from 'react';
import { FaDatabase, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

interface DatabaseStatus {
  message: string;
  database: string;
  timestamp: string;
}

interface DatabaseInfo {
  database: string;
  collections: string[];
  stats: {
    collections: number;
    objects: number;
    dataSize: number;
    storageSize: number;
  };
}

export default function DatabaseStatus() {
  const [status, setStatus] = useState<DatabaseStatus | null>(null);
  const [info, setInfo] = useState<DatabaseInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusRes, infoRes] = await Promise.all([
          fetch('/api/health'),
          fetch('/api/db-info'),
        ]);

        if (statusRes.ok) {
          setStatus(await statusRes.json());
        }

        if (infoRes.ok) {
          setInfo(await infoRes.json());
        }
      } catch (error) {
        console.error('Failed to fetch database info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-100 rounded-lg p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-3 mb-4">
        <FaDatabase className="text-blue-600 text-xl" />
        <h3 className="text-lg font-semibold text-gray-900">Database Status</h3>
        {status?.database === 'connected' ? (
          <FaCheckCircle className="text-green-500" title="Connected" />
        ) : (
          <FaExclamationTriangle className="text-yellow-500" title="Disconnected" />
        )}
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600">Status</p>
          <p className="font-medium">
            <span
              className={`inline-block w-3 h-3 rounded-full mr-2 ${
                status?.database === 'connected' ? 'bg-green-500' : 'bg-red-500'
              }`}
            ></span>
            {status?.database || 'Unknown'}
          </p>
        </div>

        {info && (
          <>
            <div>
              <p className="text-sm text-gray-600">Database</p>
              <p className="font-medium">{info.database}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Collections</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {info.collections.map((collection) => (
                  <span
                    key={collection}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {collection}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t">
              <div>
                <p className="text-sm text-gray-600">Total Documents</p>
                <p className="font-medium text-lg">{info.stats.objects.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Storage Used</p>
                <p className="font-medium text-lg">
                  {(info.stats.storageSize / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </>
        )}

        {status?.timestamp && (
          <div className="pt-3 border-t">
            <p className="text-xs text-gray-500">
              Last checked: {new Date(status.timestamp).toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}