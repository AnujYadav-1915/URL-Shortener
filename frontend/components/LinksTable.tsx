import { useState } from 'react';
import { toast } from 'sonner';

export default function LinksTable({ links }: { links: any[] }) {
  const [copied, setCopied] = useState<string | null>(null);
  return (
    <table className="w-full bg-white dark:bg-neutral-950 rounded-2xl shadow-lg overflow-hidden">
      <thead>
        <tr className="bg-neutral-100 dark:bg-neutral-900">
          <th className="p-4 text-left">Short URL</th>
          <th className="p-4 text-left">Original URL</th>
          <th className="p-4">Clicks</th>
          <th className="p-4">QR</th>
          <th className="p-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {links.map((l, i) => (
          <tr key={i} className="border-b border-neutral-100 dark:border-neutral-800">
            <td className="p-4 font-mono">{l.short_id}</td>
            <td className="p-4 truncate max-w-xs">{l.url}</td>
            <td className="p-4 text-center">{l.click_count}</td>
            <td className="p-4 text-center"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=40x40&data=${encodeURIComponent(l.url)}`} alt="QR" /></td>
            <td className="p-4 flex gap-2 justify-center">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => {
                  navigator.clipboard.writeText(l.short_id);
                  setCopied(l.short_id);
                  toast.success("Copied to clipboard!");
                }}
              >
                Copy
              </button>
              <button className="bg-gray-100 dark:bg-neutral-800 px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-neutral-700">Edit</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
