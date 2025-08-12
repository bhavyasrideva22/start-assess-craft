import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AssessmentIntro } from '@/components/assessment/AssessmentIntro';
import { PsychometricSection } from '@/components/assessment/PsychometricSection';
import { TechnicalSection } from '@/components/assessment/TechnicalSection';
import { WiscarSection } from '@/components/assessment/WiscarSection';
import { ResultsPage } from '@/components/assessment/ResultsPage';
import { useAssessmentStore } from '@/stores/assessmentStore';

export type AssessmentSection = 
  | 'intro' 
  | 'psychometric' 
  | 'technical' 
  | 'wiscar' 
  | 'results';

const Assessment = () => {
  const [currentSection, setCurrentSection] = useState<AssessmentSection>('intro');
  const { responses, calculateScores, isComplete } = useAssessmentStore();

  const sections: { key: AssessmentSection; title: string; component: React.ComponentType }[] = [
    { key: 'intro', title: 'Introduction', component: AssessmentIntro },
    { key: 'psychometric', title: 'Psychometric Assessment', component: PsychometricSection },
    { key: 'technical', title: 'Technical & Aptitude', component: TechnicalSection },
    { key: 'wiscar', title: 'WISCAR Analysis', component: WiscarSection },
    { key: 'results', title: 'Results & Recommendations', component: ResultsPage },
  ];

  const currentIndex = sections.findIndex(s => s.key === currentSection);
  const progress = ((currentIndex + 1) / sections.length) * 100;

  const handleNext = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1].key);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1].key);
    }
  };

  const handleComplete = () => {
    calculateScores();
    setCurrentSection('results');
  };

  const CurrentComponent = sections[currentIndex].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Healthcare Data Analyst Assessment
          </h1>
          <p className="text-center text-muted-foreground">
            Discover your readiness for a career in Healthcare Data Analytics
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              {sections[currentIndex].title}
            </span>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {sections.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content */}
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">
              {sections[currentIndex].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CurrentComponent />
            
            {/* Navigation */}
            {currentSection !== 'intro' && currentSection !== 'results' && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                <Button
                  onClick={currentIndex === sections.length - 2 ? handleComplete : handleNext}
                  disabled={currentIndex === sections.length - 1 && !isComplete()}
                  className="flex items-center gap-2"
                >
                  {currentIndex === sections.length - 2 ? 'Complete Assessment' : 'Next'}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Intro Navigation */}
            {currentSection === 'intro' && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="flex items-center gap-2"
                >
                  Start Assessment
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;