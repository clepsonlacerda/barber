"use server"

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

interface SaveServiceParams {
  id?: string;
  name: string;
  price: number;
  description: string;
  barbershopId: string;
  imageUrl?: string;
}

export const saveService = async (params: SaveServiceParams) => {

  if (!params.id) {
    console.log('save service')
    await db.service.create({
      data: {
        name: params.name,
        price: params.price,
        description: params.description,
        imageUrl: params.imageUrl ?? '',
        barbershopId: params.barbershopId,
      }
    });
  } else {
    console.log('edit service', params.barbershopId)
    await db.service.update({
      where: {
        id: params.id
      },
      data: {
        name: params.name,
        price: params.price,
        description: params.description,
        imageUrl: params.imageUrl ?? '',
        barbershopId: params.barbershopId,
      }
    });
  }
}