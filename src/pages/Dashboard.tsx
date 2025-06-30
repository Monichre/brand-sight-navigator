
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { BrandOverview } from "@/components/dashboard/BrandOverview";
import { MentionsStream } from "@/components/dashboard/MentionsStream";
import { SentimentChart } from "@/components/dashboard/SentimentChart";
import { CompetitorAnalysis } from "@/components/dashboard/CompetitorAnalysis";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate('/auth');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Brand Monitoring Dashboard</h1>
          <p className="text-gray-600">Track your brand mentions across AI models and platforms</p>
        </div>

        <div className="grid gap-6">
          {/* Brand Overview */}
          <BrandOverview />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Mentions Stream */}
            <div className="lg:col-span-2">
              <MentionsStream />
            </div>

            {/* Sentiment Analysis */}
            <div className="space-y-6">
              <SentimentChart />
              <CompetitorAnalysis />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
