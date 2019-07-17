import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ToDos from "./components/ToDos";
import Values from "./components/Values";
import apiActions from "./api/api-actions";

pageBuild();

function pageBuild() {
  header();
  footer();
  navHome();
  navToDos();
  navValues();
}

function header() {
  const header = document.querySelector("#header");
  header.innerHTML = Header(); //send component into our html
}

function footer() {
  const footer = document.querySelector("#footer");
  footer.innerHTML = Footer();
}

function navHome() {
  const homeButton = document.querySelector(".nav__home");
  homeButton.addEventListener("click", function() {
    document.querySelector("#app").innerHTML = Home();
  });
}

function navToDos() {
  const toDosButton = document.querySelector(".nav__toDos");

  toDosButton.addEventListener("click", function() {
    apiActions.getRequest("https://localhost:5001/api/todos", toDos => {
      document.querySelector("#app").innerHTML = ToDos(toDos);
    });
  });

  const app = document.querySelector("#app");
  app.addEventListener("click", function() {
    if (event.target.classList.contains("add-toDo__submit")) {
      const todo = event.target.parentElement.querySelector(
        ".add-toDo__toDoName"
      ).value;
      apiActions.postRequest(
        "https://localhost:5001/api/todos",
        todo,
        toDos => {
          console.log(toDos);
          document.querySelector("#app").innerHTML = ToDos(toDos);
        }
      );
    }
  });

  app.addEventListener("click", function() {
    if (event.target.classList.contains("delete-toDo__submit")) {
      const todo = event.target.parentElement.querySelector(
        ".delete-toDo__toDoName"
      ).value;
      apiActions.deleteRequest(
        "https://localhost:5001/api/todos",
        todo,
        toDos => {
          console.log(toDos);
          document.querySelector("#app").innerHTML = ToDos(toDos);
        }
      );
    }
  });

  app.addEventListener("click", function() {
    if (event.target.classList.contains("delete-toDoId__submit")) {
      console.log("event triggered");
      const todo = event.target.parentElement.querySelector(".delete-toDo__id")
        .value;
      console.log(todo);
      apiActions.deleteRequest(
        "https://localhost:5001/api/todos",
        todo,
        toDos => {
          console.log(toDos);
          document.querySelector("#app").innerHTML = ToDos(toDos);
        }
      );
    }
  });
}

function navValues() {
  const valueButton = document.querySelector(".nav__values");
  valueButton.addEventListener("click", function() {
    apiActions.getRequest("https://localhost:5001/api/values", values => {
      document.querySelector("#app").innerHTML = Values(values);
    });
  });
}
