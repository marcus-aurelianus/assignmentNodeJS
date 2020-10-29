import Logger from '../config/logger';
import validateRequestBody from '../utils/validateRequestBody';
const LOG = new Logger('RegisterService.js');
import {Teacher} from '../config/database';

async function queryBaseOnSubjectAndClass(subjectCode,classCode){
  return Teacher.findAll({
    where: {
      subjectCode,
      classCode
    }
  });
}

export default async function RegisterUserService(requestBody){

  LOG.info('Validating the request body');
  const validRequestBodyResult = validateRequestBody(requestBody);
  LOG.info(`the validation result is ${validRequestBodyResult}`);

  if (validRequestBodyResult === 'correct format'){
    // destructure the requestbody, class is a system varibale so cannot be destruct here
    const {teacher,students,subject} = requestBody;
    const {name,email} = teacher;
    const subjectCode = subject.subjectCode,subjectName = subject.name, classCode = requestBody.class.classCode,className = requestBody.class.name;

    // query the other teachers who teach also on the subject and class code, make sure the students are the same
    const teachers = await queryBaseOnSubjectAndClass(subjectCode,classCode);

    let teacherCreatedForThisClassAndSubject = false;
    for (const teacher of teachers){
      // if the class already existed sync all the students in this class to the latest
      teacher.students = students;
      await teacher.save();
      LOG.info(`Updating students for ${teacher.name} for subject ${subjectName} and class ${className} in the database`);
      if (teacher.email == email){
        teacherCreatedForThisClassAndSubject = true;
      }
    }

    // if teacher for this class have not been add in, add it in now
    if (!teacherCreatedForThisClassAndSubject){
      await Teacher.create({name,email,students,subjectCode,subjectName,classCode,className});
      LOG.info(`Insert the Teacher ${name} teaching subject ${subjectName} and class ${className} in the database`);
    }

    return 'success';

  } else {

    return validRequestBodyResult;

  }
}
