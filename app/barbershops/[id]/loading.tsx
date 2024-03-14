import { Skaleton } from "./_components/skaleton";

const LoadingBarbershop = () => {
  return (
    <div className="p-2">
      <Skaleton className="h-[250px]" />
      <Skaleton className="h-[120px] mt-[1px]" />
      <Skaleton className="h-[130px] rounded-sm mt-4 mx-3" />
      <Skaleton className="h-[130px] rounded-sm mt-4 mx-3" />
      <Skaleton className="h-[130px] rounded-sm mt-4 mx-3" />
      <Skaleton className="h-[130px] rounded-sm mt-4 mx-3" />
      <Skaleton className="h-[130px] rounded-sm mt-4 mx-3" />
    </div>
  );
}

export default LoadingBarbershop;