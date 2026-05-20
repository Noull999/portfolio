export default function Footer() {
  return (
    <footer
      className="border-t text-center"
      style={{
        padding: '2rem 3rem',
        borderColor: 'var(--border)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        color: 'var(--muted)',
      }}
    >
      © 2026 <span style={{ color: 'var(--text)' }}>José Asencio</span> · Diseñado y codificado con precisión · Puerto Montt, Chile
    </footer>
  )
}
