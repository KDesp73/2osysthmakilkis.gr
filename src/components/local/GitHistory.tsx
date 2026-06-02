"use client";

import { CommitHistoryItem } from "@/lib/GithubHelper";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import { getGitHistory } from "@/actions/admin/git";

export default function GitHistory() {
  const [history, setHistory] = useState<CommitHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(10);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const result = await getGitHistory("", count);
        if (!cancelled) {
          if (result.success && "commits" in result) {
            setHistory(result.commits);
          } else {
            setHistory([]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch git history", err);
        if (!cancelled) setHistory([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [count]);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Github className="h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold">Recent Git Commits</h2>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">Number of commits:</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value, 10) || 10)}
            className="border rounded px-2 py-1 w-16"
          />
        </div>
      </div>

      {loading ? (
        <p>Loading commits...</p>
      ) : history.length === 0 ? (
        <p>No recent commits found.</p>
      ) : (
        <ul className="space-y-3">
          {history.map((c) => (
            <li
              key={c.sha}
              className="border rounded p-3 hover:bg-gray-50 transition"
            >
              <a
                href={c.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                {c.message}
              </a>
              <p className="text-sm text-gray-500">
                {c.author.name} •{" "}
                {c.committer.date
                  ? new Date(c.committer.date).toLocaleString()
                  : ""}
              </p>
              <p className="text-xs text-gray-400 truncate">{c.sha}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
