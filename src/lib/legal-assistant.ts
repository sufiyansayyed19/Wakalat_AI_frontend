import { getGeminiAgent, GeminiTool, GeminiFunctionCall } from './gemini-agent';
import { getMCPClientManager } from './mcp-client';

export interface ConversationMessage {
  role: 'user' | 'model';
  content: string;
}

export interface AssistantRunOptions {
  message: string;
  conversationHistory?: ConversationMessage[];
  useMCPTools?: boolean;
  maxToolIterations?: number;
}

export interface AssistantRunResult {
  finalText: string;
  toolCalls: Array<{
    tool: string;
    arguments: Record<string, any>;
    result: any;
  }>;
}

const SYSTEM_PROMPT = `You are WAKALAT.AI, a senior legal analyst assisting Indian advocates.

Responsibilities:
- Analyse user submissions about legal matters with Indian law as primary reference.
- Always include a short disclaimer that your analysis is for informational purposes only and not a substitute for formal legal advice.
- When statutes, sections, or precedents are relevant, cite them clearly.
- Consider procedural guidance (next steps, documentation, timelines) when appropriate.

MCP TOOLING
You have access to specialized legal research and document utilities through the Model Context Protocol (MCP) server. When tools are available, use them to enhance your responses. If the user's query relates to legal research, case law, statutes, or document analysis, call the appropriate tool(s) first before providing your final answer.

When you have enough information to answer the user, provide a well-structured response with headings, bullets where useful, and include the disclaimer.`;

const DEFAULT_MAX_TOOL_ITERATIONS = 3;

function buildUserPrompt(userMessage: string): string {
  return `${SYSTEM_PROMPT}\n\nUSER REQUEST:\n${userMessage}`;
}

export async function runLegalAssistant(options: AssistantRunOptions): Promise<AssistantRunResult> {
  const { message, conversationHistory = [], useMCPTools = true } = options;
  const maxIterations = options.maxToolIterations ?? DEFAULT_MAX_TOOL_ITERATIONS;

  const geminiAgent = getGeminiAgent();
  if (!geminiAgent.isConfigured()) {
    throw new Error('Gemini API key not configured. Please set GEMINI_API_KEY environment variable.');
  }

  const toolCalls: AssistantRunResult['toolCalls'] = [];
  let geminiTools: GeminiTool[] = [];
  const toolManager = getMCPClientManager();

  // Fetch MCP tools and convert them to Gemini format
  if (useMCPTools && toolManager.isConnected()) {
    try {
      const mcpTools = await toolManager.listTools();
      const availableTools = Array.isArray(mcpTools) ? mcpTools : [];
      
      // Log for debugging
      console.log(`[Legal Assistant] MCP connection status: ${toolManager.isConnected()}`);
      console.log(`[Legal Assistant] Retrieved ${availableTools.length} tools from MCP server`);
      
      if (availableTools.length > 0) {
        const toolNames = availableTools.map((t: any) => t.name || 'unnamed');
        console.log(`[Legal Assistant] Available tools:`, toolNames.join(', '));
        
        // Convert MCP tools to Gemini format
        geminiTools = availableTools.map((mcpTool: any) => {
          const converted = geminiAgent.convertMCPToolToGeminiTool(mcpTool);
          console.log(`[Legal Assistant] Converted tool "${converted.name}":`, {
            hasDescription: !!converted.description,
            hasParameters: !!converted.parameters,
            parameterCount: converted.parameters?.properties ? Object.keys(converted.parameters.properties).length : 0,
          });
          return converted;
        });
        
        console.log(`[Legal Assistant] Successfully converted ${geminiTools.length} tools to Gemini format`);
      } else {
        console.warn(`[Legal Assistant] No tools available from MCP server. Response was:`, JSON.stringify(mcpTools, null, 2));
        console.warn(`[Legal Assistant] Proceeding without MCP tools. The assistant will use general knowledge only.`);
      }
    } catch (error) {
      console.error('[Legal Assistant] Unable to list MCP tools:', error);
      console.error('[Legal Assistant] Error details:', error instanceof Error ? error.stack : error);
      geminiTools = [];
    }
  } else {
    const reason = !useMCPTools ? 'MCP tools disabled' : 'MCP server not connected';
    console.log(`[Legal Assistant] ${reason}. useMCPTools: ${useMCPTools}, isConnected: ${toolManager.isConnected()}`);
  }

  // Create function call handler
  const functionCallHandler = async (call: GeminiFunctionCall): Promise<any> => {
    if (!toolManager.isConnected()) {
      throw new Error('MCP server is not connected');
    }

    try {
      console.log(`[Legal Assistant] Executing MCP tool: ${call.name} with args:`, call.args);
      const result = await toolManager.callTool(call.name, call.args);
      
      // Track the tool call
      toolCalls.push({
        tool: call.name,
        arguments: call.args,
        result: result,
      });

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error calling MCP tool.';
      console.error(`[Legal Assistant] Error calling tool ${call.name}:`, error);
      
      // Track the failed tool call
      toolCalls.push({
        tool: call.name,
        arguments: call.args,
        result: { error: errorMessage },
      });

      throw error;
    }
  };

  // Build the prompt
  const prompt = buildUserPrompt(message);

  // Generate response with function calling support
  try {
    const response = await geminiAgent.generateResponse(prompt, {
      tools: geminiTools.length > 0 ? geminiTools : undefined,
      conversationHistory,
      functionCallHandler: geminiTools.length > 0 ? functionCallHandler : undefined,
    });

    return {
      finalText: response.text || 'No response generated.',
      toolCalls,
    };
  } catch (error) {
    console.error('[Legal Assistant] Error generating response:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      finalText: `An error occurred while processing your request: ${errorMessage}`,
      toolCalls,
    };
  }
}


