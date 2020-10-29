import Logger from '../config/logger';
const LOG = new Logger('RegisterService.js');
import {Teacher} from '../config/database';


export default async function WorkloadService(){
  const records = await Teacher.findAll();

  LOG.info('start from convert database all records to count object');
  if (records.length){
    let resultCount = {};
    for (const record of records){
      // subject code us unique there fore we use it as a key
      if (!Object.prototype.hasOwnProperty.call(resultCount, record.name)){

        // intialize result count object regarding each teacher
        resultCount[record.name] = {};

        // add subject field for each subject and count the class
        resultCount[record.name][record.subjectCode] = {subjectCode:record.subjectCode,subjectName:record.subjectName};
        resultCount[record.name][record.subjectCode].numberOfClasses = 1;

        // add subject field for each subject and count the class
      } else if (!Object.prototype.hasOwnProperty.call(resultCount[record.name], [record.subjectCode])){
        resultCount[record.name][record.subjectCode] = {subjectCode:record.subjectCode,subjectName:record.subjectName};
        resultCount[record.name][record.subjectCode].numberOfClasses = 1;
      }
      // add class if subject and teacher are intialized alrd
      else{
        resultCount[record.name][record.subjectCode].numberOfClasses += 1;
      }
    }

    let result = {};

    // convert from count object to the result object
    LOG.info('convert from count object to the result object');
    for (const eachTeacher in resultCount){
      result[eachTeacher] = [];

      // each Subject is the key we set earlier
      for (const eachSubject in resultCount[eachTeacher]){
        result[eachTeacher].push(resultCount[eachTeacher][eachSubject]);
      }
    }

    LOG.info(`the work load is ${JSON.stringify(result)}`);
    return result;
  }else{
    return null;
  }

}
