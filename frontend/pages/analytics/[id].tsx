import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, Legend } from 'recharts';

export default function Analytics() {
  const [data, setData] = useState<any>({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    fetch(`/api/analytics/${id}`)
      .then(res => res.json())
      .then(setData);
  }, [id]);

  const clickTrends = data.analytics?.map((a: any) => ({
    date: new Date(a.timestamp).toLocaleDateString(),
    clicks: 1,
  })) || [];
  const deviceData = [
    { name: 'Mobile', value: data.analytics?.filter((a: any) => a.device === 'mobile').length || 0 },
    { name: 'Desktop', value: data.analytics?.filter((a: any) => a.device === 'desktop').length || 0 },
  ];
  const countryData = Object.entries(
    data.analytics?.reduce((acc: any, a: any) => {
      acc[a.country] = (acc[a.country] || 0) + 1;
      return acc;
    }, {}) || {}
  ).map(([name, value]) => ({ name, value }));

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold neon mb-6">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="font-bold mb-2">Click Trends</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={clickTrends}>
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="clicks" stroke="#7f5fff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h2 className="font-bold mb-2">Device Breakdown</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label>
                <Cell key="mobile" fill="#00e6ff" />
                <Cell key="desktop" fill="#7f5fff" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card md:col-span-2">
          <h2 className="font-bold mb-2">Location Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={countryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#7f5fff" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}
