import { Component } from '@angular/core';
import { Store, createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';

export interface CounterState {
  count: number,
  text: string
}

export interface AppState {
  count : CounterState
}


export const incrementValue = createAction("Increment")
export const decrementValue = createAction("Decrement")


export const setValue = createAction("SetValue", props<{ count: number}>())

export const counterReducer = createReducer(
  { count: 0, text: "No Text"}, 

  on(decrementValue, (state) => {{
    return { ...state, count: state.count - 1}
  }}),
  on(incrementValue,  (state) => {
    return {...state, count: state.count + 1}
  }),
  on(setValue, ( state, { count } ) => {
    return { ...state, count: count}
  } )
)

export const selectCounter = createFeatureSelector<CounterState>('count')


export const selectCount = createSelector(
  selectCounter,
  (counterState: CounterState) => counterState.count
)



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngrx-practice';


  constructor(private store: Store){}

  public count$ = this.store.select(selectCount)


  text: number = 0

  increment(){
    this.store.dispatch(incrementValue());
  }

  decrement(){
    this.store.dispatch(decrementValue());
  }

  setValue(){
    // this.store.dispatch(setValue({ count: this.text}))


    this.store.select(selectCount).subscribe({
      next: (value: any) => {console.log(value)}
    })
  }
}




