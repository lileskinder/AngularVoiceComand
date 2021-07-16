import { Component, Inject, OnInit } from '@angular/core';
import {
  continuous,
  skipUntilSaid,
  SpeechRecognitionService,
  takeUntilSaid,
} from '@ng-web-apis/speech';

import { Observable } from 'rxjs';
import { map, repeat, retry, share } from 'rxjs/operators';

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.css']
})
export class SpeechComponent implements OnInit {


  constructor(
    @Inject(SpeechRecognitionService)
    private readonly recognition$: Observable<SpeechRecognitionResult[]>,
  ) { }

  transcript!: string;

  get record$(): Observable<SpeechRecognitionResult[]> {
    return this.result$.pipe(
      map(a => {
        this.transcript = a[0][0].transcript;
        console.log(a[0][0].transcript);
        return a}),
      repeat(),
      continuous(),
      
    );  
  }
  

  
  private get result$(): Observable<SpeechRecognitionResult[]> {
    return this.recognition$.pipe(retry(), repeat(), share());
  }

  ngOnInit(): void {
  }

}
