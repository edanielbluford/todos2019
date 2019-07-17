export default function Values(values) {
    return `
        <ul>
            ${values.map(value => {
        return `
                    <li>
                        <h3>${value}</h3>
                    </li>
                `;
    }).join('')}
         </ul>
    `
}