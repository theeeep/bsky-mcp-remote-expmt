# BlueSky MCP Agent

This project implements a Model Context Protocol (MCP) Agent designed to interact with the BlueSky decentralized social network. Built as a Cloudflare Worker, it leverages Durable Objects for stateful operations and provides a robust, scalable backend for custom BlueSky functionalities.

## Features

*   **Model Context Protocol (MCP) Integration:** Connects to the MCP ecosystem to offer defined tools and functionalities.
*   **Cloudflare Worker:** Deploys as a serverless function on Cloudflare's edge network for high performance and global availability.
*   **Cloudflare Durable Objects:** Utilizes Durable Objects (`BlueSkyMCP`) for consistent storage and coordination of state across requests.
*   **Extensible Tooling:** Currently includes an `add` tool for basic arithmetic, demonstrating how to extend its capabilities.
*   **BlueSky Interaction (Planned/Potential):** Designed to facilitate interactions with BlueSky, potentially for automated posting, data processing, or custom agent behaviors.

## Technologies Used

*   **Cloudflare Workers:** Serverless platform.
*   **Cloudflare Durable Objects:** Stateful serverless primitives.
*   **TypeScript:** For type-safe development.
*   **Hono:** A small, fast, and modern web framework for Workers.
*   **`@modelcontextprotocol/sdk`:** The SDK for building MCP agents.
*   **`zod`:** For schema validation.
*   **Wrangler CLI:** Cloudflare's command-line tool for developing and deploying Workers.

## Setup and Installation

To get this project up and running locally or deploy it to Cloudflare, follow these steps:

### Prerequisites

Ensure you have the following installed:

*   [Node.js](https://nodejs.org/en/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) or [Bun](https://bun.sh/) (Bun is used in this project's configuration, e.g., `bun.lock`)
*   [Cloudflare Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install/) (`npm install -g wrangler`)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd bsky-mcp-server-expmt # Adjust if your folder name is different
```

### 2. Install Dependencies

If using Bun (recommended, given `bun.lock`):

```bash
bun install
```

Or with npm:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.dev.vars` file in the root of your project to store local environment variables. These variables are crucial for the `searchPosts` tool to authenticate with BlueSky during local development.

Example `.dev.vars`:

```
BLUESKY_IDENTIFIERS=@yourhandle.bsky.social
BLUESKY_PASSWORD=your_app_password
```

**Note:** Never commit `app_password` or sensitive credentials directly to version control. For production, use Cloudflare Workers Secrets for these variables.

### 4. Update Cloudflare Worker Types

After making changes to `wrangler.jsonc` (e.g., adding Durable Object bindings or environment variables), you should regenerate the TypeScript types for your Worker's environment:

```bash
wrangler types
```

This command generates `worker-configuration.d.ts`, which helps TypeScript understand the available `env` bindings.

### 5. Run Locally

To test your Worker locally:

```bash
wrangler dev
```

This will start a development server, usually accessible at `http://localhost:8787`.

### 6. Deploy to Cloudflare

Before deploying, ensure you are logged into Cloudflare Wrangler:

```bash
wrangler login
```

Then, deploy your Worker:

```bash
wrangler deploy
```

This will deploy your Worker to Cloudflare's global network.

## Usage

Once deployed or running locally, your MCP Agent will be accessible. You can interact with it based on the defined MCP tools. The primary interaction point is the `/mcp` endpoint.

### Interacting with `mcp-inspector`

To easily interact with and test your MCP Agent, you can use the `mcp-inspector` tool that is included as a script in `package.json`.

First, ensure your Worker is running locally (e.g., via `wrangler dev`). Then, in a separate terminal:

```bash
bun inspector
# or if using npm:
npm run inspector
```

This will launch the `mcp-inspector` UI, typically in your browser, allowing you to send requests to your local Worker.

### Available Tools

Currently, the agent exposes the following tools:

1.  **`searchPosts`**
    *   **Description:** Searches for posts on BlueSky based on a given query.
    *   **Arguments:**
        *   `query: string` - The search term for posts.
    *   **Authentication:** Requires `BLUESKY_IDENTIFIERS` and `BLUESKY_PASSWORD` to be set in your environment (e.g., in `.dev.vars` for local testing) for BlueSky authentication.
    *   **Example MCP Request (conceptual, via `mcp-inspector` or direct API call):**

    ```json
    {
      "tool": "searchPosts",
      "args": {
        "query": "hello world"
      }
    }
    ```


    Happy coding! 🚀 May your code be bug-free and your coffee be strong! ☕️

    Remember: If at first you don't succeed, try, try, try... and then blame it on the compiler! 😅