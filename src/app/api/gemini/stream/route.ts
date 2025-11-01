// API Route for Gemini Streaming Chat with MCP Integration
import { NextRequest } from 'next/server';
import { getGeminiAgent } from '@/lib/gemini-agent';
import { runLegalAssistant } from '@/lib/legal-assistant';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory, useMCPTools = true } = body;

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const geminiAgent = getGeminiAgent();

    if (!geminiAgent.isConfigured()) {
      return new Response(
        JSON.stringify({ error: 'Gemini API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await runLegalAssistant({
      message,
      conversationHistory: conversationHistory || [],
      useMCPTools,
    });

    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        const chunks = result.finalText.split(/\n{2,}/).filter(Boolean);

        (async () => {
          try {
            if (!chunks.length) {
              controller.enqueue(encoder.encode(result.finalText));
            } else {
              for (const chunk of chunks) {
                controller.enqueue(encoder.encode(`${chunk}\n\n`));
                await new Promise((resolve) => setTimeout(resolve, 20));
              }
            }
          } finally {
            controller.close();
          }
        })();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Gemini streaming error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

