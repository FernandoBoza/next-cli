import {capitalize, formatDate, pascalCase} from "./utils";

export function serverComponentTemplate(name: string) {
  return `
// File: ${capitalize(name)}/index.tsx created on ${formatDate()}

export default function ${capitalize(name)}() {
  return (
    <div>
      <h1>${capitalize(name)} (Server Component)</h1>
    </div>
  );
}
`.trim();
}

export function clientComponentTemplate(name: string) {
  return `
// File: ${capitalize(name)}/index.client.tsx created on ${formatDate()}

"use client";

import React from 'react';

export default function ${capitalize(name)}() {
  return (
    <div>
      <h1>${capitalize(name)} (Client Component)</h1>
    </div>
  );
}
`.trim();
}

export function  pageTemplate(name: string) {
  return `
// File: app/${name}/page.tsx

export default function ${pascalCase(name)}Page() {
  return (
    <main>
      <h1>${pascalCase(name)} Page</h1>
      <p>This is a Next.js 13 server-side page for the /${name} route.</p>
    </main>
  );
}
`.trim();
}

export function layoutTemplate(name: string) {
  return `
// File: app/${name}/layout.tsx

export default function ${pascalCase(name)}Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h1>${pascalCase(name)} Layout</h1>
      {children}
    </section>
  );
}
`.trim();
}