import React, { useEffect, useState } from "react";
import LegendaryQuotes from "./legendary-quotes";

const Note = () => {
  const [meme, setMeme] = useState(null);
  const [mode, setMode] = useState("random"); // random | subreddit
  const [subreddit, setSubreddit] = useState("memes");
  const [loading, setLoading] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);

  const fetchMeme = async () => {
    setLoading(true);

    let url = "https://meme-api.com/gimme";

    if (mode === "subreddit" && subreddit) {
      url = `https://meme-api.com/gimme/${subreddit}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setMeme(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMeme();
  }, [mode]);

  return (
    <div className="h-[calc(100vh-14px)]">
      <div className="flex flex-col items-center bg-pink-200 p-6 overflow-y-auto">
        {/* Header */}
        <h1 className="font-bold text-pink-600 text-3xl text-center">
          Access Granted (Congrats, you sneaky genius)
        </h1>

        <p className="mb-4 text-gray-700">
          Welcome to the unofficial official employee hideout 😎 (Pink theme only)
        </p>

        <div className="flex gap-2 mb-8">
          <button
            className="mb-3 font-bold text-pink-600 underline"
            onClick={() => setShowQuotes(true)}
          >
            💬 Office Wisdom (iykyk)
          </button>
        </div>

        {!showQuotes ? (
          <>
            {/* 🎛 TOOLBAR */}
            <div className="flex flex-wrap gap-3 bg-white shadow-md mb-6 p-3 rounded-xl">
              {/* Mode selector */}
              <select
                className="p-2 border rounded"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="random">Random Meme</option>
                <option value="subreddit">Subreddit</option>
              </select>

              {/* Subreddit input */}
              {mode === "subreddit" && (
                <select
                  className="p-2 border rounded"
                  value={subreddit}
                  onChange={(e) => setSubreddit(e.target.value)}
                >
                  <option value="ProgrammerHumor">💻 Programming Humor</option>
                  <option value="codingmemes">👨‍💻 Coding Memes</option>

                  <option value="corporatememes">🏢 Corporate Memes</option>
                  <option value="workmemes">💼 Work Life Chaos</option>

                  <option value="dankmemes">😂 Dank Memes</option>
                  <option value="memes">🤣 General Memes</option>
                  <option value="dankmemesfromsite19">
                    🧪 Weird Dank Memes
                  </option>

                  <option value="PoliticalCompassMemes">
                    🌍 Geo Politics Memes
                  </option>
                  <option value="NonCredibleDefense">
                    🪖 Military Chaos Memes
                  </option>
                  <option value="HistoryMemes">📜 History Memes</option>

                  <option value="blackhumor">🕶 Dark Comedy</option>
                </select>
              )}

              {/* Refetch button */}
              <button
                onClick={fetchMeme}
                className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded text-white"
              >
                🔄 New Meme
              </button>
            </div>

            {/* 🖼 Meme Display */}
            <div className="bg-white shadow-lg rounded-xl w-full max-w-xl overflow-hidden">
              {loading ? (
                <p className="p-6 text-center">Loading meme...</p>
              ) : meme ? (
                <>
                  <img
                    src={meme.url}
                    alt={meme.title}
                    className="w-full object-cover"
                  />
                  <div className="p-4">
                    <h2 className="font-bold text-lg">{meme.title}</h2>
                    <p className="text-gray-500 text-sm">
                      r/{meme.subreddit} • 👍 {meme.ups}
                    </p>
                  </div>
                </>
              ) : null}
            </div>

            {/* Laughter Section */}
            <div className="mt-6 text-gray-700 text-center">
              😂 Refresh for infinite office sanity recovery
            </div>
          </>
        ) : (
          <LegendaryQuotes onBack={() => setShowQuotes(false)} />
        )}
      </div>
    </div>
  );
};

export default Note;
