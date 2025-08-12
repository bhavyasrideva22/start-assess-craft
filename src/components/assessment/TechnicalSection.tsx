import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useAssessmentStore } from '@/stores/assessmentStore';

export const TechnicalSection = () => {
  const { updateResponse, getResponse } = useAssessmentStore();

  const logicalReasoningQuestions = [
    {
      id: 'logical-1',
      text: 'If Patient A has diabetes (D) and hypertension (H), and all diabetic patients in the dataset require medication monitoring (M), what can we conclude?',
      options: [
        { value: 'correct', text: 'Patient A requires medication monitoring' },
        { value: 'incorrect', text: 'Patient A has cardiovascular disease' },
        { value: 'incorrect', text: 'All hypertensive patients have diabetes' },
        { value: 'incorrect', text: 'Patient A does not need monitoring' }
      ]
    },
    {
      id: 'logical-2',
      text: 'In a flowchart, if "Patient arrives" → "Triage assessment" → "Priority level assigned", what comes next logically?',
      options: [
        { value: 'incorrect', text: 'Patient leaves' },
        { value: 'correct', text: 'Patient directed to appropriate care level' },
        { value: 'incorrect', text: 'Patient billed' },
        { value: 'incorrect', text: 'Patient registered again' }
      ]
    }
  ];

  const quantitativeQuestions = [
    {
      id: 'quant-1',
      text: 'Hospital A has a 12% readmission rate with 500 patients. Hospital B has a 15% readmission rate with 400 patients. Which hospital has more total readmissions?',
      options: [
        { value: 'correct', text: 'Hospital A (60 readmissions)' },
        { value: 'incorrect', text: 'Hospital B (60 readmissions)' },
        { value: 'incorrect', text: 'They are equal' },
        { value: 'incorrect', text: 'Cannot determine from given data' }
      ]
    },
    {
      id: 'quant-2',
      text: 'If the average length of stay (LOS) for surgery patients is 3.2 days with a standard deviation of 1.1 days, what does this tell us?',
      options: [
        { value: 'incorrect', text: 'All patients stay exactly 3.2 days' },
        { value: 'correct', text: 'Most patients stay between 2.1-4.3 days' },
        { value: 'incorrect', text: 'The data is normally distributed' },
        { value: 'incorrect', text: 'There are no outliers' }
      ]
    }
  ];

  const programmingQuestions = [
    {
      id: 'programming-1',
      text: 'Which SQL query would find all patients with diabetes in a patient table?',
      options: [
        { value: 'incorrect', text: 'SELECT * WHERE diabetes = true' },
        { value: 'correct', text: 'SELECT * FROM patients WHERE diagnosis = "diabetes"' },
        { value: 'incorrect', text: 'FIND patients diabetes = yes' },
        { value: 'incorrect', text: 'GET diabetes FROM patients' }
      ]
    },
    {
      id: 'programming-2',
      text: 'In Excel, which formula calculates the average of cells A1 through A10?',
      options: [
        { value: 'incorrect', text: '=SUM(A1:A10)/10' },
        { value: 'correct', text: '=AVERAGE(A1:A10)' },
        { value: 'incorrect', text: '=MEAN(A1:A10)' },
        { value: 'incorrect', text: '=AVG(A1-A10)' }
      ]
    }
  ];

  const healthcareQuestions = [
    {
      id: 'healthcare-1',
      text: 'What does EHR stand for in healthcare?',
      options: [
        { value: 'incorrect', text: 'Emergency Health Response' },
        { value: 'correct', text: 'Electronic Health Record' },
        { value: 'incorrect', text: 'External Health Registry' },
        { value: 'incorrect', text: 'Enhanced Health Reporting' }
      ]
    },
    {
      id: 'healthcare-2',
      text: 'HIPAA primarily deals with:',
      options: [
        { value: 'incorrect', text: 'Hospital staffing requirements' },
        { value: 'incorrect', text: 'Medical device regulations' },
        { value: 'correct', text: 'Patient privacy and data security' },
        { value: 'incorrect', text: 'Insurance billing procedures' }
      ]
    },
    {
      id: 'healthcare-3',
      text: 'What is a key metric for measuring hospital efficiency?',
      options: [
        { value: 'incorrect', text: 'Number of parking spaces' },
        { value: 'correct', text: 'Average Length of Stay (LOS)' },
        { value: 'incorrect', text: 'Number of employees' },
        { value: 'incorrect', text: 'Building square footage' }
      ]
    }
  ];

  const renderQuestionSection = (title: string, description: string, questions: any[]) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="space-y-4">
            <p className="font-medium">{question.text}</p>
            <RadioGroup
              value={getResponse('technical', question.id) || ''}
              onValueChange={(value) => updateResponse('technical', question.id, value)}
            >
              {question.options.map((option: any, index: number) => (
                <div key={index} className="flex items-start space-x-2">
                  <RadioGroupItem value={option.value} id={`${question.id}-${index}`} className="mt-1" />
                  <Label htmlFor={`${question.id}-${index}`} className="text-sm leading-relaxed cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {renderQuestionSection(
        'Logical Reasoning',
        'Test your ability to work with healthcare data logic and patterns.',
        logicalReasoningQuestions
      )}

      {renderQuestionSection(
        'Quantitative Aptitude',
        'Evaluate your skills with basic statistics and healthcare metrics.',
        quantitativeQuestions
      )}

      {renderQuestionSection(
        'Programming & Data Literacy',
        'Assess your familiarity with data tools and basic programming concepts.',
        programmingQuestions
      )}

      {renderQuestionSection(
        'Healthcare Domain Awareness',
        'Test your understanding of healthcare systems and terminology.',
        healthcareQuestions
      )}
    </div>
  );
};