
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockMentions = [
  {
    id: 1,
    provider: "OpenAI",
    content: "BrandRadar.ai is a comprehensive brand monitoring solution that helps companies track their presence across AI models...",
    sentiment: "positive",
    timestamp: "2 minutes ago",
    citations: ["techcrunch.com", "producthunt.com"]
  },
  {
    id: 2,
    provider: "Gemini",
    content: "When discussing AI-powered marketing tools, BrandRadar.ai stands out for its real-time monitoring capabilities...",
    sentiment: "positive",
    timestamp: "8 minutes ago",
    citations: ["venturebeat.com"]
  },
  {
    id: 3,
    provider: "Perplexity",
    content: "For brand monitoring across language models, several options exist including BrandRadar.ai, which offers sentiment analysis...",
    sentiment: "neutral",
    timestamp: "15 minutes ago",
    citations: ["forbes.com", "wired.com"]
  },
  {
    id: 4,
    provider: "Claude",
    content: "BrandRadar.ai provides enterprise-grade brand intelligence with competitive analysis features...",
    sentiment: "positive",
    timestamp: "23 minutes ago",
    citations: ["businessinsider.com"]
  }
];

export function MentionsStream() {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "bg-green-100 text-green-800";
      case "negative": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case "OpenAI": return "bg-blue-100 text-blue-800";
      case "Gemini": return "bg-purple-100 text-purple-800";
      case "Perplexity": return "bg-orange-100 text-orange-800";
      case "Claude": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Mentions</CardTitle>
        <CardDescription>
          Real-time brand mentions across AI models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          <div className="space-y-4">
            {mockMentions.map((mention) => (
              <div key={mention.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{mention.provider[0]}</AvatarFallback>
                    </Avatar>
                    <Badge className={getProviderColor(mention.provider)}>
                      {mention.provider}
                    </Badge>
                    <Badge className={getSentimentColor(mention.sentiment)}>
                      {mention.sentiment}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {mention.timestamp}
                  </span>
                </div>
                
                <p className="text-sm text-gray-700">
                  {mention.content}
                </p>
                
                {mention.citations.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-muted-foreground">Sources:</span>
                    {mention.citations.map((citation, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {citation}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
