import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { Download, RefreshCw, CheckCircle, AlertTriangle, XCircle, TrendingUp, User, Lightbulb, Target } from 'lucide-react';

export const ResultsPage = () => {
  const { scores, reset } = useAssessmentStore();

  if (!scores) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Calculating your results...</p>
      </div>
    );
  }

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case 'yes': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'maybe': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'no': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'yes': return 'text-green-600 bg-green-50 border-green-200';
      case 'maybe': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'no': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRecommendationText = (rec: string) => {
    switch (rec) {
      case 'yes': return 'Proceed with Healthcare Data Analytics';
      case 'maybe': return 'Consider Healthcare Data Analytics with Preparation';
      case 'no': return 'Explore Alternative Career Paths';
      default: return 'Assessment Incomplete';
    }
  };

  const getScoreInterpretation = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-green-600' };
    if (score >= 60) return { label: 'Good', color: 'text-blue-600' };
    if (score >= 40) return { label: 'Fair', color: 'text-yellow-600' };
    return { label: 'Needs Development', color: 'text-red-600' };
  };

  const careerPaths = [
    {
      title: 'Healthcare Data Analyst',
      description: 'Analyze clinical and operational data to improve healthcare outcomes',
      match: scores.confidence >= 75 ? 'High' : scores.confidence >= 50 ? 'Medium' : 'Low'
    },
    {
      title: 'Clinical Data Specialist',
      description: 'Manage and analyze clinical trial and research data',
      match: scores.technical.overall >= 70 ? 'High' : 'Medium'
    },
    {
      title: 'Medical Informatics Analyst',
      description: 'Design and optimize healthcare information systems',
      match: scores.technical.programming >= 60 ? 'High' : 'Medium'
    },
    {
      title: 'Population Health Analyst',
      description: 'Track disease trends and community health patterns',
      match: scores.psychological.interest >= 70 ? 'High' : 'Medium'
    }
  ];

  const skillGaps = [];
  if (scores.technical.programming < 60) skillGaps.push('Programming & SQL Skills');
  if (scores.technical.healthcareDomain < 60) skillGaps.push('Healthcare Domain Knowledge');
  if (scores.psychological.personality < 60) skillGaps.push('Analytical Thinking');

  return (
    <div className="space-y-6">
      {/* Overall Recommendation */}
      <Card className={`border-2 ${getRecommendationColor(scores.recommendation)}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getRecommendationIcon(scores.recommendation)}
            {getRecommendationText(scores.recommendation)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Confidence Score</span>
                <span className="text-lg font-bold">{Math.round(scores.confidence)}%</span>
              </div>
              <Progress value={scores.confidence} className="h-3" />
            </div>
            
            <div className="text-sm text-muted-foreground">
              {scores.recommendation === 'yes' && 
                "You show strong alignment with healthcare data analytics. Your combination of interest, skills, and cognitive fit indicates good potential for success in this field."
              }
              {scores.recommendation === 'maybe' && 
                "You have potential for healthcare data analytics but may benefit from additional preparation in key areas before pursuing this career path."
              }
              {scores.recommendation === 'no' && 
                "Based on your current profile, you might want to consider alternative career paths that better align with your interests and strengths."
              }
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Psychological Fit */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <User className="w-4 h-4" />
              Psychological Fit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round(scores.psychological.overall)}%</div>
              <div className={`text-xs ${getScoreInterpretation(scores.psychological.overall).color}`}>
                {getScoreInterpretation(scores.psychological.overall).label}
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Interest:</span>
                <span>{Math.round(scores.psychological.interest)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Personality:</span>
                <span>{Math.round(scores.psychological.personality)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Motivation:</span>
                <span>{Math.round(scores.psychological.motivation)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Readiness */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Technical Readiness
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round(scores.technical.overall)}%</div>
              <div className={`text-xs ${getScoreInterpretation(scores.technical.overall).color}`}>
                {getScoreInterpretation(scores.technical.overall).label}
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Logic:</span>
                <span>{Math.round(scores.technical.logicalReasoning)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Quantitative:</span>
                <span>{Math.round(scores.technical.quantitative)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Healthcare:</span>
                <span>{Math.round(scores.technical.healthcareDomain)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* WISCAR Profile */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="w-4 h-4" />
              WISCAR Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round(scores.wiscar.overall)}%</div>
              <div className={`text-xs ${getScoreInterpretation(scores.wiscar.overall).color}`}>
                {getScoreInterpretation(scores.wiscar.overall).label}
              </div>
            </div>
            <div className="space-y-1 text-xs">
              {[
                { label: 'Will', score: scores.wiscar.will },
                { label: 'Interest', score: scores.wiscar.interest },
                { label: 'Skill', score: scores.wiscar.skill },
                { label: 'Cognitive', score: scores.wiscar.cognitive },
                { label: 'Ability', score: scores.wiscar.ability },
                { label: 'Real-World', score: scores.wiscar.realWorld }
              ].map(item => (
                <div key={item.label} className="flex justify-between">
                  <span>{item.label}:</span>
                  <span>{Math.round(item.score)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Career Paths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Recommended Career Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {careerPaths.map((path, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{path.title}</h4>
                  <Badge variant={path.match === 'High' ? 'default' : path.match === 'Medium' ? 'secondary' : 'outline'}>
                    {path.match} Match
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{path.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill Gaps & Learning Path */}
      {skillGaps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Areas for Development</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Focus on these areas to strengthen your healthcare data analytics profile:
              </p>
              <div className="flex flex-wrap gap-2">
                {skillGaps.map((gap, index) => (
                  <Badge key={index} variant="outline" className="text-orange-600 border-orange-200">
                    {gap}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Learning Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle>Suggested Learning Path</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { stage: 'Stage 1', title: 'Data Foundations', skills: 'Excel, Basic Statistics, Data Visualization' },
              { stage: 'Stage 2', title: 'Healthcare Systems', skills: 'EHR Systems, HIPAA, Healthcare Terminology' },
              { stage: 'Stage 3', title: 'Technical Skills', skills: 'SQL, Tableau, Basic Python' },
              { stage: 'Stage 4', title: 'Advanced Analytics', skills: 'Clinical Data Analysis, Predictive Modeling' },
              { stage: 'Stage 5', title: 'Specialization', skills: 'Real-World Projects, Industry Certifications' }
            ].map((stage, index) => (
              <div key={index} className="flex gap-4 p-3 border rounded-lg">
                <div className="flex-shrink-0 w-16 text-sm font-medium text-primary">
                  {stage.stage}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{stage.title}</div>
                  <div className="text-sm text-muted-foreground">{stage.skills}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button variant="outline" onClick={() => window.print()}>
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
        <Button variant="outline" onClick={reset}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Retake Assessment
        </Button>
      </div>
    </div>
  );
};