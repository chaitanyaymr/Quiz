import { DataProvider } from './../../providers/data/data';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FlashCardComponent } from '../../components/flash-card/flash-card';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('slides') slides:any;
  hasAnswered:boolean=false;
  score:number=0;
  slideOption:any;
  questions:any;

  constructor(public navCtrl: NavController,private db:DataProvider) {

  }
  ionViewDidLoad(){
   this.slides.lockSwipes(true);
   this.db.loadData().then((data)=>{
        data.map((question)=>{
          let originalOrder=question.answers;
          question.answers=this.randomizeAnswers(originalOrder);
          return question;
        });
        this.questions=data;
   });
  }

nextSlide(){
  this.slides.lockSwipes(false);
  this.slides.slideNext();
  this.slides.lockSwipes(true);
}

 selectAnswer(answer,question)
 {
   this.hasAnswered=true;
   answer.selected=true;
   question.flashCardFlipped=true;
   if(answer.correct)
   {
     this.score++;
   }
   setTimeout(() => {
     this.hasAnswered=false;
     this.nextSlide();
     answer.selected=false;
     question.flashCardFlipped=false;
   }, 3000);
 }

 randomizeAnswers(rawanswers:any[]):any[]{
   for(let i=rawanswers.length-1;i>0;i--)
   {
     let j=Math.floor(Math.random()*(i+1));
     let temp=rawanswers[i];
     rawanswers[i]=rawanswers[j];
     rawanswers[j]=temp;
   }
   return rawanswers;
 }
  restartQuiz()
  {
    this.score=0;
    this.slides.lockSwipes(false);
    this.slides.slideTo(1,1000);
    this.slides.lockSwipes(true);
  }


}
