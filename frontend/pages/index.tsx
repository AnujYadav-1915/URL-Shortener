import { useState } from 'react';

export default function Home() {
	const [url, setUrl] = useState('');
	const [shortUrl, setShortUrl] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setShortUrl('');
		try {
			const token = localStorage.getItem('token');
			const res = await fetch('http://localhost:4000/shorten', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...(token ? { Authorization: `Bearer ${token}` } : {}),
				},
				body: JSON.stringify({ url }),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || data.message || 'Failed to shorten URL');
			setShortUrl(data.shortId || data.short_id || '');
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="min-h-screen flex flex-col items-center justify-center px-4">
			<h1 className="text-4xl md:text-6xl font-extrabold neon mb-8 text-center">URL Shortener SaaS</h1>
			<form
				onSubmit={handleSubmit}
				className="card w-full max-w-xl flex flex-col gap-4 animate-fade-in"
				style={{ boxShadow: '0 0 32px #7f5fff55, 0 0 64px #00e6ff22' }}
			>
				<input
					type="url"
					required
					placeholder="Paste your long URL here..."
					className="rounded-lg px-4 py-3 text-lg bg-[#18162e] border border-[#7f5fff] focus:outline-none focus:ring-2 focus:ring-[#00e6ff] neon"
					value={url}
					onChange={e => setUrl(e.target.value)}
				/>
				<button
					type="submit"
					className="bg-gradient-to-r from-[#7f5fff] to-[#00e6ff] text-white font-bold py-3 rounded-lg shadow-md hover:scale-105 transition-transform neon"
					disabled={loading}
				>
					{loading ? 'Shortening...' : 'Shorten URL'}
				</button>
				{error && <div className="text-red-400 font-semibold">{error}</div>}
				{shortUrl && (
					<div className="mt-4 flex flex-col items-center">
						<span className="text-lg">Short URL:</span>
						<a
							href={shortUrl.startsWith('http') ? shortUrl : `/${shortUrl}`}
							target="_blank"
							rel="noopener noreferrer"
							className="text-2xl font-mono neon underline mt-2"
						>
							{shortUrl.startsWith('http') ? shortUrl : `${window.location.origin}/${shortUrl}`}
						</a>
					</div>
				)}
			</form>
			<p className="mt-10 text-[#7f5fff] opacity-70">Fast. Secure. Beautiful. <span className="neon">Neon Noir</span> style.</p>
		</main>
	);
}
