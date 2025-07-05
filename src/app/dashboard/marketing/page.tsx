import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AiAssistant from './components/ai-assistant';
import ReadyPrompts from './components/ready-prompts';
import { Wand2, Sparkles } from "lucide-react";

export default function MarketingPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">إدارة التسويق</h1>
        <p className="text-muted-foreground">تخطيط الحملات، تحليل الأداء، والحصول على أفكار إبداعية.</p>
      </div>
      
      <Tabs defaultValue="ai-assistant" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="ai-assistant">
            <Wand2 className="ml-2 h-4 w-4" />
            مساعد التسويق الذكي
          </TabsTrigger>
          <TabsTrigger value="ready-prompts">
            <Sparkles className="ml-2 h-4 w-4" />
            برومبتات جاهزة
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ai-assistant">
          <AiAssistant />
        </TabsContent>
        <TabsContent value="ready-prompts">
          <ReadyPrompts />
        </TabsContent>
      </Tabs>
    </div>
  );
}
