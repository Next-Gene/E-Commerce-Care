export interface ChatResponse {
    response: string;              // بدل answer
    timestamp: string;
    queryId: string;
    isEmergencyDetected: boolean;
    disclaimers: string[];
    recommendedActions: string[];
    confidenceLevel: string | number;  // ممكن يكون string زي "Medium" أو number حسب الحالة
  }
  