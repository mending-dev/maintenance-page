import { useState } from 'react'
import siteConfig from '../config/site.config.js'

/*
 * The outer wrapper handles the entrance animation, the inner element the bobbing.
 * They are separate because both animate "transform" and would override each other.
 */
export default function Logo() {
  const { name, logo } = siteConfig
  // If no logo is configured or it fails to load, fall back to the server name
  const [failed, setFailed] = useState(!logo.src)

  if (failed) {
    return (
      <div className="reveal [--reveal-delay:100ms]">
        <div className={`pixel-title text-hero sm:text-display short:text-hero ${logo.animate ? 'animate-pixel-bob' : ''}`}>
          {name}
        </div>
      </div>
    )
  }

  return (
    <div className="reveal max-w-full [--reveal-delay:100ms]">
      <img
        src={logo.src}
        alt={logo.alt ?? name}
        draggable={false}
        onError={() => setFailed(true)}
        // The logo never gets taller than 16% of the viewport; object-contain keeps its aspect ratio
        style={{ width: logo.width, maxWidth: '100%', maxHeight: '16dvh', objectFit: 'contain' }}
        // block removes the inline baseline gap below the image
        className={`mx-auto block h-auto select-none ${logo.animate ? 'animate-pixel-bob' : ''}`}
      />
    </div>
  )
}