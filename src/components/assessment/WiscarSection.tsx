import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useAssessmentStore } from '@/stores/assessmentStore';

export const WiscarSection = () => {
  const { updateResponse, getResponse } = useAssessmentStore();

  const wiscarQuestions = [
    // Will (Drive)
    {
      id: 'will-1',
      dimension: 'Will',
      text: 'I have a strong drive to succeed in healthcare analytics',
      type: 'likert'
    },
    {
      id: 'will-2',
      dimension: 'Will',
      text: 'I am willing to invest significant time learning new technical skills',
      type: 'likert'
    },

    // Interest
    {
      id: 'wiscar-interest-1',
      dimension: 'Interest',
      text: 'Working with healthcare data to improve patient outcomes excites me',
      type: 'likert'
    },
    {
      id: 'wiscar-interest-2',
      dimension: 'Interest',
      text: 'I find myself naturally curious about healthcare trends and statistics',
      type: 'likert'
    },

    // Skill
    {
      id: 'skill-1',
      dimension: 'Skill',
      text: 'How would you rate your current data analysis abilities?',
      type: 'choice',
      options: [
        { value: 1, text: 'Beginner - Little to no experience' },
        { value: 2, text: 'Basic - Can work with simple spreadsheets' },
        { value: 3, text: 'Intermediate - Comfortable with Excel, basic statistics' },
        { value: 4, text: 'Advanced - Experience with SQL, data visualization tools' },
        { value: 5, text: 'Expert - Proficient in multiple programming languages and advanced analytics' }
      ]
    },
    {
      id: 'skill-2',
      dimension: 'Skill',
      text: 'How quickly do you typically learn new technical concepts?',
      type: 'choice',
      options: [
        { value: 1, text: 'Very slowly - Need extensive practice and support' },
        { value: 2, text: 'Slowly - Prefer step-by-step guidance' },
        { value: 3, text: 'Moderately - Can learn with some effort' },
        { value: 4, text: 'Quickly - Pick up new concepts with minimal guidance' },
        { value: 5, text: 'Very quickly - Can master new tools independently' }
      ]
    },

    // Cognitive
    {
      id: 'wiscar-cognitive-1',
      dimension: 'Cognitive',
      text: 'I enjoy breaking down complex problems into manageable parts',
      type: 'likert'
    },
    {
      id: 'wiscar-cognitive-2',
      dimension: 'Cognitive',
      text: 'I think systematically and methodically when analyzing information',
      type: 'likert'
    },

    // Ability (Learning Potential)
    {
      id: 'ability-1',
      dimension: 'Ability',
      text: 'I actively seek feedback to improve my performance',
      type: 'likert'
    },
    {
      id: 'ability-2',
      dimension: 'Ability',
      text: 'I adapt quickly when learning new methodologies or tools',
      type: 'likert'
    },

    // Real-World Alignment
    {
      id: 'real-world-1',
      dimension: 'Real-World',
      text: 'Which work environment appeals to you most?',
      type: 'choice',
      options: [
        { value: 5, text: 'Hospital or healthcare system analytics department' },
        { value: 4, text: 'Healthcare consulting firm' },
        { value: 3, text: 'Health tech startup' },
        { value: 2, text: 'General corporate analytics role' },
        { value: 1, text: 'Non-analytical role in any setting' }
      ]
    },
    {
      id: 'real-world-2',
      dimension: 'Real-World',
      text: 'How important is work-life balance to you in your career choice?',
      type: 'choice',
      options: [
        { value: 3, text: 'Very important - Need flexible hours and low stress' },
        { value: 4, text: 'Somewhat important - Willing to work hard but need balance' },
        { value: 5, text: 'Less important - Career growth and impact matter more' },
        { value: 2, text: 'Not sure what to expect in healthcare analytics' }
      ]
    }
  ];

  const renderLikertQuestion = (question: any) => (
    <div key={question.id} className="space-y-4 p-4 border rounded-lg">
      <div className="flex items-start justify-between">
        <p className="font-medium flex-1">{question.text}</p>
        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded ml-4">
          {question.dimension}
        </span>
      </div>
      <div className="px-4">
        <Slider
          value={[getResponse('wiscar', question.id) || 3]}
          onValueChange={(value) => updateResponse('wiscar', question.id, value[0])}
          max={5}
          min={1}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>Strongly Disagree</span>
          <span>Neutral</span>
          <span>Strongly Agree</span>
        </div>
      </div>
    </div>
  );

  const renderChoiceQuestion = (question: any) => (
    <div key={question.id} className="space-y-4 p-4 border rounded-lg">
      <div className="flex items-start justify-between">
        <p className="font-medium flex-1">{question.text}</p>
        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded ml-4">
          {question.dimension}
        </span>
      </div>
      <RadioGroup
        value={getResponse('wiscar', question.id)?.toString() || ''}
        onValueChange={(value) => updateResponse('wiscar', question.id, parseInt(value))}
      >
        {question.options.map((option: any, index: number) => (
          <div key={index} className="flex items-start space-x-2">
            <RadioGroupItem value={option.value.toString()} id={`${question.id}-${index}`} className="mt-1" />
            <Label htmlFor={`${question.id}-${index}`} className="text-sm leading-relaxed cursor-pointer">
              {option.text}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  const dimensions = ['Will', 'Interest', 'Skill', 'Cognitive', 'Ability', 'Real-World'];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">WISCAR Framework Analysis</CardTitle>
          <p className="text-sm text-muted-foreground">
            Comprehensive assessment across six core readiness dimensions: Will, Interest, Skill, Cognitive fit, Ability to learn, and Real-world alignment.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 mb-6">
            <div className="text-sm font-medium">Assessment Dimensions:</div>
            <div className="flex flex-wrap gap-2">
              {dimensions.map(dim => (
                <span key={dim} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {dim}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {wiscarQuestions.map(question =>
              question.type === 'likert' ? renderLikertQuestion(question) : renderChoiceQuestion(question)
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};