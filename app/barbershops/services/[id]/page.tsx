"use client"

import "@uploadthing/react/styles.css";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { useEffect, useState } from "react";
import { findService } from "./_actions/find-server";
import { Prisma, Service } from "@prisma/client";
import { findBarbershop } from "../../[id]/_actions/find-baerbershop";
import { toast } from "sonner";
import { saveService } from "./_actions/save-service";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";
import { Loader2, XIcon } from "lucide-react";

import Header from "@/app/_components/header";
import LoadingService from "./_components/loading-service";
import Image from "next/image";
import axios from "axios";

const formSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: "Campo Nome obrigatório.",
  }).trim().min(1, "Campo Nome obrigatório."),
  price: z.coerce.number({
    required_error: "Campo Preço obrigatório.",
  }),
  description: z.string({
    required_error: "Campo Descrição obrigatório.",
  }).trim().min(1, "Campo Descrição obrigatório."),
  barbershopId: z.string(),
})

interface ServicesProps {
  params: {
    id: string;
  }
}

const Services = ({ params }: ServicesProps) => {

  const router = useRouter()

  const [loadUpdateService, setLoadUpdateService] = useState(true)
  const [imageUrl, setImageUrl] = useState<string>('');
  const [serviceSelected, setServiceSelected] = useState<Service>({
    description: '', name: '', price: new Prisma.Decimal(0), id: '', imageUrl: '', barbershopId: ''
  });
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  if (!params.id) {
    return null;
  } else {
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
    },
    values: {
      id: serviceSelected.id,
      description: serviceSelected.description,
      name: serviceSelected.name,
      price: Number(serviceSelected.price),
      barbershopId: serviceSelected.barbershopId,
    }
  });

  const paramId = params.id;

  useEffect(() => {
    setLoadUpdateService(true);

    try {

      const barbershopExists = async () => {

        try {

          const [barbershopPresent, servicePresent] = await Promise.all([
            findBarbershop({ id: paramId }),
            findService({ id: paramId })
          ]);

          if (barbershopPresent || servicePresent) {

            if (servicePresent) {
              setServiceSelected({
                description: servicePresent.description,
                name: servicePresent.name,
                price: servicePresent.price,
                id: servicePresent.id,
                imageUrl: servicePresent.imageUrl,
                barbershopId: servicePresent.barbershopId
              });
            }

          } else {
            router.push("/");
          }
        } finally {
          setLoadUpdateService(false);
          // console.log('finally')
        }

      }


      const service = async () => {
        return await findService({ id: paramId });
      }
      barbershopExists();
      service();
    } catch (error) {

    } finally {
    }
  }, []);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { id, description, name, price, barbershopId } = values;

    if (imageUrl.trim() === '') {
      toast.warning("Escolha uma imagem!")

      return;
    }

    await saveService({
      id,
      name,
      price,
      description,
      imageUrl: imageUrl,
      barbershopId: barbershopId ?? paramId,
    });

    if (barbershopId) {
      router.push(`/barbershops/${barbershopId}`)
    }

    toast(
      "Serviço salvo com sucesso!"
    );

    form.reset();

  }

  const handleDeleteImage = async () => {
    setDeleteIsLoading(true)

    try {
      await axios.delete("/api/uploadthing", {
        data: {
          url: imageUrl,
        },
      }).finally(() => {
        setDeleteIsLoading(false)
      });
    } finally {

    }

    toast("Imagem Deletada!");
    console.log("deletado")

    setImageUrl("")
  }

  const handleLoadingComplete = () => {
    console.log('called')
    setLoading(false);
  };


  if (loadUpdateService) {
    return (
      <LoadingService />
    );
  }

  return (
    <div>

      <Header />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="m-4">
          <div className="flex flex-col md:!flex-row gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-gray-400" >Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <label className="text-gray-400" >Preço</label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-gray-400" >Descrição</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-rows-2 grid-cols-1 gap-4 pt-4 md:grid-rows-1 md:grid-cols-2">
            <UploadDropzone
              content={{}}
              className="border-s border-input cursor-pointer mt-0"
              appearance={{
                button: {
                  backgroundColor: '#8161ff',
                }
              }}
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                setImageUrl(res[0].url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />

            <div className="border rounded-md flex items-center justify-center relative">
              {imageUrl && (
                <Button onClick={handleDeleteImage} type="button" variant="outline" className="z-50 absolute top-4 left-4">
                  <XIcon />
                  {deleteIsLoading && <p className="ml-2">Excluindo...</p>}
                </Button>
              )}

              {imageUrl && (
                <div>
                  {loading && <p><Loader2 className="z-50 h-7 w-7 absolute animate-spin left-[50%] top-[50%]" /></p>}
                  <Image
                    src={imageUrl}
                    alt=""
                    width={150}
                    height={100}
                    onLoadingComplete={handleLoadingComplete}
                  />
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="mt-5"
          >
            Submit
          </Button>

          <Button
            type="button"
            variant="outline"
            className="mt-5 ml-2"
            onClick={() => router.back()}
          >
            Voltar
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Services;