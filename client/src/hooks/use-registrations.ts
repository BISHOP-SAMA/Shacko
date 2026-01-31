import { useMutation } from "@tanstack/react-query";
import { api, type InsertRegistration } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

export function useCreateRegistration() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertRegistration) => {
      // Validate locally first to be safe, though form handles this
      const validated = api.registrations.create.input.parse(data);
      
      const res = await fetch(api.registrations.create.path, {
        method: api.registrations.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json(); // May match validation error schema
          throw new Error(error.message || "Invalid wallet address");
        }
        throw new Error('Something went wrong with your registration!');
      }

      return api.registrations.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "WELCOME TO THE SHACKO FAM! 🦈",
        description: "Your wallet has been added to the whitelist.",
        className: "bg-[#38bdf8] text-white border-4 border-black font-[Bangers] text-xl",
      });
    },
    onError: (error) => {
      toast({
        title: "UH OH! CHOMPED!",
        description: error.message,
        variant: "destructive",
        className: "font-bold border-4 border-black",
      });
    },
  });
}
