interface ButtonProps {
  readonly children?: React.ReactNode;
}

export function Button({ children }: ButtonProps) {
  return (
    <button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50">
      {children}
    </button>
  );
}
