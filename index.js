const AttemptBtn = document.querySelector('.Attempt-btn');
const popInfo = document.querySelector('.popup-info');
const ExitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.mainpart');
const ContinueBtn = document.querySelector('.continue-btn');
const QuizSection = document.querySelector('.Quiz-section');
const quizBox =document.querySelector('.quiz-box');
const ScoreBox= document.querySelector('.Scoring-Box');
const TryAgainnBtn= document.querySelector('.next-attempt-btn');
const gohomebtn= document.querySelector('.home-btn');

AttemptBtn.onclick = () =>{
    popInfo.classList.add('active');
    main.classList.add('active');
}


ExitBtn.onclick = () =>{
    popInfo.classList.remove('active');
    main.classList.remove('active');
}

ContinueBtn.onclick = () =>{
    QuizSection.classList.add('active');
    popInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestion(0);
    QuestionCounting(1);
    ScorePart();
    
}
TryAgainnBtn.onclick = () =>{
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    ScoreBox.classList.remove('active');

 questionCount = 0;
 questionNumber = 1;
 userScore= 0;
 showQuestion(questionCount);
 QuestionCounting(questionNumber);

 ScorePart();
}
gohomebtn.onclick = () =>{
    QuizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    ScoreBox.classList.remove('active');

 questionCount = 0;
 questionNumber = 1;
 userScore= 0;
 showQuestion(questionCount);
 QuestionCounting(questionNumber);

 
}


let questionCount = 0;
let questionNumber = 1;
let userScore= 0;

const nextBtn = document.querySelector('.next-btn');
nextBtn.onclick = () => {
    if(questionCount < questionses.length -1){
        questionCount++;
        showQuestion(questionCount);

        questionNumber++;
        QuestionCounting(questionNumber);
        nextBtn.classList.remove('active');
    }
    else{
       
       showScoreBox();
    }
    
}

const ListOption =document.querySelector('.optionList');


function showQuestion(index){
    const questions=document.querySelector('.Question-part');
    questions.textContent=`${questionses[index].number}. ${questionses[index].question}`;

    let OPtag = `<div class="options"><span>${questionses[index].Option[0]}</span></div>
                 <div class="options"><span>${questionses[index].Option[1]}</span></div>
                 <div class="options"><span>${questionses[index].Option[2]}</span></div>
                 <div class="options"><span>${questionses[index].Option[3]}</span></div>`;
        ListOption.innerHTML = OPtag;

        const option = document.querySelectorAll('.options');
        for(let i =0;i <option.length;i++){
            option[i].setAttribute('onclick' , 'optionSelected(this)');
        }
 }
 function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questionses[questionCount].answer;
    let allOption = ListOption.children.length;
    


    if(userAnswer ==correctAnswer){
        answer.classList.add('correct');
        userScore +=1;
        ScorePart();
       }
    else{
        answer.classList.add('incorrect');
        //auto selecting correct one...
        for(let i=0;i< allOption;i++){
            if(ListOption.children[i].textContent == correctAnswer){
                ListOption.children[i].setAttribute('class','options correct');

            }
        }

    }

    //user if selected all 
    for(let i=0;i< allOption;i++){
        ListOption.children[i].classList.add('disabled');
    }
    nextBtn.classList.add('active');

 }

 function QuestionCounting(index){
    const questionToTal = document.querySelector('.question-total');
    questionToTal.textContent =  `${index} of ${questionses.length} question`; 
 }
 function ScorePart(){
    const ScorePartText = document.querySelector('.header-score');
    ScorePartText.textContent = `Score: ${userScore} / ${questionses.length}`;
 }
function showScoreBox(){
    quizBox.classList.remove('active');
    ScoreBox.classList.add('active');

    const scoreText = document.querySelector('.scores');
    scoreText.textContent=  `your Score ${userScore} out of ${questionses.length}`;

    const progress = document.querySelector('.Progress-bar');

    const progressValue = document.querySelector('.progress-bar-value');

    let ProgressStartValue=-1;
    let progressEndValue=(userScore/questionses.length)*100;
    let speed=20;

    let Progreses=setInterval(() => {
        ProgressStartValue++;
        //console.log(ProgressStartValue);
        progressValue.textContent = `${ProgressStartValue}%`;
        progress.style.background =`conic-gradient(#0614F1 ${ProgressStartValue *  4.6}deg , rgba(239, 12, 12,.8) 0deg)`;

        if(ProgressStartValue==progressEndValue){
            clearInterval(Progreses);
        }

    },speed);
}