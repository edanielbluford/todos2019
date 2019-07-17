export default function ToDos(toDos) {
    return `
        <ul> 
        ${toDos.map(toDo => {
        return `
                    <li>
                        <h3>${toDo}</h3>
                        <input class='delete-toDo__id' type='hidden' value="${toDo}">
                        <button class='delete-toDoId__submit'>&times</button>
                    </li>
                `;
    }).join('')}
         </ul>

         <section class='add-toDo'>
            <input class='add-toDo__toDoName' type='text' placeholder='Add a toDo!'>
            <button class='add-toDo__submit'>Submit</button>
        </section>

        <section class='delete-toDo'>
            <input class='delete-toDo__toDoName' type='text' placeholder='Delete a toDo!'>
            <button class='delete-toDo__submit'>Submit</button>
        </section>
    `


}