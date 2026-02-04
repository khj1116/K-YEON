
export type UserType = 'woman' | 'man' | null;

export interface SimulationResult {
  livingCost: string;
  educationInfo: string;
  languageRoute: string;
  customAdvice: string;
}

export interface AptitudeReport {
  score: number;
  traits: string[];
  summary: string;
  adviceForMen: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
