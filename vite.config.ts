import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function resolveBasePath(): string {
  const explicit = process.env.VITE_BASE_PATH;
  if (explicit) {
    return explicit;
  }

  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
  if (process.env.GITHUB_ACTIONS && repo) {
    return `/${repo}/`;
  }

  return "/";
}

export default defineConfig({
  base: resolveBasePath(),
  plugins: [react()],
  test: {
    environment: "node"
  }
});
