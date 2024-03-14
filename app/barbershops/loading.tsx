import Header from "../_components/header";
import { Skaleton } from "./[id]/_components/skaleton";

const LoadingBarbershops = () => {
  return (
    <div>
      <Header />

      <div className="m-5">
        <Skaleton className="h-10 w-full  rounded-md" />
      </div>

      <div className="mx-5 mt-5 mb-10">
        <Skaleton className="h-5 w-full  rounded-md" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 m-5 gap-4">
        <Skaleton className="min-w-full max-w-[167px] h-[280px] rounded-2xl" />
        <Skaleton className="min-w-full max-w-[167px] h-[280px] rounded-2xl" />
        <Skaleton className="min-w-full max-w-[167px] h-[280px] rounded-2xl" />
        <Skaleton className="min-w-full max-w-[167px] h-[280px] rounded-2xl" />
        <Skaleton className="min-w-full max-w-[167px] h-[280px] rounded-2xl" />
        <Skaleton className="min-w-full max-w-[167px] h-[280px] rounded-2xl" />
        <Skaleton className="min-w-full max-w-[167px] h-[280px] rounded-2xl" />
        <Skaleton className="min-w-full max-w-[167px] h-[280px] rounded-2xl" />
        <Skaleton className="min-w-full max-w-[167px] h-[280px] rounded-2xl" />
        <Skaleton className="min-w-full max-w-[167px] h-[280px] rounded-2xl" />
        <Skaleton className="min-w-full max-w-[167px] h-[280px] rounded-2xl" />
        <Skaleton className="min-w-full max-w-[167px] h-[280px] rounded-2xl" />
      </div>
    </div>
  );
}

export default LoadingBarbershops;