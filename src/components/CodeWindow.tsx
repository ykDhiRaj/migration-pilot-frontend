export default function CodeWindow() {
  return (
    // Replaced hardcoded background hex with named color variable
    <div
      className="max-w-2xl mx-auto rounded-xl overflow-hidden border border-border"
      style={{ backgroundColor: "var(--color-code-bg)" }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-background-tertiary border-b border-border">
        {/* Traffic light dots now use named color variables instead of raw hex */}
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: "var(--color-traffic-red)" }}
        />
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: "var(--color-traffic-yellow)" }}
        />
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: "var(--color-traffic-green)" }}
        />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          changelog-001.xml
        </span>
        <span className="ml-auto text-xs text-code-green flex items-center gap-1">
          ✓ generated
        </span>
      </div>

      {/* Code body */}
      <pre className="p-6 font-mono text-[13px] leading-relaxed overflow-hidden max-h-[280px] text-left">
        <code>
          <span className="token-kw">&lt;databaseChangeLog&gt;</span>
          {"\n"}
          <span className="pl-4 block">
            <span className="token-kw">&lt;changeSet </span>
            <span className="token-attr">id</span>=
            <span className="token-str">"001"</span>{" "}
            <span className="token-attr">author</span>=
            <span className="token-str">"migration-pilot"</span>
            <span className="token-kw">&gt;</span>
          </span>
          <span className="pl-8 block">
            <span className="token-kw">&lt;createTable </span>
            <span className="token-attr">tableName</span>=
            <span className="token-str">"users"</span>
            <span className="token-kw">&gt;</span>
          </span>
          <span className="pl-12 block">
            <span className="token-kw">&lt;column </span>
            <span className="token-attr">name</span>=
            <span className="token-str">"id"</span>{" "}
            <span className="token-attr">type</span>=
            <span className="token-str">"BIGINT"</span>{" "}
            <span className="token-attr">autoIncrement</span>=
            <span className="token-str">"true"</span>
            <span className="token-kw">&gt;</span>
          </span>
          <span className="pl-16 block">
            <span className="token-kw">&lt;constraints </span>
            <span className="token-attr">primaryKey</span>=
            <span className="token-str">"true"</span>{" "}
            <span className="token-attr">nullable</span>=
            <span className="token-str">"false"</span>
            <span className="token-kw"> /&gt;</span>
          </span>
          <span className="pl-12 block">
            <span className="token-kw">&lt;/column&gt;</span>
          </span>
          <span className="pl-12 block">
            <span className="token-kw">&lt;column </span>
            <span className="token-attr">name</span>=
            <span className="token-str">"email"</span>{" "}
            <span className="token-attr">type</span>=
            <span className="token-str">"VARCHAR(255)"</span>
            <span className="token-kw">&gt;</span>
          </span>
          <span className="pl-16 block">
            <span className="token-kw">&lt;constraints </span>
            <span className="token-attr">nullable</span>=
            <span className="token-str">"false"</span>{" "}
            <span className="token-attr">unique</span>=
            <span className="token-str">"true"</span>
            <span className="token-kw"> /&gt;</span>
          </span>
          <span className="pl-12 block">
            <span className="token-kw">&lt;/column&gt;</span>
          </span>
          <span className="pl-8 block">
            <span className="token-kw">&lt;/createTable&gt;</span>
          </span>
          <span className="pl-4 block">
            <span className="token-kw">&lt;/changeSet&gt;</span>
          </span>
          <span className="token-kw">&lt;/databaseChangeLog&gt;</span>
        </code>
      </pre>
    </div>
  );
}
