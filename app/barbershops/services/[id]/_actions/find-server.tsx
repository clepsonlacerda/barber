"use server"

import { db } from "@/app/_lib/prisma";

interface FindServiceParams {
  id: string
}

export const findService = async (params: FindServiceParams) => {
  const service = await db.service.findUnique({
    where: {
      id: params.id,
    },
    include: {
      barbershop: true,
    }
  });

  return service;
}