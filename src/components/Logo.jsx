import { useState } from 'react'
import siteConfig from '../config/site.config.js'

export default function Logo() {
  const { name, logo } = siteConfig
  // If no logo is configured or it fails to load, fall back to the server name
  const [failed, setFailed] = useState(!logo.src)

  if (failed) {
    return (
      <div className={`pixel-title text-hero sm:text-display ${logo.animate ? 'animate-pixel-bob' : ''}`}>
        {name}
      </div>
    )
  }

  return (
    <img
      src={logo.src}
      alt={logo.alt ?? name}
      width={logo.width}
      draggable={false}
      onError={() => setFailed(true)}
      className={`h-auto max-w-full select-none ${logo.animate ? 'animate-pixel-bob' : ''}`}
    />
  )
}