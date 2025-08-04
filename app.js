import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyDZu7jkvsUjy5_-LVH03x0xqOBvHOmsP1k",
    authDomain: "zenovat-form.firebaseapp.com",
    projectId: "zenovat-form",
    storageBucket: "zenovat-form.firebasestorage.app",
    messagingSenderId: "324899309005",
    appId: "1:324899309005:web:5c6868262dbfb2674eb084",
    measurementId: "G-PWB0YS3TYJ"
};

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     window.location.href = 'home.html'
//     const uid = user.uid;
//   } else {
//     window.location.href = 'index.html'
//   }
// });


let sbtn = document.getElementById('sBtn')
if (sbtn) {
    sbtn.addEventListener('click', () => {
        let email = document.getElementById('sEmail').value.trim()
        let password = document.getElementById('sPass').value.trim()

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                document.getElementById('sEmail').value = ''
                document.getElementById('sPass').value = ''
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);

            });
    })
}


let lBtn = document.getElementById('lBtn')
if (lBtn) {
    lBtn.addEventListener('click', () => {
        let email = document.getElementById('lEmail').value.trim()
        let password = document.getElementById('lPass').value.trim()

        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(`${user.email} is logIn Succecfully`);
    window.location.href = 'home.html'
    document.getElementById('lEmail').value = '';
    document.getElementById('lPass').value = '';
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
    })
}


let signOutBtn = document.getElementById('signOut');
if (signOutBtn) {
  signOutBtn.addEventListener('click',()=>{
    signOut(auth).then(() => {
      window.location.href = 'index.html'
}).catch((error) => {
console.log('error');

});
  })
}
