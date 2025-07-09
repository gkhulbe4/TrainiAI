const CornerElements = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-500/70 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-500/70 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-500/70 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-500/70 rounded-br-lg"></div>
    </>
  );
};
export default CornerElements;
