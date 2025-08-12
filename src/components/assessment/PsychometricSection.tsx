import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useAssessmentStore } from '@/stores/assessmentStore';

export const PsychometricSection = () => {
  const { updateResponse, getResponse } = useAssessmentStore();

  const interestQuestions = [
    {
      id: 'interest-1',
      text: 'You discover a pattern in patient readmission data that could reduce costs by 15%. How excited would this make you?',
      type: 'likert'
    },
    {
      id: 'interest-2',
      text: 'Which scenario interests you more?',
      type: 'choice',
      options: [
        { value: 5, text: 'Analyzing hospital infection trends to improve patient safety' },
        { value: 3, text: 'Creating marketing campaigns for consumer products' },
        { value: 1, text: 'Managing social media content for brands' }
      ]
    },
    {
      id: 'interest-3',
      text: 'How much do you enjoy working with healthcare-related data and outcomes?',
      type: 'likert'
    }
  ];

  const personalityQuestions = [
    {
      id: 'personality-1',
      text: 'I pay close attention to details and accuracy in my work',
      type: 'likert'
    },
    {
      id: 'personality-2',
      text: 'I enjoy exploring new technologies and analytical tools',
      type: 'likert'
    },
    {
      id: 'personality-3',
      text: 'I can handle working with sensitive and confidential information responsibly',
      type: 'likert'
    },
    {
      id: 'personality-4',
      text: 'I work well independently on complex analytical tasks',
      type: 'likert'
    }
  ];

  const cognitiveQuestions = [
    {
      id: 'cognitive-1',
      text: 'I prefer work environments that are:',
      type: 'choice',
      options: [
        { value: 5, text: 'Structured with clear methodologies and processes' },
        { value: 3, text: 'Balanced between structure and flexibility' },
        { value: 1, text: 'Completely open-ended and creative' }
      ]
    },
    {
      id: 'cognitive-2',
      text: 'When solving problems, I prefer:',
      type: 'choice',
      options: [
        { value: 5, text: 'Systematic, step-by-step analytical approaches' },
        { value: 3, text: 'A mix of analysis and creative thinking' },
        { value: 1, text: 'Intuitive and creative solutions' }
      ]
    }
  ];

  const motivationQuestions = [
    {
      id: 'motivation-1',
      text: 'I persist through challenging problems even when progress is slow',
      type: 'likert'
    },
    {
      id: 'motivation-2',
      text: 'I believe my abilities can be developed through dedication and hard work',
      type: 'likert'
    },
    {
      id: 'motivation-3',
      text: 'I am passionate about using data to improve healthcare outcomes',
      type: 'likert'
    }
  ];

  const renderLikertQuestion = (question: any) => (
    <Card key={question.id} className="mb-4">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <p className="font-medium">{question.text}</p>
          <div className="px-4">
            <Slider
              value={[getResponse('psychometric', question.id) || 3]}
              onValueChange={(value) => updateResponse('psychometric', question.id, value[0])}
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
      </CardContent>
    </Card>
  );

  const renderChoiceQuestion = (question: any) => (
    <Card key={question.id} className="mb-4">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <p className="font-medium">{question.text}</p>
          <RadioGroup
            value={getResponse('psychometric', question.id)?.toString() || ''}
            onValueChange={(value) => updateResponse('psychometric', question.id, parseInt(value))}
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
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Interest Scale */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Interest Scale</CardTitle>
            <p className="text-sm text-muted-foreground">
              Measure your natural interest in healthcare data analytics scenarios.
            </p>
          </CardHeader>
          <CardContent>
            {interestQuestions.map(question =>
              question.type === 'likert' ? renderLikertQuestion(question) : renderChoiceQuestion(question)
            )}
          </CardContent>
        </Card>
      </section>

      {/* Personality Compatibility */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personality Compatibility</CardTitle>
            <p className="text-sm text-muted-foreground">
              Assess traits aligned with success in healthcare analytics.
            </p>
          </CardHeader>
          <CardContent>
            {personalityQuestions.map(renderLikertQuestion)}
          </CardContent>
        </Card>
      </section>

      {/* Cognitive Style */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cognitive Style & Preferences</CardTitle>
            <p className="text-sm text-muted-foreground">
              Understand your preferred working and thinking styles.
            </p>
          </CardHeader>
          <CardContent>
            {cognitiveQuestions.map(renderChoiceQuestion)}
          </CardContent>
        </Card>
      </section>

      {/* Motivation & Grit */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Motivation & Grit</CardTitle>
            <p className="text-sm text-muted-foreground">
              Evaluate your perseverance and growth mindset.
            </p>
          </CardHeader>
          <CardContent>
            {motivationQuestions.map(renderLikertQuestion)}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};