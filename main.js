  previous_result = "";
  function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classify = ml5.imageClassifier("MobileNet", model_loaded);
  var synth = window.speechSynthesis;
}

function draw(){
  image(video, 0, 0,300, 300);
  classify.classify(video, got_result);

}

function model_loaded(){
  console.log("model loaded");
}

function got_result(error, results){
  if(error){
    console.error(error);
  } else{
    console.log(results);
    object_name = results[0].label;
    confidence = results[0].confidence.toFixed(2);
    if(confidence > 0.5 && previous_result!=object_name){ 
      previous_result = object_name
      document.getElementById("result_object_name").innerHTML = object_name;
    document.getElementById("result_object_accuracy").innerHTML = confidence;
    speak_data = "object identified is " + object_name;
    var speak_object = new SpeechSynthesisUtterance(speak_data);
    synth.speak(speak_object);
    }
  }
}


