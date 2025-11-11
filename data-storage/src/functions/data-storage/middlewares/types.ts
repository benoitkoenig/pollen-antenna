import { InvocationContext } from "@azure/functions";

import { AuthContext } from "./auth";

export interface ExtendedContext extends InvocationContext, AuthContext {}
