export function DataPolicy() {
  return (
    <>
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">1. How Files Are Processed</h3>
        <p>Uploaded PDF files are loaded only into the browser's RAM. They are never written to disk, a server, or any cloud storage.</p>
      </section>
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">2. Automatic Deletion</h3>
        <p>Files are automatically removed from memory in the following situations:</p>
        <ul className="list-disc list-inside space-y-1 mt-1">
          <li>When you close the tab or browser window</li>
          <li>When you navigate to a different page</li>
          <li>When you click the × button to close the viewer</li>
          <li>When you upload a new file (replaces the previous one)</li>
        </ul>
      </section>
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">3. Session Storage</h3>
        <p><code className="bg-[var(--drop-zone-bg)] px-1 rounded text-xs">sessionStorage</code> stores only whether you have seen the welcome notice. It is cleared when you close the tab. No file content is ever stored there.</p>
      </section>
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">4. Security Advice</h3>
        <p>If you view sensitive documents on a shared or public computer, always close the tab when you are done. While this service does not save your files, browser screenshots or screen recordings may still expose content — that remains your responsibility.</p>
      </section>
    </>
  );
}
