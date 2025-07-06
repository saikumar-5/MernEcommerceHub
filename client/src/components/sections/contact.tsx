import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Clock, Send, Mail, MapPin } from "lucide-react";
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
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: (data) => {
      console.log("Contact form submitted successfully:", data);
      form.reset();
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error) => {
      console.error("Contact form error:", error);
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later or contact me directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Submitting contact form:", data);
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
          {/* Left side - Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                I'm always interested in discussing new opportunities, innovative projects, or just having a conversation.
              </p>
            </div>

            <div className="space-y-6">
              {/* <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#00d9ff]/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#00d9ff]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <p className="text-gray-400">Available via contact form</p>
                </div>
              </div> */}

              {/* <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#00d9ff]/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#00d9ff]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Location</h4>
                  <p className="text-gray-400">Gurugram, Haryana, India</p>
                </div>
              </div> */}

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#00d9ff]/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#00d9ff]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Response Time</h4>
                  <p className="text-gray-400">within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <input
                            {...field}
                            className="w-full bg-gray-800/30 border border-gray-700 text-white p-3 rounded-lg placeholder-gray-500 focus:border-[#00d9ff] focus:outline-none"
                            placeholder="First Name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <input
                            {...field}
                            className="w-full bg-gray-800/30 border border-gray-700 text-white p-3 rounded-lg placeholder-gray-500 focus:border-[#00d9ff] focus:outline-none"
                            placeholder="Last Name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          {...field}
                          type="email"
                          className="w-full bg-gray-800/30 border border-gray-700 text-white p-3 rounded-lg placeholder-gray-500 focus:border-[#00d9ff] focus:outline-none"
                          placeholder="your.email@example.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          {...field}
                          className="w-full bg-gray-800/30 border border-gray-700 text-white p-3 rounded-lg placeholder-gray-500 focus:border-[#00d9ff] focus:outline-none"
                          placeholder="Subject"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={6}
                          className="w-full bg-gray-800/30 border border-gray-700 text-white p-3 rounded-lg placeholder-gray-500 focus:border-[#00d9ff] focus:outline-none resize-none"
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
                  className="w-full bg-[#00d9ff] hover:bg-[#00b8e6] text-black font-semibold py-3 text-lg rounded-lg"
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


      </div>
    </section>
  );
}