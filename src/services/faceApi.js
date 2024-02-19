import * as faceapi from 'face-api.js';


// Load face-api.js models
export const loadFaceApiModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')

};

// Detect faces in an image
export const detectFace = async (imageElement) => {
    const result = await faceapi.detectSingleFace(imageElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
    const faceMatcher = new faceapi.FaceMatcher(result);
   
    return faceMatcher;
};


export const recognizeSingleFace = async (queryDescriptor, descriptors) => {


    const results = await faceapi
    .detectAllFaces(descriptors)
    .withFaceLandmarks()
    .withFaceDescriptors()

    console.log('result....',results)
  
  if (!results.length) {
    return
  }
  // create FaceMatcher with automatically assigned labels
  // from the detection results for the reference image
  const faceMatcher = new faceapi.FaceMatcher(results);
  const singleResult = await faceapi
  .detectSingleFace(queryDescriptor)
  .withFaceLandmarks()
  .withFaceDescriptor()

// if (singleResult) {
//   const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor)
//   console.log('best matchhhhh',bestMatch.toString());
//   const isBestMatch=bestMatch.toString();
//   if(isBestMatch<=0.5){
//     console.log(isBestMatch)
//     return true;
//   }
//   return false
// }

console.log('single result...',singleResult)
if (singleResult) {
    const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor);

    // Extract the confidence value from the bestMatch.toString()
    const confidence = bestMatch._distance;

    console.log('Confidence:', confidence);

    // Compare the confidence value as a number
    if (confidence <= 0.5) {
        console.log('Matched with confidence:', confidence);
        return true;
    }

    console.log('Not matched with confidence:', confidence);
    return false;
}

return false;

};
