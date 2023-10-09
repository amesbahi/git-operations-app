// This file defines the main GitOperationsHandler component which allows the user to input a Git repo URL and triggers the Git operations.

"use client";
import { useState } from "react";

const GitOperationsHandler = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  // Handles the Git operations triggered by the button click.
  const handleGitOperations = async () => {
    setIsProcessing(true);
    const response = await fetch("/api/git-operations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repoUrl }),
    });
    const data = await response.json();
    setIsProcessing(false);
    setMessage(data.message);
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="Enter Git repo URL"
          className="pl-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <button
          onClick={handleGitOperations}
          disabled={isProcessing}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          {isProcessing ? "Processing..." : "Submit"}
        </button>
      </div>
      {/* Displays the success or failure message of operations. */}
      {message && <div>{message}</div>}
    </div>
  );
};

export default GitOperationsHandler;
