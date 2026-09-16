import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { CSVLink } from 'react-csv';
import Head from 'next/head';
import { Award, Download, Users, CheckCircle2, Eye, EyeOff } from 'lucide-react';

export default function AdminScores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'IoTr4ck@dm1n27399') {
      setIsAuthenticated(true);
      fetchScores();
    } else {
      alert('Incorrect password');
      setPassword('');
    }
  };

  async function fetchScores() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('student_scores')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setScores(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const csvHeaders = [
    { label: "Student Name", key: "student_name" },
    { label: "Total Score", key: "total_score" },
    { label: "Max Score", key: "max_score" },
    { label: "Date Submitted", key: "submitted_at" }
  ];

  const csvData = scores.map(row => ({
    student_name: row.student_name,
    total_score: row.total_score,
    max_score: row.max_score,
    submitted_at: new Date(row.submitted_at).toLocaleString()
  }));

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
        <Head>
          <title>Admin Login | IoTrack</title>
        </Head>
        <div className="glass p-8 rounded-2xl max-w-md w-full border border-border shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-brand" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Admin Access</h1>
          <p className="text-muted-foreground text-center mb-8">Enter the password to view student scores.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand text-foreground"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-brand hover:bg-brand/90 text-brand-foreground py-3 rounded-xl font-bold transition-colors shadow-glow"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Error loading data</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <Head>
        <title>Admin Dashboard | IoTrack</title>
      </Head>

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-border pb-8">
          <div>
            <h1 className="text-4xl font-extrabold font-display flex items-center gap-3">
              <Award className="w-10 h-10 text-brand" />
              Student Scores
            </h1>
            <p className="text-muted-foreground mt-2">View and export all submitted module scores.</p>
          </div>
          
          <CSVLink
            data={csvData}
            headers={csvHeaders}
            filename={`iotrack_scores_${new Date().toISOString().split('T')[0]}.csv`}
            className="flex items-center gap-2 bg-brand hover:bg-brand/90 text-brand-foreground px-6 py-3 rounded-xl font-bold transition-colors shadow-soft"
          >
            <Download className="w-5 h-5" />
            Export to CSV
          </CSVLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-xl p-6 border border-border flex items-center gap-4">
            <div className="p-4 bg-brand/10 rounded-lg text-brand">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Total Submissions</p>
              <p className="text-3xl font-bold">{scores.length}</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl overflow-hidden border border-border shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="p-4 font-semibold text-sm uppercase tracking-wider">Student Name</th>
                  <th className="p-4 font-semibold text-sm uppercase tracking-wider">Score</th>
                  <th className="p-4 font-semibold text-sm uppercase tracking-wider">Modules Detail</th>
                  <th className="p-4 font-semibold text-sm uppercase tracking-wider">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {scores.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-muted-foreground">
                      No scores submitted yet.
                    </td>
                  </tr>
                ) : (
                  scores.map((row) => (
                    <tr key={row.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{row.student_name}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">{row.total_score}</span>
                          <span className="text-muted-foreground">/ {row.max_score}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-muted-foreground">
                          {Object.keys(row.module_scores || {}).map(mod => (
                            <span key={mod} className="inline-block bg-background border border-border rounded px-2 py-1 mr-2 mb-1">
                              {mod.toUpperCase()}: {row.module_scores[mod].score}/{row.module_scores[mod].total}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(row.submitted_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
