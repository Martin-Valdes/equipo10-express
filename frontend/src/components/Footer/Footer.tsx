import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#3D6B8A] text-white">
      {/* Main content */}
      <div className="flex flex-col md:flex-row items-start justify-between px-10 md:px-16 lg:px-24 py-10 gap-10">
        {/* Left: logo + contact */}
        <div className="flex flex-col gap-3">
          <Image
            src="/easyemail-logo.png"
            alt="easyEmail logo"
            width={150}
            height={38}
            className="object-contain"
          />
          <p className="text-sm text-white/80">
            Contacto:{" "}
            <a
              href="mailto:info@easyemail.ai"
              className="underline hover:text-white transition-colors"
            >
              info@easyemail.ai
            </a>
          </p>
        </div>

        {/* Right: two columns of links */}
        <div className="flex gap-16 text-sm">
          <ul className="flex flex-col gap-4 text-white/90">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="#qa" className="hover:text-white transition-colors">
                Q&A
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:text-white transition-colors">
                ¿Qué es easyemail?
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col gap-4 text-white/90">
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Términos y condiciones
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Atención al cliente
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 py-4 text-center text-sm text-white/70">
        © 2025 easyEmail – Todos los derechos reservados
      </div>
    </footer>
  )
}
