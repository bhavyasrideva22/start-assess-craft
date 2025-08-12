import { create } from 'zustand';

export interface AssessmentResponse {
  sectionId: string;
  questionId: string;
  answer: any;
}

export interface AssessmentScores {
  psychological: {
    interest: number;
    personality: number;
    cognitiveStyle: number;
    motivation: number;
    overall: number;
  };
  technical: {
    logicalReasoning: number;
    quantitative: number;
    programming: number;
    healthcareDomain: number;
    overall: number;
  };
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
    overall: number;
  };
  confidence: number;
  recommendation: 'yes' | 'no' | 'maybe';
}

interface AssessmentStore {
  responses: AssessmentResponse[];
  scores: AssessmentScores | null;
  isComplete: () => boolean;
  addResponse: (response: AssessmentResponse) => void;
  updateResponse: (sectionId: string, questionId: string, answer: any) => void;
  getResponse: (sectionId: string, questionId: string) => any;
  calculateScores: () => void;
  reset: () => void;
}

export const useAssessmentStore = create<AssessmentStore>((set, get) => ({
  responses: [],
  scores: null,

  isComplete: () => {
    const responses = get().responses;
    const requiredSections = ['psychometric', 'technical', 'wiscar'];
    return requiredSections.every(section => 
      responses.some(r => r.sectionId === section)
    );
  },

  addResponse: (response: AssessmentResponse) => {
    set(state => ({
      responses: [...state.responses.filter(r => 
        !(r.sectionId === response.sectionId && r.questionId === response.questionId)
      ), response]
    }));
  },

  updateResponse: (sectionId: string, questionId: string, answer: any) => {
    get().addResponse({ sectionId, questionId, answer });
  },

  getResponse: (sectionId: string, questionId: string) => {
    const response = get().responses.find(r => 
      r.sectionId === sectionId && r.questionId === questionId
    );
    return response?.answer;
  },

  calculateScores: () => {
    const responses = get().responses;
    
    // Calculate psychological scores
    const psychResponses = responses.filter(r => r.sectionId === 'psychometric');
    const interestScore = calculateInterestScore(psychResponses);
    const personalityScore = calculatePersonalityScore(psychResponses);
    const cognitiveStyleScore = calculateCognitiveStyleScore(psychResponses);
    const motivationScore = calculateMotivationScore(psychResponses);
    const psychOverall = (interestScore + personalityScore + cognitiveStyleScore + motivationScore) / 4;

    // Calculate technical scores
    const techResponses = responses.filter(r => r.sectionId === 'technical');
    const logicalScore = calculateLogicalScore(techResponses);
    const quantitativeScore = calculateQuantitativeScore(techResponses);
    const programmingScore = calculateProgrammingScore(techResponses);
    const healthcareScore = calculateHealthcareScore(techResponses);
    const techOverall = (logicalScore + quantitativeScore + programmingScore + healthcareScore) / 4;

    // Calculate WISCAR scores
    const wiscarResponses = responses.filter(r => r.sectionId === 'wiscar');
    const willScore = calculateWillScore(wiscarResponses);
    const wiscarInterestScore = calculateWiscarInterestScore(wiscarResponses);
    const skillScore = calculateSkillScore(wiscarResponses);
    const wiscarCognitiveScore = calculateWiscarCognitiveScore(wiscarResponses);
    const abilityScore = calculateAbilityScore(wiscarResponses);
    const realWorldScore = calculateRealWorldScore(wiscarResponses);
    const wiscarOverall = (willScore + wiscarInterestScore + skillScore + wiscarCognitiveScore + abilityScore + realWorldScore) / 6;

    // Calculate overall confidence and recommendation
    const confidence = (psychOverall + techOverall + wiscarOverall) / 3;
    const recommendation = confidence >= 75 ? 'yes' : confidence >= 50 ? 'maybe' : 'no';

    const scores: AssessmentScores = {
      psychological: {
        interest: interestScore,
        personality: personalityScore,
        cognitiveStyle: cognitiveStyleScore,
        motivation: motivationScore,
        overall: psychOverall,
      },
      technical: {
        logicalReasoning: logicalScore,
        quantitative: quantitativeScore,
        programming: programmingScore,
        healthcareDomain: healthcareScore,
        overall: techOverall,
      },
      wiscar: {
        will: willScore,
        interest: wiscarInterestScore,
        skill: skillScore,
        cognitive: wiscarCognitiveScore,
        ability: abilityScore,
        realWorld: realWorldScore,
        overall: wiscarOverall,
      },
      confidence,
      recommendation,
    };

    set({ scores });
  },

  reset: () => {
    set({ responses: [], scores: null });
  },
}));

// Helper functions to calculate scores
function calculateInterestScore(responses: AssessmentResponse[]): number {
  const interestResponses = responses.filter(r => r.questionId.includes('interest'));
  if (interestResponses.length === 0) return 50;
  
  const sum = interestResponses.reduce((acc, r) => acc + (typeof r.answer === 'number' ? r.answer : 3), 0);
  return Math.min(100, (sum / interestResponses.length) * 20);
}

