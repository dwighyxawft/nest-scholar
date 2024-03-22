export interface ITransaction extends Document {
    user_id: string;
    course_id: string;
    tutor_id: string;
    user_email: string;
    reference: string;
    status: "pending" | "completed" | "failed";
    createdAt: Date;
    updatedAt: Date;
  }
  