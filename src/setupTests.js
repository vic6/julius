require('jest-localstorage-mock');

//
// const localStorageMock = (function() {
//   let store = {};
//   return {
//     getItem(key) {
//       console.log(store)
//       console.log('KEY', key)
//       console.log(store[key])
//       return (store[key]);
//     },
//     setItem(key, value) {
//       store[key] = (value)
//     },
//     clear() {
//       store = {};
//     },
//     removeItem(key) {
//       delete store[key];
//     }
//   };
// })();
// Object.defineProperty(window, 'localStorage', { value: localStorageMock });
