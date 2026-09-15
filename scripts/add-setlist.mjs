import { readFile, writeFile, rename } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const dataFile = new URL("../data/setlists.json", import.meta.url);
const tempFile = new URL("../data/setlists.temp.json", import.meta.url);
const terminal = createInterface({ input: stdin, output: stdout });

async function required(question) {
    while (true) {
        const answer = (await terminal.question(question)).trim();
        if (answer) {
            return answer;
        }
        console.log("This field is required. Please enter a value.");
    }
}

async function askPlaylistUrl() {
    while (true) {
        const answer = await terminal.question("Spotify URL: ");
        try {
            const url = new URL(answer.trim());
            const match = url.pathname.match(/^\/(?:embed\/)?playlist\/([A-Za-z0-9]{22})\/?$/);
            if (url.protocol !== "https:" || url.hostname !== "open.spotify.com" || url.port ||
            url.username ||url.password || !match) {
                throw new Error("Invalid URL. Please enter a valid Spotify playlist URL.");
            }

            return `https://open.spotify.com/embed/playlist/${match[1]}`;
        } catch {
            console.log("Paste a full Spotify playlist link, such as " +
            "https://open.spotify.com/playlist/ followed by its playlist ID.");
        };
    }
}

async function askDate() {
  const today = new Date();
  const defaultDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  while (true) {
    const answer = (
      await terminal.question(`Episode date [${defaultDate}] (YYYY-MM-DD): `)
    ).trim() || defaultDate;

    if (/^\d{4}-\d{2}-\d{2}$/.test(answer)) {
      const date = new Date(`${answer}T12:00:00Z`);

      if (
        !Number.isNaN(date.getTime()) &&
        date.toISOString().slice(0, 10) === answer
      ) {
        return new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        }).format(date);
      }
    }

    console.log("Enter a real date in YYYY-MM-DD format.");
  }
}


async function main() {
  const original = await readFile(dataFile, "utf8");
  const existing = JSON.parse(original);
  const fields = ["date", "title", "description", "spotifyEmbedUrl"];

  if (
    !Array.isArray(existing) ||
    !existing.every(
      (entry) =>
        entry &&
        fields.every(
          (field) =>
            typeof entry[field] === "string" && entry[field].trim()
        )
    )
  ) {
    throw new Error("The existing setlists.json has an unexpected structure.");
  }

  console.log("\nAdd a new astilbe setlist\n");

  const title = await required("Episode title: ");
  const description = await required("Description: ");
  const spotifyEmbedUrl = await askPlaylistUrl();
  const date = await askDate();

  if (existing.some((entry) => entry.title === title)) {
    throw new Error("That episode title already exists. Use a unique title.");
  }

  const updated = [
    { date, title, description, spotifyEmbedUrl },
    ...existing,
  ].slice(0, 3);

  console.log("\nThe homepage will show:\n");

  updated.forEach((entry, index) => {
    console.log(`${index + 1}. ${entry.title} — ${entry.date}`);
  });

  console.log(`\nNew description: ${description}`);
  console.log(`Playlist: ${spotifyEmbedUrl}`);

  const removed = existing.slice(2);

  if (removed.length) {
    console.log(
      `\nRemoved from the list: ${removed.map((entry) => entry.title).join(", ")}`
    );
  }

  const confirmation = (
    await terminal.question("\nSave this update? [y/N]: ")
  ).trim().toLowerCase();

  if (confirmation !== "y" && confirmation !== "yes") {
    console.log("Cancelled. No files changed.");
    return;
  }

  // Avoid overwriting edits made while the prompts were open.
  if ((await readFile(dataFile, "utf8")) !== original) {
    throw new Error("The data file changed during entry. Run the command again.");
  }

  // Prepare the full file before replacing the current version.
  await writeFile(tempFile, JSON.stringify(updated, null, 2) + "\n", {
    flag: "wx",
  });
  await rename(tempFile, dataFile);

  console.log("\nSaved data/setlists.json.");
  console.log("Review with git diff, then build, commit, and push when ready.");
}

try {
  await main();
} catch (error) {
  console.error(
    `\nCould not update setlists: ${
      error instanceof Error ? error.message : String(error)
    }`
  );
  process.exitCode = 1;
} finally {
  terminal.close();
}