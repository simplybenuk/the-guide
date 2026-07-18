import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const workflow = readFileSync(
  resolve(process.cwd(), ".github/workflows/elixirs-pages.yml"),
  "utf8",
);

describe("manual Elixir Pages workflow", () => {
  it("is manual-only and main-branch constrained", () => {
    expect(workflow).toMatch(/^on:\n {2}workflow_dispatch:\s*$/m);
    expect(workflow).not.toMatch(/^\s*(?:push|pull_request|schedule):/m);
    expect(workflow.match(/if: github\.ref == 'refs\/heads\/main'/g)).toHaveLength(2);
  });

  it("keeps deployment permissions out of the build job", () => {
    const [beforeDeploy, deployJob] = workflow.split(/^ {2}deploy:$/m);
    expect(beforeDeploy).toContain("contents: read");
    expect(beforeDeploy).toContain("pages: read");
    expect(beforeDeploy).not.toContain("pages: write");
    expect(beforeDeploy).not.toContain("id-token: write");
    expect(deployJob).not.toContain("contents: read");
    expect(deployJob).toContain("pages: write");
    expect(deployJob).toContain("id-token: write");
    expect(deployJob).toContain("name: github-pages");
  });

  it("builds, audits, and uploads only the static artifact including .nojekyll", () => {
    expect(workflow).toContain("run: npm ci");
    expect(workflow).toContain("run: npm test");
    expect(workflow).toContain("run: npm run build:elixirs");
    expect(workflow).toContain("run: npm run audit:elixirs");
    expect(workflow).toContain("path: dist/elixirs-pages");
    expect(workflow).toContain("include-hidden-files: true");
    expect(workflow).not.toContain("secrets.");
  });

  it("pins reviewed official action majors and links build to protected deployment", () => {
    expect(workflow).toContain("actions/checkout@v7");
    expect(workflow).toContain("actions/setup-node@v7");
    expect(workflow).toContain("actions/configure-pages@v6");
    expect(workflow).toContain("actions/upload-pages-artifact@v5");
    expect(workflow).toContain("actions/deploy-pages@v4");
    expect(workflow).toMatch(/deploy:\n[\s\S]*needs: build/);
    expect(workflow).toContain("cancel-in-progress: false");
  });
});
