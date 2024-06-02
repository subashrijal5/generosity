import bcrypt from 'bcrypt';

import { Role } from '@/common/enums/enum';

import { db } from './connection';
import { courses, enrollments, instructors, users } from './schema';

// Sample data
const seedData = async () => {
  // Seed users
  await db.insert(users).values([
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: bcrypt.hashSync('securepassword', 10),
      role: Role.Student,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: bcrypt.hashSync('securepassword', 10),
      role: Role.Student,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  // Seed instructors
  await db.insert(instructors).values([
    {
      name: 'Dr. Alan Turing',
      email: 'alan.turing@example.com',
      designation: 'Professor',
      bio: 'Pioneer in computer science.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Dr. Ada Lovelace',
      email: 'ada.lovelace@example.com',
      designation: 'Assistant Professor',
      bio: 'First computer programmer.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  // Seed courses
  await db.insert(courses).values([
    {
      name: 'Introduction to Computer Science',
      description: 'Basics of computer science.',
      credits: 3,
      semester: 'first',
      timeslot: 'morning',
      instructorId: 1, // Assuming Alan Turing has ID 1
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Advanced Algorithms',
      description: 'Deep dive into algorithms.',
      credits: 4,
      semester: 'second',
      timeslot: 'afternoon',
      instructorId: 2, // Assuming Ada Lovelace has ID 2
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  // Seed enrollments
  await db.insert(enrollments).values([
    {
      userId: 1, // Assuming John Doe has ID 1
      courseId: 1, // Assuming Introduction to Computer Science has ID 1
      enrolledAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 1, // Assuming John Doe has ID 1
      courseId: 2, // Assuming Advanced Algorithms has ID 2
      enrolledAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

// Execute the seed script
seedData()
  .then(() => {
    console.log('Database seed successfully');
  })
  .catch((err) => {
    console.error('Error seeding database:', err);
  });
