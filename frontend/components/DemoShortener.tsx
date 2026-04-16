import { useState } from 'react';

export default function DemoShortener() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    setLoading(true);
    setShortUrl('');
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (res.ok) setShortUrl(`${window.location.origin}/${data.shortId}`);
      else alert('Error: ' + data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl card flex flex-col gap-4 mx-auto">
      <input
        placeholder="Paste your long link here"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="text-black px-2 py-1 rounded"
      />
      <button onClick={handleShorten} disabled={loading} className="bg-gradient-to-r from-purple-500 to-blue-500 neon px-4 py-2 rounded text-white">
        {loading ? 'Shortening...' : 'Shorten URL'}
      </button>
      {shortUrl && (
        <div className="mt-2 text-center">
          <span className="font-semibold">Short URL: </span>
          <a href={shortUrl} className="underline text-cyan-400" target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </div>
      )}
    </div>
  );
}
