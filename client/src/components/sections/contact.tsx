import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Clock, Send } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "Contact",
      lastName: "Form",
      email: "user@example.com",
      subject: "General Inquiry",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      form.reset();
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-[#0a0f1c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#00d9ff] mb-4">
            &lt;Contact Me/&gt;
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Response Time */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-[#00d9ff]/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Clock className="w-12 h-12 text-[#00d9ff]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Response Time</h3>
              <p className="text-gray-400 text-lg">Usually within 24 hours</p>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={8}
                          className="bg-gray-800/30 border-gray-700 text-white resize-none text-lg p-6"
                          placeholder="Your message here..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-[#00d9ff] hover:bg-[#00b8e6] text-black font-semibold py-4 text-lg rounded-lg"
                >
                  {contactMutation.isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Like and Comment buttons section */}
        <div className="text-center mt-20">
          <div className="flex justify-center space-x-8">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <div className="w-12 h-12 border-2 border-gray-600 rounded-full flex items-center justify-center hover:border-red-400">
                <span className="text-xl">♡</span>
              </div>
              <span>Like</span>
            </button>
            
            <button 
              onClick={() => {
                const element = document.getElementById("comments");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className="w-12 h-12 border-2 border-gray-600 rounded-full flex items-center justify-center hover:border-[#00d9ff]">
                <span className="text-xl">💬</span>
              </div>
              <span>Comment</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}