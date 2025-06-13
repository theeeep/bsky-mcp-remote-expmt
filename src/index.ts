import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { Hono } from "hono";
import { z } from "zod";

export class BlueSkyMCP extends McpAgent {
	server = new McpServer({ name: "BlueSky MCP Agent", version: "1.0.0" });

	async init() {
		this.server.tool(
			"add",
			{ a: z.number(), b: z.number(), c: z.number() },
			async ({ a, b, c }) => ({
				content: [{ type: "text", text: String(a + b + c) }],
			}),
		);
		1;
	}
}

const app = new Hono();

app.get("/", (c) => c.text("Hello World!!"));

app.post("/mcp", async (c) => {
	return BlueSkyMCP.serve("/mcp").fetch(c.req.raw, c.env, c.executionCtx);
});

// app.get("/sse/*", async (c) => {
// 	return BlueSkyMCP.serve("/sse").fetch(c.req.raw, c.env, c.executionCtx);
// });

export default {
	fetch: app.fetch,
} satisfies ExportedHandler<Env>;
