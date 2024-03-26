"use client"

import "@uploadthing/react/styles.css";
import Header from "@/app/_components/header";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { saveBarbershop } from "../[id]/_actions/save-barbershop";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { Loader2, XIcon } from "lucide-react";
import { utapi } from "../[id]/_actions/delete-image";
import axios from 'axios';

const formSchema = z.object({
  name: z.string({
    required_error: "Campo Nome obrigatório.",
  }).trim().min(10, "Campo Nome deve ter mais de 10 caractere."),
  address: z.string({
    required_error: "Campo Endereço obrigatório.",
  }).trim().min(10, "Campo Endereço deve ter mais de 10 caractere."),
})

interface barbershopRegisterProps {
  defaultValues?: z.infer<typeof formSchema>
}

const BarbershopRegister = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {

    const { name, address } = values;

    if (imageUrl.trim() === '') {
      toast.warning("Escolha uma imagem!")

      return;
    }

    await saveBarbershop({
      name,
      address,
      imageUrl,
    });

    toast(
      "Barbearia salva com sucesso!"
    );

    form.reset();

    setImageUrl('');
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
              name="address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <label className="text-gray-400" >Endereço</label>
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
        </form>
      </Form>
    </div>
  );
}

export default BarbershopRegister;