
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BarChart3, Shield, Zap, Globe, TrendingUp, Users } from "lucide-react";

const Index = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">BrandRadar.ai</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Button onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
                <Button onClick={handleGetStarted}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4" variant="secondary">
            AI-Powered Brand Monitoring
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Track Your Brand Across
            <span className="text-blue-600"> AI Models</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Monitor how your brand is represented across OpenAI, Gemini, Perplexity, and other AI models. 
            Get real-time insights, sentiment analysis, and competitive intelligence powered by AI.
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <Button size="lg" onClick={handleGetStarted} className="px-8">
              Start Monitoring
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comprehensive Brand Intelligence
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Multi-LLM Monitoring</CardTitle>
                <CardDescription>
                  Track your brand across OpenAI, Gemini, Perplexity, and more
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Sentiment Analysis</CardTitle>
                <CardDescription>
                  Real-time sentiment tracking and narrative framing analysis
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Competitive Intel</CardTitle>
                <CardDescription>
                  Compare your brand visibility against competitors
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-yellow-600 mb-2" />
                <CardTitle>Real-time Alerts</CardTitle>
                <CardDescription>
                  Instant notifications for brand mentions and sentiment changes
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Globe className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle>Citation Mapping</CardTitle>
                <CardDescription>
                  Track which sources influence AI model responses
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Deep insights with interactive dashboards and reports
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Monitoring Your Brand Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join forward-thinking companies using AI-powered brand intelligence
          </p>
          <Button size="lg" variant="secondary" onClick={handleGetStarted} className="px-8">
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BarChart3 className="h-6 w-6" />
            <span className="text-xl font-bold">BrandRadar.ai</span>
          </div>
          <p className="text-gray-400">
            AI-powered brand monitoring for the future
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
