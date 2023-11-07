"use client";

import { Trash } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Store } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
interface SettingsFormProps {
    initialData: Store
}

const formSchema = z.object({
   name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export function SettingsForm({ initialData }: SettingsFormProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    return (
        <div className={"flex items-center justify-between"}>
            <Heading
                title="Settings"
                description="Manage store preferences"
            />
            <Button
                variant={"destructive"}
                size={"icon"}
                onClick={() => {}}
            >
                <Trash className={"h-4 w-4"}/>
            </Button>
            <Separator/>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)} className={"space-y-8 w-full"}>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Store name" {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        >

                        </FormField>
                    </div>
                </form>
            </Form>
        </div>
    );
}