function calculatePersonalityScore(responses: AssessmentResponse[]): number {
  const personalityResponses = responses.filter(r => r.questionId.includes('personality'));
  if (personalityResponses.length === 0) return 50;
  
  const sum = personalityResponses.reduce((acc, r) => acc + (typeof r.answer === 'number' ? r.answer : 3), 0);
  return Math.min(100, (sum / personalityResponses.length) * 20);
}

function calculateCognitiveStyleScore(responses: AssessmentResponse[]): number {
  const cognitiveResponses = responses.filter(r => r.questionId.includes('cognitive'));
  if (cognitiveResponses.length === 0) return 50;
  
  const sum = cognitiveResponses.reduce((acc, r) => acc + (typeof r.answer === 'number' ? r.answer : 3), 0);
  return Math.min(100, (sum / cognitiveResponses.length) * 20);
}

function calculateMotivationScore(responses: AssessmentResponse[]): number {
  const motivationResponses = responses.filter(r => r.questionId.includes('motivation'));
  if (motivationResponses.length === 0) return 50;
  
  const sum = motivationResponses.reduce((acc, r) => acc + (typeof r.answer === 'number' ? r.answer : 3), 0);
  return Math.min(100, (sum / motivationResponses.length) * 20);
}

function calculateLogicalScore(responses: AssessmentResponse[]): number {
  const logicalResponses = responses.filter(r => r.questionId.includes('logical'));
  const correctAnswers = logicalResponses.filter(r => r.answer === 'correct').length;
  return Math.min(100, (correctAnswers / Math.max(1, logicalResponses.length)) * 100);
}

function calculateQuantitativeScore(responses: AssessmentResponse[]): number {
  const quantResponses = responses.filter(r => r.questionId.includes('quant'));
  const correctAnswers = quantResponses.filter(r => r.answer === 'correct').length;
  return Math.min(100, (correctAnswers / Math.max(1, quantResponses.length)) * 100);
}

function calculateProgrammingScore(responses: AssessmentResponse[]): number {
  const progResponses = responses.filter(r => r.questionId.includes('programming'));
  const correctAnswers = progResponses.filter(r => r.answer === 'correct').length;
  return Math.min(100, (correctAnswers / Math.max(1, progResponses.length)) * 100);
}

function calculateHealthcareScore(responses: AssessmentResponse[]): number {
  const healthResponses = responses.filter(r => r.questionId.includes('healthcare'));
  const correctAnswers = healthResponses.filter(r => r.answer === 'correct').length;
  return Math.min(100, (correctAnswers / Math.max(1, healthResponses.length)) * 100);
}

function calculateWillScore(responses: AssessmentResponse[]): number {
  const willResponses = responses.filter(r => r.questionId.includes('will'));
  if (willResponses.length === 0) return 50;
  
  const sum = willResponses.reduce((acc, r) => acc + (typeof r.answer === 'number' ? r.answer : 3), 0);
  return Math.min(100, (sum / willResponses.length) * 20);
}

function calculateWiscarInterestScore(responses: AssessmentResponse[]): number {
  const interestResponses = responses.filter(r => r.questionId.includes('wiscar-interest'));
  if (interestResponses.length === 0) return 50;
  
  const sum = interestResponses.reduce((acc, r) => acc + (typeof r.answer === 'number' ? r.answer : 3), 0);
  return Math.min(100, (sum / interestResponses.length) * 20);
}

function calculateSkillScore(responses: AssessmentResponse[]): number {
  const skillResponses = responses.filter(r => r.questionId.includes('skill'));
  if (skillResponses.length === 0) return 50;
  
  const sum = skillResponses.reduce((acc, r) => acc + (typeof r.answer === 'number' ? r.answer : 3), 0);
  return Math.min(100, (sum / skillResponses.length) * 20);
}

function calculateWiscarCognitiveScore(responses: AssessmentResponse[]): number {
  const cognitiveResponses = responses.filter(r => r.questionId.includes('wiscar-cognitive'));
  if (cognitiveResponses.length === 0) return 50;
  
  const sum = cognitiveResponses.reduce((acc, r) => acc + (typeof r.answer === 'number' ? r.answer : 3), 0);
  return Math.min(100, (sum / cognitiveResponses.length) * 20);
}

function calculateAbilityScore(responses: AssessmentResponse[]): number {
  const abilityResponses = responses.filter(r => r.questionId.includes('ability'));
  if (abilityResponses.length === 0) return 50;
  
  const sum = abilityResponses.reduce((acc, r) => acc + (typeof r.answer === 'number' ? r.answer : 3), 0);
  return Math.min(100, (sum / abilityResponses.length) * 20);
}

function calculateRealWorldScore(responses: AssessmentResponse[]): number {
  const realWorldResponses = responses.filter(r => r.questionId.includes('real-world'));
  if (realWorldResponses.length === 0) return 50;
  
  const sum = realWorldResponses.reduce((acc, r) => acc + (typeof r.answer === 'number' ? r.answer : 3), 0);
  return Math.min(100, (sum / realWorldResponses.length) * 20);
}