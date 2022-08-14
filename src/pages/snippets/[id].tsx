import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { snippetRouter } from "../../server/router/snippet";
import { trpc } from "../../utils/trpc";

const SnippetPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const snippet = trpc.useQuery(["snippet.getSnippet", { id }]);

  const handleCopyToClipboard = async () => {
    if (!snippet.data) return;
    navigator.clipboard.writeText(snippet.data.text);
  };

  return (
    <>
      <div className="container mx-auto flex justify-center flex-col max-w-md">
        <h1 className="bold text-4xl text-center mb-6 mt-6">
          Your snippet of {id}
        </h1>
        <textarea
          disabled
          className="w-full h-48 mx-auto mb-4 p-2"
          value={snippet.data?.text}
        ></textarea>
        <button
          className="bg-indigo-700 p-2 text-white hover:bg-indigo-800 rounded-sm disabled:opacity-30"
          onClick={handleCopyToClipboard}
        >
          Copy to Clipboard
        </button>
      </div>
    </>
  );
};

export default SnippetPage;
