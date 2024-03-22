export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    country: string;
    image: string;
    gender: "male" | "female";
    verified: boolean;
    coursesEnrolled: string[]; // Assuming course IDs for simplicity
    activeCourse: string; // Assuming course ID
    freeCourseUsed: boolean;
    date_ob: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  