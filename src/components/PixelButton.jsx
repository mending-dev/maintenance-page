import PixelIcon from './PixelIcon.jsx'

/** Link styled as a Minecraft-like button. */
export default function PixelButton({ href, variant = 'primary', icon, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`pixel-btn pixel-btn--${variant}`}
    >
      {icon && <PixelIcon name={icon} />}
      <span>{children}</span>
    </a>
  )
}