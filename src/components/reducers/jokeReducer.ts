// import type { Joke } from "../../types/types"

// type JokeAction = | {type:'ADD_JOKE'; newJoke:Joke} 
// | {type:'INCREASE_JOKE_LIKES'; id:number} 
// | {type:'DECREASE_JOKE_LIKES'; id:number};

// const jokesReducer =(jokes:Joke[], action:JokeAction):Joke[] =>{
//     switch(action.type){
//         case 'ADD_JOKE':
//             return[...jokes, ]

//          case 'INCREASE_JOKE_LIKES':   
//          return jokes.map((joke)=>{
//             if(jokes.id == action.id){
//                 return {...joke, rate:joke.rate+1}
//             }else{
//                 return joke;
//             }
            
//          })

//           case 'DECREASE_JOKE_LIKES':   
//         return jokes.map((joke)=>{
//             if(jokes.id == action.id){
//                 return {...joke, rate:joke.rate-1}
//             }else{
//                 return joke;
//             }
            
//          })

//          default:
//             return jokes
//     }
// }

// export default jokesReducer;