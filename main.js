Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach(' #camera');

function take_snapshot()
{
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
});
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5XNOMB4V2/',modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classifiy(img, gotResult);
}

function speak()
{
var synth = window.speechSynthesis;
speak_data_1 = "The prediction is " + prediction_1;
var utterThis = new SpeechSynthesisUtterance(speak_data_1);
synth.speak(utterThis);
}


function gotResult()
{
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_guesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "thumbs up")
        {
            document.getElementById("update_gesture").innerHTML = "&#128077";
        }
        if(results[0].label == "high five") 
        {
            document.getElementById("update_gesture").innerHTML = "&128400";
        }
        if(results[0].label == "victory")
        {
            document.getElementById("update_gesture").innerHTML = "&#9996";
        }
    }
}