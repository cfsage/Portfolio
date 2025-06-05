import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ContactQuotesForm = () => {
  return (
    <Card className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <CardContent className="p-6">
        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="contact">Contact Me</TabsTrigger>
            <TabsTrigger value="quotes">Request a Quote</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contact">
            <h3 className="text-2xl font-bold mb-6 text-center">Contact Me</h3>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="contactName" className="text-sm font-medium">Your Name</label>
                <Input id="contactName" name="contactName" placeholder="John Smith" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="contactEmail" className="text-sm font-medium">Your Email</label>
                <Input id="contactEmail" name="contactEmail" type="email" placeholder="john@example.com" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="contactMessage" className="text-sm font-medium">Your Message</label>
                <Textarea id="contactMessage" name="contactMessage" placeholder="How can I help you?" rows={5} required />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </TabsContent>
          
          <TabsContent value="quotes">
            <h3 className="text-2xl font-bold mb-6 text-center">Request a Quote</h3>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="quoteName" className="text-sm font-medium">Your Name</label>
                <Input id="quoteName" name="quoteName" placeholder="John Smith" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="quoteEmail" className="text-sm font-medium">Your Email</label>
                <Input id="quoteEmail" name="quoteEmail" type="email" placeholder="john@example.com" required />
              </div>
              
              {/* Client Type Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Client Type</label>
                <RadioGroup defaultValue="individual">
                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual">Individual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="business" id="business" />
                      <Label htmlFor="business">Business</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nonprofit" id="nonprofit" />
                      <Label htmlFor="nonprofit">Non-Profit</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="quoteService" className="text-sm font-medium">Service Interested In</label>
                <Input id="quoteService" name="quoteService" placeholder="e.g., Web Development, Video Editing" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="quoteBudget" className="text-sm font-medium">Estimated Budget</label>
                <Input id="quoteBudget" name="quoteBudget" placeholder="e.g., $1,000 - $5,000" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="quoteTimeline" className="text-sm font-medium">Project Timeline</label>
                <Input id="quoteTimeline" name="quoteTimeline" placeholder="e.g., 2 weeks, 1 month, etc." />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="quoteDetails" className="text-sm font-medium">Project Details</label>
                <Textarea id="quoteDetails" name="quoteDetails" placeholder="Describe your project requirements, goals, and any specific needs." rows={5} required />
              </div>
              
              <Button type="submit" className="w-full">Submit Quote Request</Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContactQuotesForm;