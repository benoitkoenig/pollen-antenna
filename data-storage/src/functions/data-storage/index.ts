import type { HeaderMap } from "@apollo/server";
import {
  app,
  type HttpRequest,
  type HttpResponseInit,
  type InvocationContext,
} from "@azure/functions";

import { getExtendedContext } from "./middlewares";
import { server } from "./server";

export async function pollenAntenna(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  const normalizedRequest = {
    method: request.method,
    headers: request.headers as unknown as HeaderMap,
    search: new URL(request.url).search,
    body: await request.json(),
  };

  const { body, headers, status } = await server.executeHTTPGraphQLRequest({
    httpGraphQLRequest: normalizedRequest,
    context: () =>
      Promise.resolve(
        getExtendedContext(context, request.headers as unknown as HeaderMap),
      ),
  });

  if (body.kind === "chunked") {
    throw Error("Incremental delivery not implemented");
  }

  return {
    status: status ?? 200,
    headers: {
      ...Object.fromEntries(headers),
      "content-length": Buffer.byteLength(body.string).toString(),
    },
    body: body.string,
  };
}

app.http("pollen-antenna", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: pollenAntenna,
});
