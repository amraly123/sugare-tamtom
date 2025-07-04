'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { suggestMarketingContentIdeas, SuggestMarketingContentIdeasOutput } from '@/ai/flows/marketing-content-suggestion';
import { suggestOptimalPostingTimes, SuggestOptimalPostingTimesOutput } from '@/ai/flows/optimal-posting-times';
import { Loader2, Wand2, Lightbulb, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { Badge } from '@/components/ui/badge';


const contentSchema = z.object({
  currentTrends: z.string().min(1, 'هذا الحقل مطلوب'),
  brandGuidelines: z.string().min(1, 'هذا الحقل مطلوب'),
  pastSuccessfulCampaigns: z.string().min(1, 'هذا الحقل مطلوب'),
  targetAudience: z.string().min(1, 'هذا الحقل مطلوب'),
});

type ContentFormData = z.infer<typeof contentSchema>;

const timingSchema = z.object({
  marketingContentDescription: z.string().min(1, 'هذا الحقل مطلوب'),
  targetAudience: z.string().min(1, 'هذا الحقل مطلوب'),
  brandGuidelines: z.string().min(1, 'هذا الحقل مطلوب'),
});

type TimingFormData = z.infer<typeof timingSchema>;

export default function AiAssistant() {
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [isTimingLoading, setIsTimingLoading] = useState(false);
  const [contentResult, setContentResult] = useState<SuggestMarketingContentIdeasOutput | null>(null);
  const [timingResult, setTimingResult] = useState<SuggestOptimalPostingTimesOutput | null>(null);
  const { toast } = useToast();

  const contentForm = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
  });

  const timingForm = useForm<TimingFormData>({
    resolver: zodResolver(timingSchema),
  });

  const onContentSubmit: SubmitHandler<ContentFormData> = async (data) => {
    setIsContentLoading(true);
    setContentResult(null);
    try {
      const result = await suggestMarketingContentIdeas(data);
      setContentResult(result);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء الأفكار. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsContentLoading(false);
    }
  };

  const onTimingSubmit: SubmitHandler<TimingFormData> = async (data) => {
    setIsTimingLoading(true);
    setTimingResult(null);
    try {
      const result = await suggestOptimalPostingTimes(data);
      setTimingResult(result);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء اقتراح التوقيت. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsTimingLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
            <Wand2 className="h-8 w-8 text-primary" />
            <div>
                <CardTitle className="font-headline text-xl">مساعد التسويق بالذكاء الاصطناعي</CardTitle>
                <CardDescription>احصل على أفكار ومقترحات لحملاتك التسويقية.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content-ideas" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content-ideas">
              <Lightbulb className="ml-2 h-4 w-4" />
              أفكار المحتوى
            </TabsTrigger>
            <TabsTrigger value="optimal-times">
              <Clock className="ml-2 h-4 w-4" />
              أفضل أوقات النشر
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="content-ideas" className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <form onSubmit={contentForm.handleSubmit(onContentSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="targetAudience">الجمهور المستهدف</Label>
                  <Input id="targetAudience" {...contentForm.register('targetAudience')} />
                  {contentForm.formState.errors.targetAudience && <p className="text-sm text-destructive">{contentForm.formState.errors.targetAudience.message}</p>}
                </div>
                <div>
                  <Label htmlFor="currentTrends">الاتجاهات الحالية</Label>
                  <Textarea id="currentTrends" {...contentForm.register('currentTrends')} placeholder="مثل: ملابس مستدامة، ألوان الباستيل..."/>
                  {contentForm.formState.errors.currentTrends && <p className="text-sm text-destructive">{contentForm.formState.errors.currentTrends.message}</p>}
                </div>
                <div>
                  <Label htmlFor="brandGuidelines">إرشادات العلامة التجارية</Label>
                  <Textarea id="brandGuidelines" {...contentForm.register('brandGuidelines')} placeholder="مثل: نبرة صوت مرحة، استخدام ألوان زاهية..."/>
                  {contentForm.formState.errors.brandGuidelines && <p className="text-sm text-destructive">{contentForm.formState.errors.brandGuidelines.message}</p>}
                </div>
                <div>
                  <Label htmlFor="pastSuccessfulCampaigns">الحملات الناجحة السابقة</Label>
                  <Textarea id="pastSuccessfulCampaigns" {...contentForm.register('pastSuccessfulCampaigns')} placeholder="مثل: حملة العودة للمدارس، تخفيضات الصيف..."/>
                  {contentForm.formState.errors.pastSuccessfulCampaigns && <p className="text-sm text-destructive">{contentForm.formState.errors.pastSuccessfulCampaigns.message}</p>}
                </div>
                <Button type="submit" disabled={isContentLoading} className="w-full">
                  {isContentLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                  إنشاء أفكار
                </Button>
              </form>
              <div className="rounded-lg bg-muted p-6 h-full min-h-[400px]">
                {isContentLoading && <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
                {contentResult && (
                  <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-2">الأفكار المقترحة:</h3>
                        <ul className="list-disc list-inside space-y-2">
                          {contentResult.contentIdeas.map((idea, index) => <li key={index}>{idea}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">القنوات المقترحة:</h3>
                        <div className="flex flex-wrap gap-2">
                          {contentResult.suggestedChannels.map((channel, index) => <Badge key={index} variant="secondary">{channel}</Badge>)}
                        </div>
                    </div>
                     <div>
                        <h3 className="font-bold text-lg mb-2">أفضل أوقات النشر:</h3>
                        <p>{contentResult.optimalPostingTimes}</p>
                     </div>
                  </div>
                )}
                 {!isContentLoading && !contentResult && <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground"><Lightbulb className="h-12 w-12 mb-4"/> <p>أدخل التفاصيل في النموذج لبدء إنشاء أفكار محتوى مذهلة.</p></div>}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="optimal-times" className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <form onSubmit={timingForm.handleSubmit(onTimingSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="marketingContentDescription">وصف المحتوى التسويقي</Label>
                  <Textarea id="marketingContentDescription" {...timingForm.register('marketingContentDescription')} placeholder="مثل: إعلان عن مجموعة الفساتين الجديدة..."/>
                   {timingForm.formState.errors.marketingContentDescription && <p className="text-sm text-destructive">{timingForm.formState.errors.marketingContentDescription.message}</p>}
                </div>
                <div>
                  <Label htmlFor="timingTargetAudience">الجمهور المستهدف</Label>
                  <Input id="timingTargetAudience" {...timingForm.register('targetAudience')} />
                   {timingForm.formState.errors.targetAudience && <p className="text-sm text-destructive">{timingForm.formState.errors.targetAudience.message}</p>}
                </div>
                <div>
                  <Label htmlFor="timingBrandGuidelines">إرشادات العلامة التجارية</Label>
                  <Textarea id="timingBrandGuidelines" {...timingForm.register('brandGuidelines')} />
                   {timingForm.formState.errors.brandGuidelines && <p className="text-sm text-destructive">{timingForm.formState.errors.brandGuidelines.message}</p>}
                </div>
                <Button type="submit" disabled={isTimingLoading} className="w-full">
                  {isTimingLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                  اقترح التوقيت
                </Button>
              </form>
              <div className="rounded-lg bg-muted p-6 h-full min-h-[400px]">
                {isTimingLoading && <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
                {timingResult && (
                  <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-2">الأوقات المقترحة:</h3>
                        <ul className="list-disc list-inside space-y-2">
                          {timingResult.suggestedPostingTimes.map((time, index) => <li key={index}>{time}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">القنوات المقترحة:</h3>
                         <div className="flex flex-wrap gap-2">
                          {timingResult.suggestedChannels.map((channel, index) => <Badge key={index} variant="secondary">{channel}</Badge>)}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">الأساس المنطقي:</h3>
                        <p className="text-sm">{timingResult.rationale}</p>
                    </div>
                  </div>
                )}
                 {!isTimingLoading && !timingResult && <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground"><Clock className="h-12 w-12 mb-4"/> <p>قدم وصفًا للمحتوى الخاص بك للحصول على اقتراحات التوقيت الأمثل.</p></div>}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
