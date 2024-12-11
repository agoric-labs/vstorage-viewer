/* global lockdown */
import "ses";
import "@endo/eventual-send/shim.js";
import { Buffer } from "buffer";

globalThis.Buffer = Buffer;

// @ts-expect-error Add process to context for cosmos-kit
globalThis.process = { env: import.meta.env };

lockdown({
  errorTaming: "unsafe",
  overrideTaming: "severe",
  consoleTaming: "unsafe",
  errorTrapping: "none",
  stackFiltering: "verbose",
});

Error.stackTraceLimit = Infinity;
