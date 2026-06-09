import Link from 'next/link'

export default function Footer({ playfairClass }) {
  return (
    <footer className="w-full py-12 px-4 mt-24 border-t border-neutral-100">
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-4 text-center">
        <span className={`${playfairClass} text-lg font-semibold text-[#111111]`}>
          Tea-shirts
        </span>
        <p className="text-sm text-neutral-500">A portfolio project</p>
        <div className="flex items-center gap-6">
          <Link
            href="#"
            className="text-sm text-neutral-500 hover:text-[#8B5E3C] transition-colors duration-200"
            aria-label="GitHub repository"
          >
            GitHub
          </Link>
          <Link
            href="https://nextjs.org"
            className="text-sm text-neutral-500 hover:text-[#8B5E3C] transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Built with Next.js (opens in new tab)"
          >
            Built with Next.js
          </Link>
        </div>
      </div>
    </footer>
  )
}
