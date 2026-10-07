/**
 * Local island plumbing for site islands. Mirrors the framework's
 * `IslandProps`/`IslandComponent` (src/client/runtime/islands.ts), which is
 * not reachable through the `absolute-press` package exports map.
 */
import type { Component } from 'solid-js';

export interface IslandProps {
  /** Pre-rendered inner markdown of the island tag. */
  childrenHtml?: string;
  [key: string]: unknown;
}

export type IslandComponent = Component<IslandProps>;
