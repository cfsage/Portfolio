import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    projectType: "small",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, projectType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        projectType: "small",
        budget: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
        <p className="section-subtitle">Have a project in mind? Let's work together!</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Contact Form (Left Side) */}
          <Card className="animate-fade-in hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-6 text-center">Contact Us</h3>
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                <motion.div className="space-y-2" variants={itemVariants}>
                  <label htmlFor="contactName" className="text-sm font-medium">Your Name</label>
                  <Input 
                    id="contactName"
                    name="name"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="transition-all duration-300 hover:border-portfolio-primary/50 focus:border-portfolio-primary focus:ring-portfolio-primary/30"
                  />
                </motion.div>
                
                <motion.div className="space-y-2" variants={itemVariants}>
                  <label htmlFor="contactEmail" className="text-sm font-medium">Your Email</label>
                  <Input 
                    id="contactEmail"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="transition-all duration-300 hover:border-portfolio-primary/50 focus:border-portfolio-primary focus:ring-portfolio-primary/30"
                  />
                </motion.div>
                
                <motion.div className="space-y-2" variants={itemVariants}>
                  <label htmlFor="contactSubject" className="text-sm font-medium">Subject</label>
                  <Input 
                    id="contactSubject"
                    name="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="transition-all duration-300 hover:border-portfolio-primary/50 focus:border-portfolio-primary focus:ring-portfolio-primary/30"
                  />
                </motion.div>
                
                <motion.div className="space-y-2" variants={itemVariants}>
                  <label htmlFor="contactMessage" className="text-sm font-medium">Your Message</label>
                  <Textarea 
                    id="contactMessage"
                    name="message"
                    placeholder="How can I help you?"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="transition-all duration-300 hover:border-portfolio-primary/50 focus:border-portfolio-primary focus:ring-portfolio-primary/30"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Button 
                    type="submit" 
                    className="w-full relative overflow-hidden group" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span>Send Message</span>
                    )}
                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Button>
                </motion.div>
              </motion.form>
            </CardContent>
          </Card>
          
          {/* Quote Form (Right Side) */}
          <Card className="animate-fade-in hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-6 text-center">Project Quote</h3>
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div className="space-y-2" variants={itemVariants}>
                    <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                    <Input 
                      id="name"
                      name="name"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="transition-all duration-300 hover:border-portfolio-primary/50 focus:border-portfolio-primary focus:ring-portfolio-primary/30"
                    />
                  </motion.div>
                  <motion.div className="space-y-2" variants={itemVariants}>
                    <label htmlFor="email" className="text-sm font-medium">Your Email</label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="transition-all duration-300 hover:border-portfolio-primary/50 focus:border-portfolio-primary focus:ring-portfolio-primary/30"
                    />
                  </motion.div>
                </div>

                <motion.div className="space-y-2" variants={itemVariants}>
                  <label className="text-sm font-medium">Project Size</label>
                  <RadioGroup value={formData.projectType} onValueChange={handleRadioChange} className="flex flex-wrap gap-2">
                    <div className="flex items-center space-x-2 transition-all duration-200 hover:text-portfolio-primary">
                      <RadioGroupItem value="small" id="small" />
                      <Label htmlFor="small" className="cursor-pointer">Small</Label>
                    </div>
                    <div className="flex items-center space-x-2 transition-all duration-200 hover:text-portfolio-primary">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium" className="cursor-pointer">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2 transition-all duration-200 hover:text-portfolio-primary">
                      <RadioGroupItem value="large" id="large" />
                      <Label htmlFor="large" className="cursor-pointer">Large</Label>
                    </div>
                    <div className="flex items-center space-x-2 transition-all duration-200 hover:text-portfolio-primary">
                      <RadioGroupItem value="enterprise" id="enterprise" />
                      <Label htmlFor="enterprise" className="cursor-pointer">Enterprise</Label>
                    </div>
                  </RadioGroup>
                </motion.div>

                <motion.div className="space-y-2" variants={itemVariants}>
                  <label htmlFor="budget" className="text-sm font-medium">Budget Range</label>
                  <Input 
                    id="budget"
                    name="budget"
                    placeholder="Your budget range"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="transition-all duration-300 hover:border-portfolio-primary/50 focus:border-portfolio-primary focus:ring-portfolio-primary/30"
                  />
                </motion.div>

                <motion.div className="space-y-2" variants={itemVariants}>
                  <label htmlFor="message" className="text-sm font-medium">Project Details</label>
                  <Textarea 
                    id="message"
                    name="message"
                    placeholder="Tell me about your project requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="transition-all duration-300 hover:border-portfolio-primary/50 focus:border-portfolio-primary focus:ring-portfolio-primary/30"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button 
                    type="submit" 
                    className="w-full relative overflow-hidden group" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span>Get Quote</span>
                    )}
                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Button>
                </motion.div>
              </motion.form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
