"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";

const formSchema = z.object({
    name: z.string().min(1),
});

export const StoreModal = () => {
    const storeModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }
    
    return (
        <Modal
            title={"Create store"}
            description={"Add a new store to manage products and categories"}
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name="name">

                            </FormField>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
}
