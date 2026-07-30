interface GratefulProps {
  className?: string;
}

const Grateful: React.FC<GratefulProps> = ({ className }) => {
  return (
    <h3
      className={`border-b border-dashed border-current/25 text-xs text-zinc-400 dark:text-zinc-600 ${className}`}>
      Thank you for helping me make EncryptedList better.
    </h3>
  );
};

export default Grateful;
