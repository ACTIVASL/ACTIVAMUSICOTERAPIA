interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties; // Added to fix build
}

export const Card = ({
  children,
  className = '',
  noPadding = false,
  hoverable = false,
  onClick,
  style,
}: CardProps) => (
  <div
    className={`relative bg-white/95 backdrop-blur-xl rounded-2xl border border-white/80 ring-1 ring-[#00B2A9]/20 transition-all duration-300 ${
      hoverable
        ? 'hover:shadow-[0_20px_40px_-12px_rgba(0,178,169,0.1)] hover:-translate-y-1 cursor-pointer active:scale-[0.99] active:shadow-sm'
        : 'shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)]'
    } ${className}`}
    onClick={onClick}
    style={{
      background:
        'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 249, 251, 0.96) 100%)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      ...style,
    }}
  >
    <div className={noPadding ? '' : 'p-6 md:p-8'}>{children}</div>
  </div>
);
