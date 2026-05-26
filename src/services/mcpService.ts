import type { McpRequest, McpResponse } from '../types/mcp';

export class McpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, McpError.prototype);
  }
}

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const handlers: Record<string, (params: Record<string, unknown>) => unknown> = {
  ping: () => ({ pong: true }),

  echo: (params) => params,

  add: (params) => {
    const a = params['a'];
    const b = params['b'];

    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new McpError('Invalid params: expected numeric values for a and b', 400);
    }

    return a + b;
  }
};

export function handleMcpRequest(payload: unknown): McpResponse {
  if (!isObject(payload)) {
    throw new McpError('Invalid request body: expected JSON object', 400);
  }

  const request = payload as McpRequest;
  const { method, params } = request;

  if (typeof method !== 'string' || method.trim() === '') {
    throw new McpError('Missing method', 400);
  }

  if (!isObject(params)) {
    throw new McpError('Invalid params: expected object', 400);
  }

  const handler = handlers[method];

  if (!handler) {
    throw new McpError(`Unknown method: ${method}`, 400);
  }

  return {
    result: handler(params)
  };
}
