import React, { useState } from "react";
import axios from "axios";
import { Loader2, Github, Star, GitBranch, Globe } from "lucide-react";

export default function GithubFinder() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "https://api.github.com/users/";

  // 🔍 Fetch user + repos
  const getUser = async (username) => {
    try {
      setLoading(true);
      setError("");
      setUser(null);
      setRepos([]);

      const userRes = await axios.get(`${API_URL}${username}`);
      setUser(userRes.data);

      const repoRes = await axios.get(`${API_URL}${username}/repos?sort=updated`);
      setRepos(repoRes.data.slice(0, 5));
    } catch (err) {
      setError("User not found");
    } finally {
      setLoading(false);
    }
  };

  // Search handlers
  const handleSearch = () => {
    if (username.trim()) getUser(username.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter GitHub username..."
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition"
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-primary w-8 h-8" />
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Profile */}
      {user && (
        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow text-center">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-24 h-24 rounded-full mx-auto border-4 border-primary/20"
          />
          <h2 className="text-xl font-semibold mt-3">
            {user.name || user.login}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.bio || "No bio available"}
          </p>
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="flex justify-center items-center gap-1 text-primary mt-3 hover:underline"
          >
            <Github className="w-5 h-5" /> View Profile
          </a>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-5 text-sm">
            <div>
              <strong>{user.public_repos}</strong>
              <br />Repos
            </div>
            <div>
              <strong>{user.followers}</strong>
              <br />Followers
            </div>
            <div>
              <strong>{user.following}</strong>
              <br />Following
            </div>
          </div>

          {/* Repositories */}
          {repos.length > 0 && (
            <div className="mt-8 text-left">
              <h3 className="text-lg font-semibold mb-3 text-center">
                Latest Repositories
              </h3>
              <div className="space-y-3">
                {repos.map((repo) => (
                  <div
                    key={repo.id}
                    className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-primary hover:underline flex items-center gap-1"
                      >
                        <Globe className="w-4 h-4" />
                        {repo.name}
                      </a>
                      <div className="flex gap-4 text-gray-600 dark:text-gray-300 text-sm">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitBranch className="w-4 h-4" /> {repo.forks_count}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {repo.description || "No description available"}
                    </p>
                    {repo.language && (
                      <div className="mt-1 text-xs text-primary">
                        {repo.language}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
