import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore,collection, addDoc, getDocs  } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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
const db = getFirestore(app);


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
        window.location.href = 'index.html'
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        Swal.fire({
          text: `${errorCode}`
        });

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
        Swal.fire({
          text: `${errorCode}`
        });
      });
  })
}


let signOutBtn = document.getElementById('signOut');
if (signOutBtn) {
  signOutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
      window.location.href = 'index.html'
    }).catch((error) => {
      console.log('error');

    });
  })
}


onAuthStateChanged(auth, (user) => {
  if (user) {
    // Agar user login hai aur login/signup page pe hai to hi redirect karo
    if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("signup.html")) {
      window.location.replace("home.html");
    }
  } else {
    // Agar user logout hai aur home page pe hai to hi redirect karo
    if (window.location.pathname.endsWith("home.html")) {
      window.location.replace("index.html");
    }
  }
});


let addProduct = document.getElementById('addProduct')
if (addProduct) {
  addProduct.addEventListener('click', async() => {
  let URL = document.getElementById('imageUrl').value;
  let price = document.getElementById('price').value;
  let product = document.getElementById('productName').value;
  try {
  const docRef = await addDoc(collection(db, "product"), {
    URL,
    price,
    product
  });
  URL = document.getElementById('imageUrl').value = ''
  price = document.getElementById('price').value = ''
  product = document.getElementById('productName').value = ''
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
})
}


// let getDiv = document.querySelector('.main');
// if (getDiv) {
//   fetch('https://dummyjson.com/products')
//     .then(res => res.json())
//     .then((data) => {
//       data.products.forEach((abc) => {
//         getDiv.innerHTML += `<div class="card">
//           <img src="${abc.images[0]}" class="card-img-top" alt="...">
//           <div class="card-body">
//             <h3 class="card-title">${abc.title}</h3>
//             <p class="card-text">${abc.description}</p>
//             <p><b>${abc.warrantyInformation || ''}</b></p>
//             <h5><b>Price: ${abc.price}$</b></h5>
//             <a href="#" class="btn btn-primary">Add To Cart</a>
//           </div>
//         </div>`;
//       });
//     });
// }

let readData = async ()=>{
  const querySnapshot = await getDocs(collection(db, "product"));
querySnapshot.forEach((doc) => {
  let getDiv = document.querySelector('.main');
          getDiv.innerHTML += `<div class="card">
          <img src="${doc.data().URL}" class="card-img-top" alt="...">
          <div class="card-body">
            <h3 class="card-title">${doc.data().product}</h3>
            <p class="card-text"></p>
            <p><b></b></p>
            <h5><b>Price: ${doc.data().price} pkr </b></h5>
            <a href="#" class="btn btn-primary">Add To Cart</a>
          </div>
        </div>`;

  
});
}
readData()

let adminRead = async ()=>{
    const querySnapshot = await getDocs(collection(db, "product"));
querySnapshot.forEach( (doc) => {
  let adminDiv = document.getElementById('admin-container');
          adminDiv.innerHTML += `<div class="card">
    <img src="${doc.data().URL}" class="card-img-top" alt="${doc.data().product}">
    <div class="card-body">
        <h3 class="card-title">${doc.data().product}</h3>
        <h5><b>Price: ${doc.data().price} PKR</b></h5>

        <div class="btn-group">
            <button class="btn edit-btn" onclick="editProduct('${doc.id}')">Edit</button>
            <button class="btn delete-btn" onclick="deleteProduct('${doc.id}')">Delete</button>
        </div>
    </div>
</div>
`;
});
}

adminRead()
