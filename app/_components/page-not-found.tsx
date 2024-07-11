"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../_components/ui/card";
import { Button } from "../_components/ui/button";
import { useRouter } from "next/navigation";
import { HomeIcon } from "lucide-react";

const PageNotFound = () => {

  const router = useRouter();

  const handleHomePageClick = () => {
    router.replace("/");
  }

  return (
    <div className="lg:m-10 md:m-8 sm:6 m-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            <span className="text-8xl text-zinc-700 tracking-tighter">
              OPS.
            </span>
          </CardTitle>
          <CardDescription className="text-center">
            <p className="font-bold text-2xl text-zinc-200">
              Página Não Encontrada
            </p>
          </CardDescription>
          <CardContent className="text-center">
            <Button onClick={handleHomePageClick} variant="outline" className="mt-8 text-zinc-200" >
              <HomeIcon size={15} className="mr-1" />
              <span>Inicio</span>
            </Button>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}

export default PageNotFound;