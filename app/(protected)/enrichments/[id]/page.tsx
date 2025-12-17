"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPrompts } from "@/services/enrichments";
import { useState } from "react";

type SelectedPrompt = {
  title: string;
  subtitle?: string;
  content: string;
};

const Prompts = () => {
  const params = useParams();
  const flow_id = params?.id as string;

  const {
    data: prompts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["prompts", flow_id],
    queryFn: () => getPrompts({ flow_id }),
    enabled: !!flow_id,
    retry: false,
  });

  const [selected, setSelected] = useState<SelectedPrompt | null>(null);
  const [copied, setCopied] = useState(false);

  const hasAccountScoring = !!prompts?.account_scoring;
  const hasProfileScoring = !!prompts?.profile_scoring;
  const hasResearch = !!prompts?.research?.items?.length;
  const hasOutreach = !!prompts?.outreach_sequence;

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const format = (value: string) =>
    value
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  if (isLoading) return <div className="p-6">Loading prompts…</div>;
  if (error)
    return (
      <div className="p-6 text-red-600">Error: {(error as Error).message}</div>
    );

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 font-semibold text-gray-900 text-2xl">Prompts</h1>

        <div className="gap-6 grid grid-cols-12">
          {/* LEFT SIDEBAR */}
          <div className="col-span-4 bg-white border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b font-medium text-gray-900">
              Prompt Types
            </div>

            <div className="divide-y">
              {/* Account Scoring */}
              {hasAccountScoring && (
                <button
                  onClick={() =>
                    setSelected({
                      title: "Account Scoring",
                      subtitle: `ID: ${prompts.account_scoring.id}`,
                      content: prompts.account_scoring.prompt_text,
                    })
                  }
                  className="hover:bg-gray-50 px-4 py-3 w-full text-left"
                >
                  <p className="font-medium">Account Scoring</p>
                  <p className="text-gray-500 text-xs">Company-level scoring</p>
                </button>
              )}

              {/* Profile Scoring */}
              {hasProfileScoring && (
                <button
                  onClick={() =>
                    setSelected({
                      title: "Profile Scoring",
                      subtitle: `ID: ${prompts.profile_scoring.id}`,
                      content: prompts.profile_scoring.prompt_text,
                    })
                  }
                  className="hover:bg-gray-50 px-4 py-3 w-full text-left"
                >
                  <p className="font-medium">Profile Scoring</p>
                  <p className="text-gray-500 text-xs">Lead persona matching</p>
                </button>
              )}

              {/* Research */}
              {hasResearch && (
                <div>
                  <div className="px-4 py-2 font-semibold text-gray-500 text-xs uppercase">
                    Research Criteria
                  </div>

                  {prompts.research.items.map((item) => (
                    <button
                      key={item.criterion_id}
                      onClick={() =>
                        setSelected({
                          title: format(item.criterion_id),
                          subtitle: `Weight: ${item.weight}%`,
                          content: item.prompt_text,
                        })
                      }
                      className="hover:bg-gray-50 px-6 py-3 w-full text-left"
                    >
                      <p className="font-medium text-sm">
                        {format(item.criterion_id)}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Weight: {item.weight}%
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {/* Outreach Sequence (SHOW FOR NOW) */}
              {hasOutreach && (
                <button
                  onClick={() =>
                    setSelected({
                      title: "Outreach Sequence",
                      subtitle: `ID: ${prompts.outreach_sequence.id}`,
                      content: prompts.outreach_sequence.prompt_text,
                    })
                  }
                  className="hover:bg-gray-50 px-4 py-3 w-full text-left"
                >
                  <p className="font-medium">Outreach Sequence</p>
                  <p className="text-gray-500 text-xs">
                    Multi-step sales messaging
                  </p>
                </button>
              )}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col col-span-8 bg-white border rounded-lg">
            {!selected ? (
              <div className="flex flex-1 justify-center items-center text-gray-400">
                Select a prompt to view
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center px-6 py-4 border-b">
                  <div>
                    <h2 className="font-semibold text-gray-900 text-lg">
                      {selected.title}
                    </h2>
                    {selected.subtitle && (
                      <p className="text-gray-500 text-sm">
                        {selected.subtitle}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => copyToClipboard(selected.content)}
                    className="flex items-center gap-2 hover:bg-gray-50 px-3 py-1.5 border rounded-md text-sm"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>

                <div className="p-6 overflow-auto">
                  <pre className="font-mono text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {selected.content}
                  </pre>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompts;
