export interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
}

export interface ConfirmedRegistration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  registeredAt: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  field?: 'fullName' | 'email' | 'phone';
  alreadyRegistered?: boolean;
  registration?: ConfirmedRegistration;
  whatsappGroupUrl?: string;
}

export interface TrainingConfig {
  whatsappGroupUrl: string;
  trainingDate: string;
  trainingTime?: string;
  organizer: string;
  topic: string;
  metaPixelId?: string;
}
