import AiAssistant from './components/ai-assistant';

export default function MarketingPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">إدارة التسويق</h1>
        <p className="text-muted-foreground">تخطيط الحملات، تحليل الأداء، والحصول على أفكار إبداعية.</p>
      </div>
      
      <AiAssistant />
    </div>
  );
}
