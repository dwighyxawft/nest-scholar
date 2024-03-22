export interface ICourse {
    name: string;
    description: string;
    image: string;
    tutorId: string;
    startDate: Date;
    daysToFinish: number;
    endDate: Date;
    lastDayOfPayment: Date;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
  }
  