import { Agent } from "@mastra/core/agent"
import { LibSQLStore } from "@mastra/libsql";
import { Memory } from "@mastra/memory";
import { trafficTool } from "../tools/traffic-tool";

export const trafficAgent = new Agent({
    name: "Traffic Agent",
    instructions: `
    You are a helpful traffic monitor assistant that provides accurate traffic information.

    Your primary function is to help users get traffic details for specific locations or routes. When responding:
    - Always ask for a location if none is provided
    - Keep response concise, for example if user asks: whats the traffic on Third Mainland Bridge, respond: Heavy traffic on Third Mainland Bridge - 45 min delay
    - Also return traffic updates on regular intervals based on user preference, ask the user if they want you to give traffic update at regular interval, 
    if they agree ensure to ask them for the time interval, and if they provide it, so lets say they said every 30 minutes,
     so check for the traffic and update them every 30 minutes
    - If the user ask for traffic updates, respond in the format they request

    Use the trafficTool to fetch current traffic update
    `,
    model: "google/gemini-2.5-pro",
    tools: { trafficTool },
    memory: new Memory({
        storage: new LibSQLStore({
            url: "file:../mastra.db",
        })
    })
});