import {
  teacherOneENGInput,
  teacherOneMATHFirstInput,
  teacherOneMATHSecondInput,
  teacherOneMATHThirdInput,
  teacherTwoENGFirstInput,
  teacherTwoENGSecondInput,
  wrongTeacherFormatInput,
  wrongStudentFormatInput,
  wrongSubjectFormatInput,
  wrongClassFormatInput} from './userServiceTestConstant';
// eslint-disable-next-line no-unused-vars
import sequelize from '../src/config/database';
import RegisterUserService from '../src/services/RegisterUserService';
import WorkloadService from '../src/services/WorkloadService';

describe('Register Service Test', () => {
  test('it should tell wrong format in teacher', async function(){
    const input = await RegisterUserService(wrongTeacherFormatInput);
    const output = 'wrong format in teacher';
    expect(input).toEqual(output);
  });
});

describe('Register Service Test', () => {
  test('it should tell wrong format in student', async function(){
    const input = await RegisterUserService(wrongStudentFormatInput);
    const output = 'wrong format in students';
    expect(input).toEqual(output);
  });
});



describe('Register Service Test', () => {
  test('it should tell wrong format in subject', async function(){
    const input = await RegisterUserService(wrongSubjectFormatInput);
    const output = 'wrong format in subject';
    expect(input).toEqual(output);
  });
});


describe('Register Service Test', () => {
  test('it should tell wrong format in class', async function(){
    const input = await RegisterUserService(wrongClassFormatInput);
    const output = 'wrong format in class';
    expect(input).toEqual(output);
  });
});

describe('Register Service Test', () => {
  test('it should tell the format is correct', async function(){
    const input = await RegisterUserService(teacherOneENGInput);
    const output = 'success';
    expect(input).toEqual(output);
  });
});


describe('Register Service Test1', () => {
  test('it should tell the correct workload', async function(){
    await RegisterUserService(teacherOneENGInput);
    await RegisterUserService(teacherOneMATHFirstInput);
    await RegisterUserService(teacherOneMATHSecondInput);
    await RegisterUserService(teacherOneMATHThirdInput);
    await RegisterUserService(teacherTwoENGFirstInput);
    await RegisterUserService(teacherTwoENGSecondInput);
    const input = await WorkloadService();
    const output =
    {
      'Teacher 1': [
        { subjectCode: 'ENG',
          subjectName: 'English',
          numberOfClasses: 1
        },
        {
          subjectCode: 'MATH',
          subjectName: 'Mathematics',
          numberOfClasses: 3
        }
      ],
      'Teacher 2': [
        { subjectCode: 'ENG',
          subjectName: 'English',
          numberOfClasses: 2
        }
      ]
    };
    expect(input).toMatchObject(output)
  });
});

