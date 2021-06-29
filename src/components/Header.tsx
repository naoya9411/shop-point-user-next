export const Header = ({ children }) => {
  return (
    <header className="w-full h-14 bg-green-400 px-4">
      <div className="flex justify-between items-center h-full">
        <p className="text-4xl text-green-800 font-semibold font-serif">
          Shop Point
        </p>
        {children}
      </div>
    </header>
  );
};
