"use server"

import { db } from "@/app/_lib/prisma";

interface FindBarbershopParams {
  id: string
}

export const findBarbershop = async (params: FindBarbershopParams) => {
  const service = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  });

  return service;
}