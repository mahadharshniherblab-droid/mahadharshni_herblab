export default function Logo({ size = 52, alt = 'Mahadharshni Herblab logo', className = '' }) {
  return (
    <span className={`logo ${className}`.trim()} style={{ width: size, height: size }}>
      <img className="logo__img" src={location.protocol === 'file:' ? 'preview/site/media/logo.png' : '/media/logo.png'} alt={alt} width={size} height={size} />
    </span>
  );
}
