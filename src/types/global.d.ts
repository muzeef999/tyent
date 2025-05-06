/* eslint-disable no-var */
import type { Connection } from "mongoose";

declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<typeof import("mongoose")> | null;
  };
}

export {};
