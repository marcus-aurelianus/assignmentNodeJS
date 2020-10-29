function validateUser(userEntity){

  if (Object.prototype.hasOwnProperty.call(userEntity, 'name') && Object.prototype.hasOwnProperty.call(userEntity, 'email')){
    return true;
  }

  return false;
}

export default function validateRequestBody(requestBody){
  if (Object.prototype.hasOwnProperty.call(requestBody, 'teacher') && Object.prototype.hasOwnProperty.call(requestBody, 'students')
      && Object.prototype.hasOwnProperty.call(requestBody, 'subject') && Object.prototype.hasOwnProperty.call(requestBody, 'class')
      && requestBody !== undefined && requestBody !== null && requestBody.constructor == Object){

    if (!validateUser(requestBody.teacher)){
      return 'wrong format in teacher';
    }

    for (const student of requestBody.students){
      if (!validateUser(student)){
        return 'wrong format in students';
      }
    }

    if (!Object.prototype.hasOwnProperty.call(requestBody.subject, 'subjectCode')
      || !Object.prototype.hasOwnProperty.call(requestBody.subject, 'name')){
      return 'wrong format in subject';
    }

    if (!Object.prototype.hasOwnProperty.call(requestBody.class, 'classCode')
      || !Object.prototype.hasOwnProperty.call(requestBody.class, 'name')){
      return 'wrong format in class';
    }

    return 'correct format';
  }
  return 'missing required properties';
}
