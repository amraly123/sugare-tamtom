'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Wand } from 'lucide-react';
import { generateAdCopy, GenerateAdCopyOutput } from '@/ai/flows/generate-ad-copy';
import { useToast } from "@/hooks/use-toast"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const readyPrompts = [
    {
        id: 'new_collection',
        title: 'إعلان عن تشكيلة جديدة',
        template: 'اكتب إعلان جذاب لإطلاق تشكيلتنا الجديدة من {productName}. ركز على الألوان المبهجة والخامات المريحة التي تناسب الأطفال.',
        inputs: ['productName']
    },
    {
        id: 'special_offer',
        title: 'إعلان عن عرض خاص',
        template: 'أنشئ نص إعلاني قصير ومغري عن عرضنا الخاص: {offerDetails} على منتج {productName}. استخدم عبارات تشجع على الشراء السريع.',
        inputs: ['productName', 'offerDetails']
    },
    {
        id: 'holiday_season',
        title: 'إعلان لموسم الأعياد',
        template: 'صياغة إعلان دافئ بمناسبة موسم الأعياد. يجب أن يذكر الإعلان منتج {productName} كهدية مثالية للأطفال.',
        inputs: ['productName']
    }
];

type FormData = {
    productName: string;
    offerDetails: string;
};

export default function ReadyPrompts() {
  const [loadingPrompt, setLoadingPrompt] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateAdCopyOutput | null>(null);
  const [formData, setFormData] = useState<FormData>({ productName: '', offerDetails: '' });
  const { toast } = useToast();

  const handleGenerate = async (promptTemplate: string) => {
    setLoadingPrompt(promptTemplate);
    setResult(null);
    try {
      const adResult = await generateAdCopy({
        promptTemplate,
        productName: formData.productName,
        offerDetails: formData.offerDetails,
      });
      setResult(adResult);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء الإعلان. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setLoadingPrompt(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Wand className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-xl">برومبتات جاهزة</CardTitle>
            <CardDescription>اختر برومبت، املأ التفاصيل، واحصل على إعلان فوري.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
            <div>
              <Label htmlFor="productName">اسم المنتج/التشكيلة</Label>
              <Input
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="مثال: فساتين الربيع"
              />
            </div>
             <div>
              <Label htmlFor="offerDetails">تفاصيل العرض (اختياري)</Label>
              <Input
                id="offerDetails"
                name="offerDetails"
                value={formData.offerDetails}
                onChange={handleInputChange}
                placeholder="مثال: خصم 20%، قطعة والثانية مجانًا"
              />
            </div>
            <Accordion type="single" collapsible className="w-full">
              {readyPrompts.map(prompt => (
                <AccordionItem value={prompt.id} key={prompt.id}>
                  <AccordionTrigger>{prompt.title}</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{prompt.template}</p>
                     <Button 
                        onClick={() => handleGenerate(prompt.template)} 
                        disabled={loadingPrompt === prompt.template || !formData.productName}
                        className="w-full"
                    >
                      {loadingPrompt === prompt.template ? (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="ml-2 h-4 w-4" />
                      )}
                      إنشاء الإعلان
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
        </div>
        <div className="rounded-lg bg-muted p-6 h-full min-h-[300px]">
           {loadingPrompt && <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
           {result && (
             <div className="space-y-4">
                <h3 className="font-bold">الإعلان الجاهز:</h3>
                <Textarea value={result.adCopy} readOnly rows={10} className="bg-background text-base"/>
                <Button onClick={() => navigator.clipboard.writeText(result.adCopy)}>نسخ الإعلان</Button>
             </div>
           )}
           {!loadingPrompt && !result && (
             <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Sparkles className="h-12 w-12 mb-4"/>
                <p>ستظهر نتائج الإعلانات هنا.</p>
             </div>
           )}
        </div>
      </CardContent>
    </Card>
  );
}
