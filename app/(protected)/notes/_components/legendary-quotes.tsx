import { useState } from "react";

const philosopherQuotes = [
  "I think there's some nuances here...",
  "I am not following...",
  "No no no, let me pull out the document.",
  "Actually, I'm having classes tomorrow ..",
  "Is there anything else to discuss",
  "Will get back to you",
  "Good good",
  "Kam toh infinite hai",
];

const visionaryQuotes = [
  "claude skills banado",
  "just see how heyreach does that",
  "user ka socho yaar, taki use kar k majha a jaye",
  "baki log kaise kar par rhe h",
  "'A' could you give a demo on friday",
];

const QuoteCard = ({
  quote,
  accentColor,
}: {
  quote: string;
  accentColor: string;
}) => (
  <div className="flex items-start gap-2 bg-white shadow-sm mb-2 px-4 py-3 border border-gray-100 rounded-lg">
    <span
      className="flex-shrink-0 mt-1 text-xl leading-none"
      style={{ color: accentColor }}
    >
      "
    </span>
    <span className="text-gray-700 text-sm leading-relaxed">{quote}</span>
  </div>
);

const PASSWORD = "topsecret";

const LegendaryQuotes = ({ onBack }: { onBack: () => void }) => {
  const [input, setInput] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleSubmit = () => {
    if (input === PASSWORD) {
      setIsAuthorized(true);
    } else {
      alert("Wrong password, majdoor ❌");
    }
  };

  // 🔒 Gate screen before main UI
  if (!isAuthorized) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 h-[60vh]">
        <label className="font-medium text-gray-700 text-sm">
          Are you a majdoor? If yes, type the password
        </label>

        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-3 py-2 border rounded-lg w-64 text-sm"
          placeholder="Enter password"
        />

        <button
          onClick={handleSubmit}
          className="bg-black px-4 py-2 rounded-lg text-white text-sm"
        >
          Submit
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Philosopher Section */}
      <div className="flex gap-3">
        <div className="mb-5 p-5 rounded-2xl" style={{ background: "#EAF3DE" }}>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex flex-shrink-0 justify-center items-center rounded-full w-10 h-10 text-xl"
              style={{ background: "#C0DD97" }}
            >
              🧑‍💼
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm" style={{ color: "#27500A" }}>
                The Philosopher
              </div>
              <div className="text-xs" style={{ color: "#3B6D11" }}>
                Deep thoughts, unclear direction
              </div>
            </div>
            <span
              className="px-3 py-1 rounded-full font-medium text-xs"
              style={{ background: "#C0DD97", color: "#27500A" }}
            >
              State Sarkar
            </span>
          </div>

          {philosopherQuotes.map((q, i) => (
            <QuoteCard key={i} quote={q} accentColor="#639922" />
          ))}
        </div>

        {/* Visionary Section */}
        <div className="mb-5 p-5 rounded-2xl" style={{ background: "#EEEDFE" }}>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex flex-shrink-0 justify-center items-center rounded-full w-10 h-10 text-xl"
              style={{ background: "#CECBF6" }}
            >
              🧑‍💻
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm" style={{ color: "#26215C" }}>
                The Visionary
              </div>
              <div className="text-xs" style={{ color: "#534AB7" }}>
                Big ideas, loose timelines
              </div>
            </div>
            <span
              className="px-3 py-1 rounded-full font-medium text-xs"
              style={{ background: "#CECBF6", color: "#26215C" }}
            >
              Sarkar
            </span>
          </div>

          {visionaryQuotes.map((q, i) => (
            <QuoteCard key={i} quote={q} accentColor="#7F77DD" />
          ))}
        </div>
      </div>

      <button
        onClick={onBack}
        className="py-2.5 rounded-xl w-full font-medium text-white text-sm transition-colors"
        style={{ background: "#D4537E" }}
      >
        ⬅ Back to Memes
      </button>
    </div>
  );
};

export default LegendaryQuotes;
