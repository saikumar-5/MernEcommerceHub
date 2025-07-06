import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
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
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#00d9ff] mb-4">
            &lt;Contact Me/&gt;
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                I'm always interested in discussing new opportunities,
                innovative projects, or just having a conversation about
                cybersecurity and technology.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#00d9ff]/10 rounded-lg">
                  <Mail className="w-6 h-6 text-[#00d9ff]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <p className="text-gray-400">Available via contact form</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#00d9ff]/10 rounded-lg">
                  <MapPin className="w-6 h-6 text-[#00d9ff]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Location</h4>
                  <p className="text-gray-400">Gurugram, Haryana, India</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#00d9ff]/10 rounded-lg">
                  <Clock className="w-6 h-6 text-[#00d9ff]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Response Time</h4>
                  <p className="text-gray-400">Usually within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <Card className="bg-gray-800/30 border-gray-700">
            <CardContent className="p-8">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-400">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="mt-4 border-gray-600 text-gray-300 hover:border-[#00d9ff] hover:text-white"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <Input
                        {...form.register("name")}
                        placeholder="Your Name"
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#00d9ff]"
                      />
                      {form.formState.errors.name && (
                        <p className="text-red-400 text-sm mt-1">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <Input
                        {...form.register("email")}
                        type="email"
                        placeholder="your.email@example.com"
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#00d9ff]"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-400 text-sm mt-1">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <Input
                      {...form.register("subject")}
                      placeholder="Project Inquiry"
                      className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#00d9ff]"
                    />
                    {form.formState.errors.subject && (
                      <p className="text-red-400 text-sm mt-1">
                        {form.formState.errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <Textarea
                      {...form.register("message")}
                      placeholder="Your message here..."
                      rows={5}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#00d9ff] resize-none"
                    />
                    {form.formState.errors.message && (
                      <p className="text-red-400 text-sm mt-1">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-[#00d9ff] hover:bg-[#00b8e6] text-black font-semibold py-3"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}