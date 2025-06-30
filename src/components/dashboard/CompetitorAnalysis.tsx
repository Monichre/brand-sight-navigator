
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const competitors = [
  { name: "Competitor A", mentions: 85, sentiment: 7.2 },
  { name: "Competitor B", mentions: 67, sentiment: 6.8 },
  { name: "Your Brand", mentions: 92, sentiment: 7.8 },
  { name: "Competitor C", mentions: 43, sentiment: 6.5 },
];

export function CompetitorAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Competitive Analysis</CardTitle>
        <CardDescription>
          Brand visibility vs competitors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {competitors.map((competitor, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-sm font-medium ${competitor.name === 'Your Brand' ? 'text-blue-600' : 'text-gray-700'}`}>
                {competitor.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {competitor.mentions}%
                </span>
                <span className="text-xs text-muted-foreground">
                  ({competitor.sentiment}/10)
                </span>
              </div>
            </div>
            <Progress 
              value={competitor.mentions} 
              className={competitor.name === 'Your Brand' ? 'bg-blue-100' : 'bg-gray-100'}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
