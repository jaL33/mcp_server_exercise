export interface McpRequest {
  method: string;
  params: Record<string, unknown>;
}

export interface McpResponse {
  result: unknown;
}
