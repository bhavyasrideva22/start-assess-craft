import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Users, Shield, Target, Clock } from 'lucide-react';

export const AssessmentIntro = () => {
  return (
    <div className="space-y-6">
      {/* Purpose */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Purpose of the Assessment</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          This comprehensive assessment evaluates whether you are psychologically, cognitively, 
          and technically ready to pursue a career in Healthcare Data Analytics. Our holistic 
          approach provides personalized guidance based on your unique profile.
        </p>
      </section>

      {/* What is Healthcare Data Analytics */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">What is Healthcare Data Analytics?</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A dynamic field combining data analysis, healthcare systems knowledge, and technology 
          to extract actionable insights from patient records, hospital systems, and public 
          health databases to improve healthcare outcomes.
        </p>
      </section>

      {/* Career Paths */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Typical Career Paths</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Healthcare Data Analyst',
            'Clinical Data Specialist',
            'Health Information Technician',
            'Medical Informatics Analyst',
            'Population Health Data Analyst'
          ].map(career => (
            <div key={career} className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-medium">{career}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Success Traits */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Traits That Lead to Success</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            'Analytical mindset',
            'Attention to detail',
            'Tech comfort',
            'Healthcare interest',
            'Systematic thinking',
            'Ethical reasoning'
          ].map(trait => (
            <Badge key={trait} variant="secondary" className="px-3 py-1">
              {trait}
            </Badge>
          ))}
        </div>
      </section>

      {/* Assessment Details */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Clock className="w-5 h-5" />
            Assessment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Duration:</span>
            <span className="text-sm font-medium">20-30 minutes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Sections:</span>
            <span className="text-sm font-medium">4 main sections</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Question Types:</span>
            <span className="text-sm font-medium">Multiple choice, scenarios, scales</span>
          </div>
          <div className="flex items-start gap-2 pt-2 border-t border-primary/20">
            <Shield className="w-4 h-4 text-primary mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Your responses are confidential and used only to generate your personalized 
              career guidance report.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};