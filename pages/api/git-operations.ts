// This file executes git operations on a remote repository

import { exec as execCb } from "child_process";
import { NextApiRequest, NextApiResponse } from "next";
import { promisify } from "util";

const exec = promisify(execCb);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { repoUrl } = req.body;

  // Validate the repoUrl (basic example, consider a more robust validation)
  if (!repoUrl) {
    res.status(400).json({ message: "Enter a valid repo URL." });
    return;
  }

  try {
    // Initiate the git operations
    await exec(`git clone ${repoUrl} cloned-repo`);
    process.chdir("cloned-repo");
    await exec(`echo "This is a test." >> test.txt`);
    await exec(`git add .`);
    await exec(`git commit -m "Add test file"`);
    await exec(`git push`);

    res.status(200).json({ message: "Git operations completed successfully." });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Error: ${error.message}` });
    } else {
      // Handle other types of errors or rethrow
      throw error;
    }
  }
};
