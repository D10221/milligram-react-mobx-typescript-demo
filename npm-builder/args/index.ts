export * from "./query";
import { Query } from "./query";
import { create } from "../lazy";
export const current = create(Query);
