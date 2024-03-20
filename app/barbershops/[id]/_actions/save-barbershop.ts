"use server"

import { db } from "@/app/_lib/prisma";

interface SaveBarbershopParams {
  name: string;
  address: string;
  imageUrl: string;
}

export const saveBarbershop = async (params: SaveBarbershopParams) => {
  await db.barbershop.create({
    data: {
      name: params.name,
      address: params.address,
      imageUrl: params.imageUrl,
    }
  });
}