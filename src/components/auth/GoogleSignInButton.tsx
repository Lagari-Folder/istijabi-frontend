type GoogleSignInButtonProps = {
  onClick: () => void;
};

export default function GoogleSignInButton({
  onClick,
}: GoogleSignInButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 mt-2 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-300"
    >
      <img src="./icons/google.svg" className="size-[25px]" alt="" />
      تابع بواسطة Google
    </button>
  );
}
