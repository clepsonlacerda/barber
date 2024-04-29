import Header from "@/app/_components/header";
import { Skaleton } from "@/app/barbershops/[id]/_components/skaleton";

const LoadingService = () => {
  return (
    <div>
      <Header />

      <div className="m-4 flex flex-col md:!flex-row gap-4">
        <div className="w-full">
          <label className="text-gray-400" >Nome</label>
          <Skaleton className="h-[40px] rounded" />
        </div>
        <div className="w-full">
          <label className="text-gray-400" >Preço</label>
          <Skaleton className="h-[40px] rounded" />
        </div>
        <div className="w-full">
          <label className="text-gray-400" >Descrição</label>
          <Skaleton className="h-[40px] rounded" />
        </div>
      </div>
    </div>
  );
}

export default LoadingService;