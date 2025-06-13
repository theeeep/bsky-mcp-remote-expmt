import { AtpAgent } from "@atproto/api";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { Hono } from "hono";
import { z } from "zod";

export class BlueSkyMCP extends McpAgent<Env> {
	server = new McpServer({ name: "BlueSky MCP Agent", version: "1.0.0" });
	agent: AtpAgent | undefined;

	async init() {
		this.agent = new AtpAgent({ service: "https://bsky.social" });

		await this.agent.login({
			identifier: this.env.BLUESKY_IDENTIFIERS,
			password: this.env.BLUESKY_PASSWORD,
		});

		this.server.tool(
			"searchPosts",
			{ query: z.string() },
			async ({ query }) => {
				if (!this.agent) {
					return {
						content: [{ type: "text", text: "Agent not initialized" }],
					};
				}
				const result = await this.agent.app.bsky.feed.searchPosts({ q: query });
				return {
					content: [{ type: "text", text: JSON.stringify(result) }],
				};
			},
		);
	}
}

const app = new Hono();

app.get("/", (c) => c.text("Hello World!!"));

app.post("/mcp", async (c) => {
	return BlueSkyMCP.serve("/mcp").fetch(c.req.raw, c.env, {
		...c.executionCtx,
		props: {},
	});
});

export default {
	fetch: app.fetch,
} satisfies ExportedHandler<Env>;
