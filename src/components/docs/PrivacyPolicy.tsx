export function PrivacyPolicy() {
  const year = new Date().getFullYear();
  return (
    <>
      <p className="text-xs text-[var(--color-muted)]">Effective: January 1, {year}</p>

      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">1. Information We Collect</h3>
        <p>This service does not collect, store, or transmit any personal information, including files you upload. All PDF processing occurs exclusively in your browser's memory.</p>
      </section>
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">2. Server Transmission</h3>
        <p>Uploaded PDF files are never sent to any external server. All processing is performed locally on your device.</p>
      </section>
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">3. Cookies & Tracking</h3>
        <p>We use <code className="bg-[var(--drop-zone-bg)] px-1 rounded text-xs">sessionStorage</code> solely to remember whether you have dismissed the welcome notice. When Google AdSense is active, that network's cookie policy may also apply.</p>
      </section>
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">4. Third-Party Sharing</h3>
        <p>We do not sell or share any user data with third parties.</p>
      </section>
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">5. Contact</h3>
        <p>For privacy-related inquiries, please open an issue on the GitHub repository.</p>
      </section>
    </>
  );
}
